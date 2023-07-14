const connection = require("../config/database");
const User = require("../models/user");

const {
  getUser,
  create,
  getUserById,
  updateNewUser,
  removeUserById,
} = require("../services/CRUDUser");

const home = async (req, res) => {
  // const rows = await getUser();
  try {
    const users = await User.find();
    // Handle the retrieved users
    res.render("home.ejs", { data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
};

const sample = (req, res) => {
  res.render("sample.ejs");
};

const postCreateUSer = async (req, res) => {
  const { email, myName, city } = req.body;
  await User.create({ email, name: myName, city });
  res.redirect("/");
};

const updateUser = async (req, res) => {
  const UserId = req.params.id;
  // const data = await getUserById(UserId);
  const data = await User.findById(UserId);
  console.log(data);
  res.render("update.ejs", { title: "User List", editData: data });
};

const postUpdateUser = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const newData = {
    email: updateData.email,
    name: updateData.myName,
    city: updateData.city,
  };
  await User.updateOne({ _id: id }, newData);

  res.redirect("/");
};

const removeUser = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  // await removeUserById(id);
  await User.deleteOne({ _id: id });

  res.redirect("/"); // Redirect to the data page after removal
};

const createUser = (req, res) => {
  res.render("create.ejs");
};

module.exports = {
  home,
  sample,
  postCreateUSer,
  createUser,
  updateUser,
  postUpdateUser,
  removeUser,
};
