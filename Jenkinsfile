pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'new-branch-name', url: 'https://github.com/chan907/DevOps.git'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "🚀 Starting Deployment..."

                /opt/homebrew/bin/docker-compose down --remove-orphans

                /opt/homebrew/bin/docker-compose build --no-cache

                /opt/homebrew/bin/docker-compose up -d

                echo "✅ Deployment Completed!"
                '''
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