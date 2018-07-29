package game

import (
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"

	"github.com/Grishy/castlefight/server/conn"
	"github.com/Grishy/castlefight/server/game/level"
	"github.com/Grishy/castlefight/server/game/player"
)

type State int

const (
	WAIT State = iota
	RUN
	PAUSE
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// Accept all connection
		return true
	},
}

type Game struct {
	numberOfPlayers int
	plList          []*player.Player
	status          State
	level           *level.Level
}

func New(numOfPlayers int) *Game {
	log.Printf("[DEBUG] Cteate game")
	return &Game{
		numberOfPlayers: numOfPlayers,
		status:          WAIT,
	}
}

func (g *Game) start() {
	g.level = level.New()
	g.level.Start()

	for _, val := range g.plList {
		val.Send("Start")
	}

	go func() {
		tick := time.Tick(200 * time.Millisecond)

		for {
			<-tick
			g.sendDump()
		}
	}()
}

func (g *Game) Handle(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println("[ERROR] websocket upgrade:", err)
		return
	}

	log.Printf("[DEBUG] new websocket connection: %s", ws.RemoteAddr().String())

	wsConn := conn.New(ws)

	if g.status == RUN {
		wsConn.Write("Already run")
		return
	}

	pl := player.New(wsConn)
	pl.Send("Conn")

	g.plList = append(g.plList, pl)

	if len(g.plList) == g.numberOfPlayers {
		g.status = RUN
		g.start()
	}
}

func (g *Game) sendDump() {
	dump := g.level.State()

	for _, val := range g.plList {
		val.SendJson(dump)
	}
}
