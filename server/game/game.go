package game

import (
	"log"
)

type Game struct {
}

func New() *Game {
	log.Printf("[DEBUG] new game")
	return &Game{}
}

func (g *Game) Clear() {
}
