const Project = require("../models/project");
const aqp = require("api-query-params");

const createProject = async (data) => {
  let result;
  if (data.type === "EMPTY-PROJECT") {
    result = await Project.create(data);
    return result;
  }
  if (data.type === "ADD-USERS") {
    const projectObject = await Project.findById(data.projectId);
    for (let i = 0; i < data.usersArr.length; i++) {
      projectObject.usersInfor.push(data.usersArr[i]);
    }

    await projectObject.save();
    return "add user";
  }
  if (data.type === "ADD-TASKS") {
    const projectObject = await Project.findById(data.projectId);
    for (let i = 0; i < data.taskArr.length; i++) {
      projectObject.tasks.push(data.taskArr[i]);
    }

    result = await projectObject.save();
    return result;
  }
  return null;
};

const getProject = async (queryString) => {
  const page = queryString.page;
  const { filter, limit, population } = aqp(queryString);
  const skip = limit * (page - 1);

  delete filter.page;
  const result = Project.find(filter)
    .skip(skip)
    .limit(limit)
    .populate(population);
  return result;
};

const delteUserFromProject = async (data) => {
  const projectObject = await Project.findById(data.projectId);
  const userInforList = data.usersArr;
  for (let i = 0; i < userInforList.length; i++) {
    projectObject.usersInfor.pull(userInforList[i]);
  }
  const result = await projectObject.save();
  return result;
};

module.exports = {
  createProject,
  getProject,
  delteUserFromProject,
};
