package player

import (
	"log"
)

type Player struct {
}

func New() *Player {
	log.Printf("[DEBUG] new player")
	return &Player{}
}

func (p *Player) Clear() {
}
