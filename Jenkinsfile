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
                export PATH=$PATH:/usr/bin

                /usr/bin/docker-compose down --remove-orphans
                /usr/bin/docker-compose build --no-cache
                /usr/bin/docker-compose up -d
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