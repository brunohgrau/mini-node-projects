const { appendFile } = require("fs");

appendFile(
  "./data/app.log",
  "JP Tribune,238877,191477,0,0",

  (err) => {
    err ? console.log(err) : console.log("file saved");
  }
);
