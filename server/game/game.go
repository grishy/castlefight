package game

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"

	"github.com/Grishy/castlefight/server/conn"
	"github.com/Grishy/castlefight/server/game/player"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// Accept all connection
		return true
	},
}

type Game struct {
	numberOfPlayers uint
}

func New(numOfPlayers uint) *Game {
	log.Printf("[DEBUG] Cteate game")
	return &Game{
		numberOfPlayers: numOfPlayers,
	}
}

func (g *Game) Handle(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println("[ERROR] websocket upgrade:", err)
		return
	}

	log.Printf("[DEBUG] new websocket connection: %s", ws.RemoteAddr().String())

	wsConn := conn.New(ws)

	wsConn.Write(websocket.TextMessage, []byte("start"))

	pl := player.New(wsConn)
	fmt.Println(pl)
}
