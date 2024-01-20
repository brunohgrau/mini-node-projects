// Add middleware / dependencies

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Array of Jokes to serve (Simulates DB)

let jokes = [
  { id: 1, joke: "joke 01" },
  { id: 2, joke: "joke 02" },
  { id: 3, joke: "joke 03" },
  { id: 4, joke: "joke 04" },
];

// Enabling Cors for all requests

app.use(cors());

// Enabling body-parser middleware to parse JSON bodies into 25 objects

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define the root entry point for the REST API

app.get("/", (req, res) => {
  res.send("Welcome to the jokes api");
});

// Define a route to retrieve all jokes

app.get("/jokes", (req, res) => {
  res.send(jokes);
});

// Define a route to retrieve a random joke

app.get("/randomjokes", (req, res) => {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  res.send(joke);
});

// Define a route to add a new joke

app.post("/jokes", (req, res) => {
  // Generate a new ID for the Post
  const newId = jokes[jokes.length - 1].id + 1;

  // Get the post from request body
  const joke = req.body;

  // Output the joke to the console for debugging
  console.log(joke);
  jokes.push({ id: newId, joke: joke });

  // Add new joke to  jokes array
  res.send({ id: newId, joke: joke });
});

// Define a route to delete a joke

app.delete("/jokes/:id", (req, res) => {
  // Get the joke id from the request parameters
  const jokeId = req.params.id;

  // Find the joke with the matching id
  const jokeIndex = jokes.findIndex((joke) => joke.id === jokeId);

  // Remove the joke from the array
  jokes.splice(jokeIndex, 1);

  // Send a messgae as a response
  res.send({ message: "Joke deleted successfully" });
});

//  Start the Rest Api Server

app.listen(port, () => {
  console.log(`Jokes App Api listening on port ${port}`);
});
