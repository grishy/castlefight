package main

import (
	"log"
	"net/http"

	"github.com/Grishy/castlefight/server/game"
)

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	log.Println("[DEBUG] Start")

	gameApp := game.New(2)

	// Connect to WebSockets on any request
	http.HandleFunc("/", gameApp.Handle)
	panic(http.ListenAndServe(":9999", nil))
}
