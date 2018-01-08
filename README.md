# platform-frontend
Frontend architecture for Vimojo Platform

# What's this?
Easy: A frontend for vimojo's web platform. Just the part the user interacts with.

## Geek info
It's build with AngularJS (1.6.5), and uses Gulp to do automatic stuff, and Karma and Jasmine to test that everything works as expected.

# Start developing this project in 2 minutes 
_(thanks to npm and gulp)_

Clone the repo to your working folder: 
```
git clone git@github.com:videona/platform-frontend.git
```
Go there from the console, and:
```
npm install
gulp build
npm start
```
And that's all, folkes!!

## Yup. And... What about tests?
Well, wasn't all. You can also run tests with npm, just execute:
```
npm test
```
You can do the same with: 
```
karma start
```

# Gulp tasks
There are some tasks created to make your dev work easy. I'll try to put it all here, but will be a more acurate description of all of this on the wiki.
 - **js**: Join and minify all app js, and put it into `/dist/js` (both joint and minified versions).
 - **html**: Move all HTML files (views) to /dist, keeping folder structures.
 - **tests**: Join all tests, and put it into `/dist/js/test.js`.
 - **serve**: Create a server to test in your machine and serve your files.
 - **build**: Execute (in parallel) `js`, `html` and `tests`.
 - **watch**: Start a watcher who update `/dist` files every time a source file change (launch it specific task).

# How we work
We are working with branches. Basically, we have: 
 - A `master` branch, with a production version of the app.
 - A `dev` branch, with the last stable updates.
 - Some feature branches, with the hotest features we're actually developing.
 - You might see some other branches, as `hotfix` or anything. Will be descriptive.

The workflow is, basically, 
 1. Create a branch from `dev` for your feature. 
 2. Work on that branch, and do your code, tests and that stuff there. 
 3. Once you've got it ready, merge again `dev` branch with yours, to get back all new changes. Resolve all the possible conflicts, and make sure ALL tests are working. 
 4. In that moment, you'll be able to launch a Pull Request to `dev`. 
 5. That PR will be reviewed and approved or rejected. 
 	- If rejected, go back to step 2.
 	- If approved, good job!
 6. Periodically, a new app version will be sent to `master`.

# Contribute
You can use this code as you like. If you find a bug, or want to ask for a feature, just open an issue, and we'll do our best. If you can fix it, do a pull request to dev branch, and we promise to review it as fast as possible to merge it.

If you are new on this open source world, here is a short guide about how to make a pull request to contribute:

 1. Fork then clone `git clone git@github.com:your-username/inapp-support.git` **videona/platform-frontend** repository.
 2. Create a new branch in **your personal forked repo**, with a name similar to your edits, such as `fix-whatever`.
 3. Make your edits inside your new branch.
 4. Commit them and push them back to **your personal github fork**.
 5. Make a new Pull Request on the **videona/platform-frontend** repo. Point your branch to the `dev` `videona/platform-frontend`'s branch and submit.
 6. We will do my best to review and accept the code as soon as possible.
