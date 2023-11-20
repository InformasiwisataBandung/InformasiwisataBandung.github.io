package main

import (
	"fmt"
	"html/template"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Post adalah struktur data posting
type Post struct {
	Title     string    `bson:"title"`
	Company   string    `bson:"company"`
	City      string    `bson:"city"`
	CreatedAt time.Time `bson:"created_at"`
}

// Data adalah struct yang akan digunakan oleh template HTML
type Data struct {
	Posts []Post
}

func main() {
	http.HandleFunc("/pasien", handlePasien)
	http.ListenAndServe(":8080", nil)
}

func handlePasien(w http.ResponseWriter, r *http.Request) {
	// Kode untuk mengambil data dari MongoDB
	posts, err := getPostsFromMongoDB()
	if err != nil {
		http.Error(w, "Error fetching data from MongoDB", http.StatusInternalServerError)
		return
	}

	// Render template HTML dengan data
	tmpl, err := template.ParseFiles("admindashboard.html")
	if err != nil {
		http.Error(w, "Error parsing HTML template", http.StatusInternalServerError)
		return
	}

	data := Data{
		Posts: posts,
	}

	tmpl.Execute(w, data)
}

func getPostsFromMongoDB() ([]Post, error) {
	// Kode untuk mengambil data dari MongoDB
	// Pastikan untuk mengganti URL dan nama database sesuai dengan konfigurasi MongoDB Anda
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		return nil, err
	}

	collection := client.Database("nama_database").Collection("nama_collection")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var posts []Post
	for cursor.Next(ctx) {
		var post Post
		if err := cursor.Decode(&post); err != nil {
			return nil, err
		}
		posts = append(posts, post)
	}

	return posts, nil
}
