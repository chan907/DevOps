pipeline {
    agent any

    environment {
        DOCKER_COMPOSE = 'docker-compose'
    }

    stages {

        stage('Build Docker Images') {
            steps {
                sh '''
                docker-compose down --remove-orphans
                docker-compose build --no-cache
                '''
            }
        }

        stage('Run Containers') {
            steps {
                sh '''
                docker-compose up -d
                '''
            }
        }

        stage('Check Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}