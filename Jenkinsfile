pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/chan907/DevOps.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
    }

    post {
        success {
            echo 'Build & Test Successful ✅'
        }
        failure {
            echo 'Build Failed ❌'
        }
    }
}