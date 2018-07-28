package wsConn

import (
	"log"
	"sync"
	"time"

	"github.com/gorilla/websocket"
)

const (
	// Time allowed to read the next pong message from the peer.
	pongWait = 15 * time.Second
	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = 10 * time.Second
)

type wsConn struct {
	// The websocket connection
	ws *websocket.Conn
	// Ping timer
	ticker *time.Ticker
	// For сoncurrent write to websocket connection
	mx sync.Mutex
}

// New create new websoket conn
func New(ws *websocket.Conn) *wsConn {
	conn := &wsConn{
		ws:     ws,
		ticker: time.NewTicker(pingPeriod),
	}

	go conn.pinger()

	return conn
}

func (c *wsConn) Write(messageType int, data []byte) error {
	c.mx.Lock()
	err := c.ws.WriteMessage(messageType, data)
	c.mx.Unlock()

	return err
}

func (c *wsConn) WriteJSON(v interface{}) error {
	c.mx.Lock()
	err := c.ws.WriteJSON(v)
	c.mx.Unlock()

	return err
}

// Send ping every pingPeriod time
func (c *wsConn) pinger() {
	for {
		<-c.ticker.C
		if err := c.Write(websocket.PingMessage, []byte{}); err != nil {
			log.Printf("[ERROR] send ping: %v", err)
		}
	}
}

// readPump pumps messages from the websocket connection
func (c *wsConn) ReadPump() {
	defer func() {
		c.ws.Close()
		c.ticker.Stop()
	}()

	// Time limit for accepting the request
	c.ws.SetReadDeadline(time.Now().Add(pongWait))
	// If pong came then prolong the life of the connection (same)
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
