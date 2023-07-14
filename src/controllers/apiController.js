const User = require("../models/user");
const {
  uploadSingleFile,
  uploadMultipleFile,
} = require("../services/upLoadFile");

const getUserApis = async (req, res) => {
  const result = await User.find({});
  return res.status(200).json({
    coutEror: 0,
    data: result,
  });
};

const postUserApis = async (req, res) => {
  const { email, myName, city } = req.body;
  const user = await User.create({ email, name: myName, city });
  return res.status(201).json({ message: "User created successfully", user });
};

const putCreateUserApis = async (req, res) => {
  const userId = req.params.id;
  const { email, myName, city } = req.body;

  try {
    // Find the user by ID and update the fields
    const user = await User.findByIdAndUpdate(
      userId,
      { email, name: myName, city },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const removeUserApis = async (req, res) => {
  const userId = req.params.id;

  try {
    // Find the user by ID and remove it
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const postFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.image;

  const result = await uploadSingleFile(file);
  return res.send(result);
};

const postMultipleFileApi = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const files = req.files.image;
  const result = await uploadMultipleFile(files);
  return res.send(result);
};
module.exports = {
  getUserApis,
  postUserApis,
  putCreateUserApis,
  removeUserApis,
  postFileApi,
  postMultipleFileApi,
};
