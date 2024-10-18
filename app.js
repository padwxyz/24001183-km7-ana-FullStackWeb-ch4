// module third party
const morgan = require("morgan");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

// module sendiri
const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");
const dashboardRoute = require("./routes/dashboardRoute");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(morgan());

app.use((req, res, next) => {
  console.log('incoming request...')
  next();
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("Request time: ");
  console.log(req.requestTime);
  next();
})

app.use((req, res, next) => {
  req.username = "Nanda"
  console.log("Requested by: ");
  console.log(req.username);
  next();
});

app.use((req, res, next) => {
  console.log("API requested: ");
  console.log(req.originalUrl);
  next();
});

app.use(express.static(`${__dirname}/public/`));

app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "layout")

app.get("/dashboard/admin", async (req, res) => {
  try {
    res.render("index", {
      greeting: "hello cuyyy"
    })
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      status: "Succeed",
      message: "Ping successfully",
      isSuccess: true,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Ping failed",
      isSuccess: false,
      error: error.message,
    });
  }
});


app.use("/dashboard/admin", dashboardRoute);

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

// Middleware to handle page not found
app.use((req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
