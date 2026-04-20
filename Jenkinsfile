// Jenkins Declarative Pipeline
// Automates: install → build → test → docker build → deploy
// Triggered manually or via webhook on the Jenkins server (localhost:8081)

pipeline {
    agent any  // Run on any available Jenkins agent/node

    environment {
        NODE_ENV = 'production'  // Set Node environment for all stages
    }

    stages {

        // Install React frontend npm packages (reads root package.json)
        stage('Install Frontend Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // Install Express backend npm packages (reads server/package.json)
        stage('Install Backend Dependencies') {
            steps {
                dir('server') {  // Change into the server/ directory
                    sh 'npm install'
                }
            }
        }

        // Compile React app into static files (output goes to /build folder)
        stage('Build Frontend') {
            steps {
                sh 'npm run build'
            }
        }

        // Run React unit tests; --passWithNoTests avoids failure if no tests exist
        stage('Test Frontend') {
            steps {
                sh 'npm test -- --passWithNoTests --watchAll=false'
            }
        }

        // Build the Docker image using the multi-stage Dockerfile
        // Tags the image as devops-app (used by docker-compose app service)
        stage('Docker Build & Push') {
            steps {
                sh 'docker build -t devops-app .'
            }
        }

        // Start (or recreate) only the app and mongo containers
        // Jenkins container itself is excluded to avoid self-restart
        stage('Deploy') {
            steps {
                sh 'docker compose up -d app mongo'
            }
        }
    }

    post {
        // Print success message when all stages pass
        success {
            echo 'SUCCESS ✅'
        }

        // Print failure message and dump app logs to help debug the issue
        failure {
            echo 'FAILED ❌'
            sh 'docker compose logs app || true'  // || true prevents error if container doesn't exist
        }

        // Always clean the Jenkins workspace after the build (free up disk space)
        always {
            cleanWs()
        }
    }
}
