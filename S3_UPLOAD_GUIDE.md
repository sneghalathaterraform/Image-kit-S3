# Upload to S3 - Quick Guide

You now have two methods to upload your React app to AWS S3:

## Method 1: AWS CLI (Recommended - Simplest)

### Prerequisites:
1. Install AWS CLI: https://aws.amazon.com/cli/
2. Configure credentials:
   ```
   aws configure
   ```
   Enter your AWS Access Key ID and Secret Access Key

### Steps:
1. Build your app:
   ```
   npm run build
   ```

2. Edit `upload-to-s3.ps1` and replace `YOUR_BUCKET_NAME` with your actual bucket name

3. Run the upload script:
   ```
   .\upload-to-s3.ps1
   ```

## Method 2: Node.js Script

### Prerequisites:
1. Install dependencies:
   ```
   npm install
   ```

2. Configure AWS credentials:
   - Option A: Set environment variables:
     ```
     $env:AWS_ACCESS_KEY_ID = "your_access_key"
     $env:AWS_SECRET_ACCESS_KEY = "your_secret_key"
     $env:AWS_REGION = "us-east-1"
     ```
   - Option B: Create `~/.aws/credentials` file (AWS will auto-detect)

### Steps:
1. Edit `upload-to-s3.js` and replace `YOUR_BUCKET_NAME` with your actual bucket name

2. Build your app:
   ```
   npm run build
   ```

3. Run the upload:
   ```
   npm run upload
   ```

## To Find Your S3 Bucket Name:
1. Go to AWS Console: https://console.aws.amazon.com/
2. Navigate to S3 service
3. Find your bucket in the list
4. Copy the bucket name

## AWS Console Setup (if needed):
1. Create a new S3 bucket (or use existing)
2. Give it a name (bucket names are globally unique)
3. Create an IAM user with S3 permissions if you haven't already
4. Get the Access Key ID and Secret Access Key

## Tips:
- `--delete` flag in CLI removes files from S3 that aren't in your dist folder
- Add `--acl public-read` if you want files publicly accessible
- Cache control headers optimize performance for browsers
