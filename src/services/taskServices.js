const Task = require("../models/task");
const addTask = async (data) => {
  let result;
  if (data.type === "EMTY-TASK") {
    result = await Task.create(data);
  }
  return result;
};

const getAllTask = async () => {
  const result = await Task.find({});
  return result;
};

const updateATask = async (id, data) => {
  const result = await Task.updateOne({ _id: id }, data);
  return result;
};

module.exports = { addTask, getAllTask, updateATask };
