package conn

import (
	"log"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

const (
	pingPeriod = 5 * time.Second
	pongWait   = 10 * time.Second
)

type Conn struct {
	// The websocket connection
	ws *websocket.Conn
	// Ping timer
	ticker *time.Ticker
	// For сoncurrent write to websocket connection
	mx sync.Mutex
}

func New(ws *websocket.Conn) *Conn {
	conn := &Conn{
		ws:     ws,
		ticker: time.NewTicker(pingPeriod),
	}

	go conn.pinger()

	return conn
}

func (c *Conn) Write(msg string) error {
	return c.write(websocket.TextMessage, []byte(msg))
}

func (c *Conn) write(messageType int, data []byte) error {
	c.mx.Lock()
	err := c.ws.WriteMessage(messageType, data)
	c.mx.Unlock()

	return err
}

func (c *Conn) WriteJSON(v interface{}) error {
	c.mx.Lock()
	err := c.ws.WriteJSON(v)
	c.mx.Unlock()

	return err
}

func (c *Conn) pinger() {
	for {
		<-c.ticker.C
		if err := c.write(websocket.PingMessage, []byte{}); err != nil {
			log.Printf("[ERROR] send ping: %v", err)
			break
		}
	}
}

func (c *Conn) ReadPump() {
	defer func() {
		c.ws.Close()
		c.ticker.Stop()
	}()

	c.ws.SetReadDeadline(time.Now().Add(pongWait))
	c.ws.SetPongHandler(func(string) error { c.ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		_, message, err := c.ws.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Printf("[DEBUG] %v", err)
			} else {
				// If this is not a closing code
				log.Printf("[ERROR] readPump: %v", err)
			}

			break
		}

		log.Printf(string(message))
	}
}
