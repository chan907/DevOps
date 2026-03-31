pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Install Frontend Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Test Frontend') {
            steps {
                bat 'npm test -- --passWithNoTests --watchAll=false'
            }
        }

        stage('Docker Build & Push') {
            steps {
                bat 'docker build -t devops-app .'
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker-compose up -d --build'
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
        always {
            cleanWs()
        }
    }
}
