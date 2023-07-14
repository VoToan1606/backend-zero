const {
  createProject,
  getProject,
  delteUserFromProject,
} = require("../services/CRUDProject");
const postCreateProject = async (req, res) => {
  const result = await createProject(req.body);
  res.status(200).json({
    data: result,
  });
};

const getProjectApi = async (req, res) => {
  const result = await getProject(req.query);
  res.status(200).json({
    data: result,
  });
};

const delteUserFromProjectApi = async (req, res) => {
  const result = await delteUserFromProject(req.body);
  res.status(200).json({
    data: result,
  });
};

module.exports = {
  postCreateProject,
  getProjectApi,
  delteUserFromProjectApi,
};
