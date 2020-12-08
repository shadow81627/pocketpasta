pipeline {
    agent {
        docker {
            image 'node:12'
            args '-u root --cap-add=SYS_ADMIN'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') {
            steps {
                sh 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list'
                sh 'wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -'
                sh 'apt-get update'
                sh 'apt install -y google-chrome-stable'
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
                sh 'su - node'
                sh 'npm run lint'
                sh 'npm run lhci:autorun'
                sh 'npm run test:e2e'
            }
        }
    }
}
