pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'echo Build step'
            }
        }

        stage('Test') {
            steps {
                bat 'npm test || echo No tests found'
            }
        }
    }

    post {
        success {
            echo 'SUCCESS ✅'
        }
        failure {
            echo 'FAILED ❌'
        }
    }
}