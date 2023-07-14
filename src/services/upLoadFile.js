const path = require("path");
const moment = require("moment");

const uploadSingleFile = async (fileObject) => {
  const uploadPath = path.resolve(__dirname, "..") + "/public/images/upload";
  let extName = path.extname(fileObject.name);

  //get image's name (without extension)
  let baseName = path.basename(fileObject.name, extName);

  //create final path: eg: /upload/your-image.png
  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;
  try {
    // await fileObject.mv(uploadPath);
    await fileObject.mv(finalPath);

    return {
      message: "success",
      path: finalName,
      error: 0,
    };
  } catch (err) {
    console.error("check err", err);
    return {
      error: 1,
      status: 500,
      message: "fail to uplaod",
    };
  }
};

const uploadMultipleFile = async (filesArr) => {
  try {
    let uploadPath = path.resolve(__dirname, "../public/images/upload");

    let resultArr = [];
    let countSuccess = 0;
    for (let i = 0; i < filesArr.length; i++) {
      //get image extension
      let extName = path.extname(filesArr[i].name);

      //get image's name (without extension)
      let baseName = path.basename(filesArr[i].name, extName);

      //create final path: eg: /upload/your-image.png
      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;

      try {
        await filesArr[i].mv(finalPath);
        resultArr.push({
          status: "success",
          path: finalName,
          fileName: filesArr[i].name,
          error: null,
        });
        countSuccess++;
      } catch (err) {
        resultArr.push({
          status: "failed",
          path: null,
          fileName: filesArr[i].name,
          error: JSON.stringify(err),
        });
      }
    }

    return {
      countSuccess: countSuccess,
      detail: resultArr,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFile,
};
