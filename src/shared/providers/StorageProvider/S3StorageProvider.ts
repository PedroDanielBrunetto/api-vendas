import uploadConfig from "@config/upload";
import fs from "fs";
import path from "path";
import aws, { S3 } from "aws-sdk";
import mime from "mime-types";

export default class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1",
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.lookup(originalPath); // mime.lookup no lugar de getType

    if (!ContentType) {
      throw new Error("File not found");
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        // ACL: "public-read", // Permissão para ser lido publicamente
        Body: fileContent,
        ContentType, // Short Syntax
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
