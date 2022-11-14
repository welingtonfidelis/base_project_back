import AWS from "aws-sdk";
import { randomUUID } from "crypto";

import { config } from "../../config";
import { AppError } from "../../errors/AppError";

const { BUCKET_NAME } = config;

const s3 = new AWS.S3();

const acceptablesImgType = ["jpeg", "png", "gif"];

const validateTypeFiles = (fileType: string, acceptables: string[]) => {
  const splitedFileType = fileType.split("/");
  const type = splitedFileType[1] || splitedFileType[0];

  if (!acceptables.includes(type)) {
    throw new AppError(
      `${type} is not accept file type. Acceptables: ${acceptables}`,
      400
    );
  }

  return type;
};

const uploadImage = (file: any, folderName = "", fileName = "") => {
  const type = validateTypeFiles(file.mimetype, acceptablesImgType);
  const baseName = fileName || randomUUID();
  const params = {
    Bucket: `${BUCKET_NAME}/images/${folderName}`,
    Key: `${baseName}.${type}`,
    ACL: "public-read",
    Body: Buffer.from(file.buffer || file, "binary"),
  };

  return s3.upload(params).promise();
};

const deleteFile = (fileUrl: string) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileUrl,
  };

  return s3.deleteObject(params).promise();
};

export { uploadImage, deleteFile };
