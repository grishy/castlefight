package player

import (
	"log"

	"github.com/Grishy/castlefight/server/conn"
)

type Player struct {
	wsConn *conn.Conn
}

func New(c *conn.Conn) *Player {
	log.Printf("[DEBUG] new player")
	return &Player{
		wsConn: c,
	}
}

func (p *Player) Send(msg string) {
	p.wsConn.Write(msg)
}

func (p *Player) SendJson(v interface{}) {
	p.wsConn.WriteJSON(v)
}
