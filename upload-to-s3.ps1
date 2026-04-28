# AWS CLI method - Simple approach
# Prerequisites: AWS CLI installed and configured with credentials

# Set your bucket name
$BUCKET_NAME = "travel-app-frontend-123"

# Upload the dist folder to S3
aws s3 sync dist s3://$BUCKET_NAME --delete

# Optional: Make files public readable
# aws s3 sync dist s3://$BUCKET_NAME --acl public-read

# Optional: Add cache control headers for better performance
# aws s3 sync dist s3://$BUCKET_NAME `
#   --exclude "*" --include "*.html" --cache-control "max-age=0" `
#   --metadata-directive REPLACE
# aws s3 sync dist s3://$BUCKET_NAME `
#   --exclude "*" --include "*.js" --include "*.css" --cache-control "max-age=31536000" `
#   --metadata-directive REPLACE

echo "Upload complete!"
