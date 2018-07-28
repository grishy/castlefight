package player

import (
	"log"
	"net/http"

	"github.com/Grishy/castlefight/server/player/wsConn"
	"github.com/gorilla/websocket"
)

type Player struct {
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// Accept all connection
		return true
	},
}

func New() *Player {
	log.Printf("[DEBUG] new player")
	return &Player{}
}

func (p *Player) Clear() {
}

func Handle(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println("[ERROR] websocket upgrade:", err)
		return
	}

	log.Printf("[DEBUG] new websocket connection: %s", ws.RemoteAddr().String())

	conn := wsConn.New(ws)

	conn.Write(websocket.TextMessage, []byte("test"))

	conn.ReadPump()
}
