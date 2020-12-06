pipeline {
    agent { docker { image 'node:12' } }
    environment {
        CI = 'true'
    }
    stages {
        stage('Install') {
            steps {
                sh 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | tee -a /etc/apt/sources.list.d/google.list'
                sh 'wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -'
                sh 'curl -sL https://deb.nodesource.com/setup_10.x | -E bash -'
                sh 'apt-get install -y google-chrome-stable'
                sh 'export CHROME_PATH=$(which google-chrome-stable)'
                sh 'export LHCI_BUILD_CONTEXT__EXTERNAL_BUILD_URL="$BUILD_URL"'
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
