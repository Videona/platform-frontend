pipeline {
    agent any
    environment {
        BASE_IMAGE = 'm4n/mojofy_frontend'
        FRONTEND_TAG = 'latest'
        AWS_ECR_LOGIN = true
        COMPOSE_PROJECT_NAME = "front-${env.BRANCH_NAME.replaceAll('_', '-').replaceAll('#', '')}${env.BUILD_NUMBER}"
        DOCKER_MACHINE_NAME = "jt2micro-${env.COMPOSE_PROJECT_NAME}"
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage("Create docker-machine") {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'videonaAWS',
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    sh "docker-machine create -d amazonec2 --amazonec2-access-key ${AWS_ACCESS_KEY_ID} \
                        --amazonec2-secret-key ${AWS_SECRET_ACCESS_KEY} --amazonec2-region us-east-1  \
                        --amazonec2-zone a --amazonec2-vpc-id vpc-bc023cd8 --amazonec2-security-group mojofy-testing \
                        --amazonec2-instance-type t2.micro ${DOCKER_MACHINE_NAME}"
                }

            }
        }


        stage('Test image') {
            steps {
                script {
                    def dockerfile = 'Dockerfile.test'
                    def testImage = docker.build("frontend-test-image:${env.BUILD_ID}", "-f ${dockerfile} ./")

                    sh "eval \$(docker-machine env --shell bash \$DOCKER_MACHINE_NAME)"
                    testImage.inside('-e "NODE_ENV=production" -e BACKEND_API_URL=http://${DOCKER_MACHINE_IP}:3000') {
                        FRONTEND_TAG = sh (
                            script: "node -e \"console.log(require(\'./package.json\').version);\"",
                            returnStdout: true
                            ).trim()
                        sh "cd /app/src && ../node_modules/gulp/bin/gulp.js build"
                        try {
                            sh "cd /app/src && ../node_modules/karma/bin/karma start --watch false --single-run true"
                        } catch(err) {
                            sh "echo TESTS FAILED"
                            currentBuild.result = 'UNSTABLE'
                            throw err
                        } finally {
                                sh "cp -r /app/src/report ${WORKSPACE}"
                        }
                        sh 'echo "Tests passed"'
                    }
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
            steps {
                script {
                    def app
                    app = docker.build("${BASE_IMAGE}:${FRONTEND_TAG}")
                    echo "fronted tag is ${FRONTEND_TAG}"
                    echo "Built container image with frontend version ${env.BUILD_NUMBER}"
                }
            }
        }


        stage('Push image') {
            when {
                anyOf {
                    branch 'dev'
                    branch 'master'
                }
            }
            steps {
                script {
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

    post {
      always {
          sh "docker-machine rm -y ${DOCKER_MACHINE_NAME}"
      }
    }

}
