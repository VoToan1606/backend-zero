const Customer = require("../models/customer");

const createCustomer = async (customer) => {
  const result = await Customer.create(customer);
  return result;
};

const createManyCustomer = async (customerList) => {
  try {
    const result = await Customer.insertMany(customerList);
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const getAllCustomer = async (skip, limit, filter) => {
  try {
    let result = null;
    if (skip && limit) {
      result = await Customer.find(filter)
        .skip((skip - 1) * limit)
        .limit(limit);
    } else {
      result = await Customer.find();
    }
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const upDateCustomer = async (id, customer) => {
  try {
    const result = await Customer.updateOne({ _id: id }, customer);
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const deleteCustomer = async (id) => {
  try {
    const result = await Customer.deleteById(id);
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

const deleteManyCustomer = async (ids) => {
  try {
    const result = await Customer.delete({ _id: ids });
    return result;
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  createCustomer,
  createManyCustomer,
  getAllCustomer,
  upDateCustomer,
  deleteCustomer,
  deleteManyCustomer,
};
