const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("TEST_EVENT", () => {
  console.log("TEST_EVENT was fired");
});

myEmitter.emit("TEST_EVENT");
