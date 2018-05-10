pipeline {
    def app
    def base_image = 'm4n/mojofy_frontend'
    environment {
        FRONTEND_TAG = 'latest'
        AWS_ECR_LOGIN = true	
    }

    stages {
        stage('Clone repository') {
            checkout scm
        }


        stage('Test image') {
            steps {
                def dockerfile = 'Dockerfile.test'
                def testImage = docker.build("frontend-test-image:${env.BUILD_ID}", "-f ${dockerfile} ./")

                testImage.inside('-e "NODE_ENV=production" -e BACKEND_API_URL=http://${DOCKER_MACHINE_IP}:3000') {
                    FRONTEND_TAG = sh (
                        script: "node -e \"console.log(require(\'./package.json\').version);\"",
                        returnStdout: true
                        ).trim()
                    sh "cd /app/src && ../node_modules/gulp/bin/gulp.js build"
                    try {
                        sh "cd /app/src && ../node_modules/karma/bin/karma start --watch false --single-run true"
    //                      sh "cp -r /app/src/report ${WORKSPACE}"
                    } catch(err) {
                        sh "echo TESTS FAILED"
    //                      step ([$class: 'JUnitResultArchiver', testResults: 'report/*.xml', healthScaleFactor: 1.0])
                        currentBuild.result = 'UNSTABLE'
                        throw err
                    } finally {
                            sh "cp -r /app/src/report ${WORKSPACE}"
                    }
                    sh 'echo "Tests passed"'
                    //step ([$class: 'JUnitResultArchiver', testResults: 'report/*.xml', healthScaleFactor: 1.0])
                }
            }
            post {
                always {
                    junit "report/*.xml"
                    sh "docker rmi frontend-test-image:${env.BUILD_ID}"
                    sh "rm -rf report"
                }
            }

        }


        stage('Build image') {
            app = docker.build("${base_image}:${FRONTEND_TAG}")
            echo "fronted tag is ${FRONTEND_TAG}"
            echo "Built container image with frontend version ${env.BUILD_NUMBER}"
        }

    //    stage ('Report') {
    //    //    step([$class: 'CheckStylePublisher', pattern: '**/checkstyle-result.xml'])
    //      unstash 'checkstyle-reports'
    //      step([$class: 'hudson.plugins.checkstyle.CheckStylePublisher', checkstyle: 'app/build/reports/checkstyle/checkstyle-result.xml'])
    //
    //      unstash 'junit-reports'
    //      step([$class: 'JUnitResultArchiver', testResults: '**/test-results/**/*.xml'])
    //    }


        stage('Push image') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                //cleanup current user docker credentials
                // workarround for https://issues.jenkins-ci.org/browse/JENKINS-44143
                sh 'rm  ~/.dockercfg || true'
                sh 'rm ~/.docker/config.json || true'

                docker.withRegistry("https://891817301160.dkr.ecr.us-east-2.amazonaws.com/m4n/mojofy_frontend", "ecr:us-east-2:m4n-aws") {
                    app.push("build_${env.BUILD_NUMBER}")
                    app.push("${FRONTEND_TAG}")
                    app.push("latest")
                }
            }
        }
    }
}
