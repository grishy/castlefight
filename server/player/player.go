package player

import (
	"log"
	"net/http"

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

// Handle сalled to any connection
func Handle(w http.ResponseWriter, r *http.Request) {
	// Switching to websocket
	// Upgrade upgrades the HTTP server connection to the WebSocket protocol.
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("[ERROR] websocket upgrade:", err)
		return
	}

	log.Printf("[DEBUG] new websocket connection: %s", ws.RemoteAddr().String())

	ws.WriteMessage(websocket.TextMessage, []byte("test"))
}
