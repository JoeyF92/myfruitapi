const cors = require("cors");
const fruits = require("./fruits.json");
const express = require("express");
const app = express();

//const logger = require("./logger");
// app.use(logger)

//middleware to parse json.
app.use("/fruits", express.json());

app.get("/fruits", (req, res) => {
  res.send(fruits);
});

app.get("/fruits/:name", (req, res) => {
  //accessing the name typed, we change to lowercase incase error with user input
  const name = req.params.name.toLowerCase();
  //search for a match in the json file
  const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name);
  // if no match, fruit will be undefined
  if (fruit == undefined) {
    // send status of 404, to indicate its not been found
    res.status(404).send();
  } // if fruit found, send it
  else {
    res.send(fruit);
  }
});

app.post("/fruits", (req, res) => {
  // check if fruit is in json
  const fruit = fruits.find(
    (fruit) => fruit.name.toLowerCase() == req.body.name.toLowerCase()
  );
  if (fruit != undefined) {
    res.status(409).send();
  } else {
    fruits.push(req.body);
    res.status(201).send(req.body);
  }
});

app.delete("/fruits/:name", (req, res) => {
  //check fruit exists in file
  const fruit = fruits.find(
    (fruit) => fruit.name.toLowerCase() == req.params.name.toLowerCase()
  );
  // if it doesnt send a 404
  if (fruit == undefined) {
    res.status(404).send();
  } else {
    // if it does, delete
    const indexToDelete = fruits.indexOf(fruit);
    fruits.splice(indexToDelete, 1);
    //204 is no content - so good for deleting
    res.status(204).send();
  }
});

module.exports = app;
