package main

import (
	"log"
	"net/http"

	"github.com/Grishy/castlefight/server/player"
)

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	log.Println("[DEBUG] Start")

	// Connect to WebSockets on any request
	http.HandleFunc("/", player.Handle)
	panic(http.ListenAndServe(":9999", nil))
}
