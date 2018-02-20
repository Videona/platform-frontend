node {
    def app
    def base_image = 'm4n/mojofy_frontend'
    environment {
        FRONTEND_TAG = 'latest'
    }

    stage('Clone repository') {
        checkout scm
    }


    stage('Test image') {
        def dockerfile = 'Dockerfile.test'
        def testImage = docker.build("my-image:${env.BUILD_ID}", "-f ${dockerfile} ./")

        testImage.inside {
//            FRONTEND_TAG = 'v' + sh (
//                script: 'node -e "console.log(require('./package.json').version);"',
//                returnStdout: true
//                ).trim()
            sh "../node_modules/gulp/bin/gulp.js build"
            try {
                sh "../node_modules/karma/bin/karma start --watch false --single-run true"
            } catch(err) {
                sh "echo TESTS FAILED"
                step ([$class: 'JUnitResultArchiver', testResults: 'report/*.xml', healthScaleFactor: 1.0])
                currentBuild.result = 'UNSTABLE'
                throw err
            }
            sh 'echo "Tests passed"'
        }
    }


    stage('Build image') {
        app = docker.build("${base_image}")
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


//    stage('Push image') {
//        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
//            app.push("${env.BUILD_NUMBER}")
//            app.push()
//            app.push("latest")
//        }
//    }
//}
