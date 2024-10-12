const morgan = require("morgan");
const express = require("express");
const usersRoute = require("./routes/usersRoute");
const carsRoute = require("./routes/carsRoute");
const sparepartsRoute = require("./routes/sparepartsRoute");
const driverRoutes = require("./routes/driverRoute");

const app = express();
const port = 3000;

// Middleware: Reading json from body (client)
app.use(express.json());

// middleware: logging third party package
app.use(morgan());

// contoh middleware
app.use((req, res, next) => {
  console.log('incoming request...')
  // better logging di bawahnya
  next();
})

// logging basic
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  // better logging di bawahnya
  next();
})

// logging basic
app.use((req, res, next) => {
  req.username = "Nanjay"
  // better logging di bawahnya
  next();
})

// Health Check
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

// Routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/cars", carsRoute);
app.use("/api/v1/spareparts", sparepartsRoute);
app.use("/api/v1/drivers", driverRoutes);

// Middleware to handle page not found
app.use((req, res, next) => {
  // console.log("proses kapan request");
  // console.log(req.requestTime);
  // console.log("proses siapa yang request");
  // console.log(req.username);
  // console.log("proses API apa yang diminta");
  // console.log(req.originalUrl);

  res.status(404).json({
    status: "Failed",
    message: "API not found !",
    isSuccess: false,
  });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
