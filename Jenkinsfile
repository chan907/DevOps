pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Install Frontend Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test Frontend') {
            steps {
                sh 'npm test -- --passWithNoTests --watchAll=false'
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh 'docker build -t devops-app .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d --build'
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
