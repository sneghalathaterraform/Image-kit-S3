import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { readdirSync, readFileSync } from "fs";
import { join, relative } from "path";
import { fileTypeFromFile } from "file-type";

const BUCKET_NAME = "travel-app-frontend-123"; // Replace with your S3 bucket name
const DIST_FOLDER = "./dist";

const s3Client = new S3Client({ region: "us-east-1" }); // Change region if needed

async function uploadDirToS3(dirPath, s3Prefix = "") {
  const files = readdirSync(dirPath, { withFileTypes: true });

  for (const file of files) {
    const fullPath = join(dirPath, file.name);
    const s3Key = s3Prefix ? `${s3Prefix}/${file.name}` : file.name;

    if (file.isDirectory()) {
      await uploadDirToS3(fullPath, s3Key);
    } else {
      const fileContent = readFileSync(fullPath);
      const contentType = getContentType(file.name);

      const params = {
        Bucket: BUCKET_NAME,
        Key: s3Key,
        Body: fileContent,
        ContentType: contentType,
      };

      try {
        await s3Client.send(new PutObjectCommand(params));
        console.log(`✓ Uploaded: ${s3Key}`);
      } catch (error) {
        console.error(`✗ Failed to upload ${s3Key}:`, error);
      }
    }
  }
}

function getContentType(fileName) {
  const ext = fileName.split(".").pop().toLowerCase();
  const mimeTypes = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    json: "application/json",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    mp4: "video/mp4",
    webm: "video/webm",
  };
  return mimeTypes[ext] || "application/octet-stream";
}

(async () => {
  try {
    console.log(`Starting upload from ${DIST_FOLDER} to s3://${BUCKET_NAME}/`);
    await uploadDirToS3(DIST_FOLDER);
    console.log("✓ Upload complete!");
  } catch (error) {
    console.error("Upload failed:", error);
    process.exit(1);
  }
})();
