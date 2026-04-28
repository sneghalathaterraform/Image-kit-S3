pipeline {
  agent any

  environment {
    AWS_S3_BUCKET = "travel-app-frontend-123"
  }

  stages {

    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/sneghalathaterraform/Image-kit-S3.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build React App') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy to S3') {
      steps {
        withCredentials([[
          $class: 'AmazonWebServicesCredentialsBinding',
          credentialsId: 'aws-credentials',
          accessKeyVariable: 'AWS_ACCESS_KEY_ID',
          secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
        ]]) {
          sh '''
          aws s3 sync dist/ s3://$AWS_S3_BUCKET --delete
          '''
        }
      }
    }
  }
}
