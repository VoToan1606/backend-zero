const express = require("express");
const router = express.Router();
const {
  home,
  sample,
  postCreateUSer,
  createUser,
  updateUser,
  postUpdateUser,
  removeUser,
} = require("../controllers/homeController");

router.get("/", home);

router.get("/sample", sample);

router.get("/create", createUser);

router.get("/update/:id", updateUser);

router.post("/update/:id", postUpdateUser);

router.post("/remove/:id", removeUser);

router.post("/create-user", postCreateUSer);

module.exports = router;

module.exports = router;
