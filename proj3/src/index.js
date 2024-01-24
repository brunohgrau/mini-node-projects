const express = require("express");

const server = express();

server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.render("index");
});

server.get("/about", (req, res) => {
  res.render("about");
});

server.listen(4242, () => {
  console.log("Express server is running");
});


collection = ["element 1", "element 2", "element 3"]

const iteratorCallback(element, callback){
  console.log(`Processing element: ${element}`)
  callback()
}
 
const finalCallback(){
  console.log("All elements processed!")
}
  

iterateSeries(collection, iteratorCallback, finalCallback)