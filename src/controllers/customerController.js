const { uploadSingleFile } = require("../services/upLoadFile");
const mongoose = require("mongoose");
const aqp = require("api-query-params");

const {
  createCustomer,
  createManyCustomer,
  getAllCustomer,
  upDateCustomer,
  deleteCustomer,
  deleteManyCustomer,
} = require("../services/CRUDCustomer");

const postCreateUserApis = async (req, res) => {
  const { name, address, phone, email, description } = req.body;
  let imgUrl = "";
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.image;
  const imageInfo = await uploadSingleFile(file);
  imgUrl = imageInfo.path;
  const customer = { name, address, phone, email, description, image: imgUrl };
  const result = await createCustomer(customer);
  return res.status(200).json({
    coutEror: 0,
    data: result,
  });
};

const postCreateManyCustomerApis = async (req, res) => {
  try {
    const result = await createManyCustomer(req.body.Customer);

    return res.status(201).json({
      coutEror: 0,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      coutEror: -1,
      data: result,
    });
  }
};

const getAllCustomerApis = async (req, res) => {
  try {
    let result = null;
    const { skip, limit, filter } = aqp(req.query);
    if (filter && limit) {
      result = await getAllCustomer(skip, limit, filter);
    } else {
      result = await getAllCustomer();
    }
    return res.status(200).json({
      coutEror: 0,
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      coutEror: -1,
      data: result,
    });
  }
};

const updateACustomerApis = async (req, res) => {
  const id = req.params.id;
  const { name, address, phone, email, description } = req.body;
  const customer = { name, address, phone, email, description };
  const result = await upDateCustomer(id, customer);
  return res.status(201).json({
    coutEror: 0,
    data: result,
  });
};

const deleteACustomerApis = async (req, res) => {
  const id = req.params.id;
  const result = await deleteCustomer(id);
  return res.status(202).json({
    coutEror: 0,
    data: result,
  });
};

const deleteManyCustomerApis = async (req, res) => {
  const ids = req.body.id;
  const result = await deleteManyCustomer(ids);
  return res.status(202).json({
    coutEror: 0,
    data: result,
  });
};

module.exports = {
  postCreateUserApis,
  postCreateManyCustomerApis,
  getAllCustomerApis,
  updateACustomerApis,
  deleteACustomerApis,
  deleteManyCustomerApis,
};
