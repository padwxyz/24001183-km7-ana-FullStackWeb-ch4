const { Driver } = require("../models");

async function getAllDrivers(req, res) {
  try {
    const drivers = await Driver.findAll();

    res.status(200).json({
      status: "200",
      message: "Success get drivers data",
      isSuccess: true,
      data: { drivers },
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to get drivers data",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function getDriverById(req, res) {
  const id = req.params.id;
  try {
    const driver = await Driver.findByPk(id);

    if (!driver) {
      return res.status(404).json({
        status: "404",
        message: "Driver Not Found!",
      });
    }

    res.status(200).json({
      status: "200",
      message: "Success get drivers data",
      isSuccess: true,
      data: driver,
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to get drivers data",
      isSuccess: false,
    });
  }
}
async function deleteDriverById(req, res) {
  const id = req.params.id;
  try {
    const driver = await Driver.findByPk(id);

    if (driver) {
      await driver.destroy();

      res.status(200).json({
        status: "200",
        message: "Success get drivers data",
        isSuccess: true,
        data: driver,
      });
    } else {
      res.status(200).json({
        status: "204",
        message: "Success delete drivers data",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to get cars data",
      isSuccess: false,
      error: error.message,
      data: null,
    });
  }
}

async function createDriver(req, res) {
  const { name, license_number, contact } = req.body;

  try {
    const newDriver = await Driver.create({ name, license_number, contact });
    res.status(200).json({
      status: "Success",
      message: "Ping successfully",
      isSuccess: true,
      data: { newDriver },
    });
  } catch (error) {
    res.status(500).json({
      status: "500",
      message: "Failed to get cars data",
      isSuccess: false,
      error: error.message,
    });
  }
}

async function updateDriver(req, res) {
  const id = req.params.id;
  const { name, license_number, contact } = req.body;

  try {
    const driver = await Driver.findByPk(id);

    if (driver) {
      driver.name = name;
      driver.license_number = license_number;
      driver.contact = contact;

      await driver.save();

      res.status(200).json({
        status: "Success",
        message: "Success update driver data",
        isSuccess: true,
        data: { driver },
      });
    } else {
      res.status(404).json({
        status: "Failed",
        message: "Failed data driver not found!",
        isSuccess: false,
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Failed to get driver data",
      isSuccess: false,
      error: error.message,
    });
  }
}

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  deleteDriverById,
  updateDriver,
};
