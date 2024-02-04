const { writeFile } = require("fs");

writeFile(
  "./data/app.log",
  "Tampa Tribune,238877,191477,0,0",

  (err) => {
    err ? console.log(err) : console.log("file saved");
  }
);
