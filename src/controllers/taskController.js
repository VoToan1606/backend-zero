const {
  addTask,
  getAllTask,
  updateATask,
} = require("../services/taskServices");
const addNewTask = async (req, res) => {
  try {
    const result = await addTask(req.body);
    return res.status(201).json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllTaskApi = async (req, res) => {
  const result = await getAllTask();
  return res.status(200).json({
    data: result,
  });
};

const updateATaskApi = async (req, res) => {
  const id = req.params.id;
  console.log("id", id, "data", req.body);
  const result = await updateATask(id, req.body);
  return res.status(200).json({
    data: result,
  });
};

module.exports = { addNewTask, getAllTaskApi, updateATaskApi };
