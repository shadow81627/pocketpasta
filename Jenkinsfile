pipeline {
    agent {
        docker {
            image 'node:12'
            args '-u root'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') {
            steps {
                sh 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list'
                sh 'wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb'
                sh 'apt install ./google-chrome-stable_current_amd64.deb'
                sh 'export CHROME_PATH=$(which google-chrome-stable)'
                sh 'npm ci'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run generate'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run lint'
                sh 'npm run lhci:autorun'
                sh 'npm run test:e2e'
            }
        }
    }
}
