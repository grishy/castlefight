package game

import (
	"log"
	"net/http"

	"github.com/Grishy/castlefight/server/conn"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// Accept all connection
		return true
	},
}

type Game struct {
}

func New() *Game {
	log.Printf("[DEBUG] Cteate game")
	return &Game{}
}

func (g *Game) Clear() {
}

func (g *Game) Handle(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println("[ERROR] websocket upgrade:", err)
		return
	}

	log.Printf("[DEBUG] new websocket connection: %s", ws.RemoteAddr().String())

	c := conn.New(ws)

	c.Write(websocket.TextMessage, []byte("test"))

	c.ReadPump()
}
