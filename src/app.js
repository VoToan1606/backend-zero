require("dotenv").config();
const express = require("express");
const app = express();
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routes/web");
const routerApis = require("./routes/api");
const connection = require("./config/database");
const fileUpload = require("express-fileupload");
const { MongoClient } = require("mongodb");
const port = process.env.PORT || 8088;

//config template engine
configViewEngine(app);

//config upload file
app.use(fileUpload());

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

//config router
app.use("/", webRouter);
app.use("/api/v1", routerApis);

(async () => {
  try {
    //using moogose
    await connection();
    //using mongo db
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log("fail connect database", error);
  }
})();
