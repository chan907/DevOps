pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'new-branch-name',
                    url: 'https://github.com/chan907/DevOps.git'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker --version
                docker-compose --version

                docker-compose down --remove-orphans
                docker-compose build --no-cache
                docker-compose up -d

                docker ps
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}