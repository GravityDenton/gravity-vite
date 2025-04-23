# Running Site Locally
- Make sure you have Node.js installed

- Open terminal and run the commands:
  - "npm i"
  - "npm run build"
 
- To open start running the site locally run command:
  - "npm run dev"

# Basic Firebase Commands for Future Use
- To install firebase run command:
  - "npm install firebase"
  - "npm install -g firebase-tools"
  - This step should be optional since firebase files are already in the repository

- To login to firebase in the terminal run command:
  - "firebase login"
  - This should open a window where you login into Gravity's google account
  - Credentials for google account can be provided by someone at Gravity

- (Optional) For deploying site to firebase run command:
  - "firebase deploy"
  - This step should be optional since any commits to the repositoy should automatically deploy to firebase

- If struggling with firebase deploying process, follow this YouTube video exactly:
  - https://www.youtube.com/watch?v=uWA6gCJiOoQ&t=589s
 
- If for whatever reason you are initializing before deploying to firebase make sure to add this line of code to _firebase.json_ after rewrites
  - "predeploy" : ["npm run build"]
  - This makes sure that all dependancies needed are downloaded when deploying
