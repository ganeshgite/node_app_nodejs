var express = require("express");
var app = express();
var PORT = process.env.PORT || 4000;
var fs = require("fs");
var path = require("path");
var bodyparser = require("body-parser");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    // console.log(files);
    res.render("index", { files: files });
  });
});
app.post("/create", (req, res) => {
  //    console.log(req.body);
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      console.log(err);
    }
  );
  res.redirect("/");
});
app.get("/file/:filename", (req, res) => {
  var filename = req.params.filename;
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    // console.log(filedata)
    res.render("show", { filename, filedata });
  });
});

app.get("/edit/:filename", (req, res) => {
  var filename = req.params.filename;
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
    // console.log(filedata)
    res.render("edit", { filename , filedata });
  });
});
app.post("/update", (req, res) => {
    // console.log(req.body);
    fs.rename(
      `./files/${req.body.prevTitle}`,`./files/${req.body.newTitle}`,
      (err) => {
        console.log(err);
      }
      );
   
   
  res.redirect("/");    

});

app.listen(PORT, () => {
  console.log("server started at port no " + PORT);
});
