const express = require("express");
const routerApis = express.Router();
const {
  getUserApis,
  postUserApis,
  putCreateUserApis,
  removeUserApis,
  postFileApi,
  postMultipleFileApi,
} = require("../controllers/apiController");

const {
  postCreateUserApis,
  postCreateManyCustomerApis,
  getAllCustomerApis,
  updateACustomerApis,
  deleteACustomerApis,
  deleteManyCustomerApis,
} = require("../controllers/customerController");

const {
  postCreateProject,
  getProjectApi,
  delteUserFromProjectApi,
} = require("../controllers/projectController");

const {
  addNewTask,
  getAllTaskApi,
  updateATaskApi,
} = require("../controllers/taskController");

// define the home page route
routerApis.get("/users", getUserApis);

routerApis.post("/users", postUserApis);

routerApis.put("/users/:id", putCreateUserApis);

routerApis.delete("/users/:id", removeUserApis);

routerApis.post("/file", postFileApi);

routerApis.post("/files", postMultipleFileApi);

routerApis.post("/customers", postCreateUserApis);

routerApis.post("/customers-many", postCreateManyCustomerApis);

routerApis.get("/customers", getAllCustomerApis);

routerApis.put("/customers/:id", updateACustomerApis);

routerApis.delete("/customers/:id", deleteACustomerApis);

routerApis.delete("/customers-many", deleteManyCustomerApis);

routerApis.post("/projects", postCreateProject);

routerApis.get("/projects", getProjectApi);

routerApis.delete("/projects", delteUserFromProjectApi);

//api task
routerApis.post("/tasks", addNewTask);

routerApis.get("/tasks", getAllTaskApi);

routerApis.put("/tasks/:id", updateATaskApi);

module.exports = routerApis;
