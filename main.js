const port = 3000,
  express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  path = require("path"),
  methodOverride = require("method-override"),
  mongoose = require("mongoose"),
  apiRoute = require("./routes/apiRoutes"),
  userRoute = require("./routes/userRoutes"),
  db = mongoose.connection;

console.log("pass 1");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/usersdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

console.log("pass 2");

var homeController = require("./controllers/homeController");
app.use(
  express.urlencoded({
    extended: false,
  })
);

console.log("pass 3");

app.use(express.json());

console.log("pass 4");

app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.set("view engine", "ejs");
app.use(layouts);
console.log("pass 5");

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
app.use(express.static("public"));

app.use("/api", apiRoute);
app.use("/", userRoute);

console.log("pass 6");

app.get("/", (req, res) => {
  res.send("In main.js, there is no more views for a Web Service Server");
  //res.render("index", { title: "CSC Users" });
});

app.get("/", homeController);

console.log("pass 7");

app.get("/users", homeController.showUsers);
console.log("pass 8");

app.post("/users/submit", homeController.addUsers);
console.log("pass 9");

app.get("/newuser", homeController.getNewUser);
app.get("/contact", homeController.postSignUpForm);
app.listen(app.get("port"), () => {
  console.log(`Server running on port ${port}`);
});
