package level

import (
	"time"

	"github.com/Grishy/castlefight/server/game/entities"
)

type Level struct {
	sizeX int
	sizeY int
	obj   []*entities.Entities
}

func New() *Level {
	return &Level{
		sizeX: 1500,
		sizeY: 750,
	}
}

func (l *Level) Start() {
	go l.Spawn(0, 0, 400, 200)
	go l.Spawn(400, 200, 200, 200)
	go l.Step()
}

func (l *Level) State() []*entities.Entities {
	return l.obj
}

func (l *Level) Spawn(_x, _y, _endX, _endY int) {
	tick := time.Tick(500 * time.Millisecond)
	for {
		<-tick

		newObj := entities.New(_x, _y, _endX, _endY)
		l.obj = append(l.obj, newObj)

		go func() {
			timer2 := time.NewTimer(time.Second)
			<-timer2.C

			for i, val := range l.obj {
				if val.ID == newObj.ID {
					l.obj = append(l.obj[:i], l.obj[i+1:]...)
				}
			}
		}()
	}
}

func (l *Level) Step() {
	tick := time.Tick(32 * time.Millisecond)
	for {
		<-tick

		for _, val := range l.obj {
			val.Step()
		}
	}
}
