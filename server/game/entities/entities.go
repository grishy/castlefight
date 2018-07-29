package entities

import (
	"math"
)

var id = 1

type Entities struct {
	X    int
	Y    int
	EndX int
	EndY int
	ID   int
}

func New(_x, _y, _endX, _endY int) *Entities {
	id++
	return &Entities{
		X:    _x,
		Y:    _y,
		EndX: _endX,
		EndY: _endY,
		ID:   id,
	}
}

func (e *Entities) Step() {
	dx := float64(e.EndX - e.X)
	dy := float64(e.EndY - e.Y)
	dist := math.Sqrt(dx*dx + dy*dy)

	e.X = e.X + int(dx*1/dist)
	e.Y = e.Y + int(dy*1/dist)
}
