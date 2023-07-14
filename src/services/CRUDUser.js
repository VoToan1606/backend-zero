const connection = require("../config/database");

const getUser = async () => {
  const [rows, fields] = await connection.execute("SELECT * FROM Users");
  return rows;
};

const create = async (email, myName, city) => {
  const [rows, fields] = await connection.execute(
    `INSERT INTO Users(email, name, city)
    VALUES (?, ?, ?);`,
    [email, myName, city]
  );
};

const getUserById = async (UserId) => {
  const [data, err] = await connection.execute(
    `SELECT * FROM Users WHERE id=${UserId}`
  );
  return data;
};

const updateNewUser = async (newData, id) => {
  await connection.query(`UPDATE Users SET ? WHERE id= ?`, [newData, id]);
};

const removeUserById = async (id) => {
  await connection.query("DELETE FROM Users WHERE id = ?", [id]);
};

module.exports = {
  getUser,
  create,
  getUserById,
  updateNewUser,
  removeUserById,
};
