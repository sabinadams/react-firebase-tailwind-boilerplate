# React + Firebase + Tailwind Boilerplate

This is a boilerplate that provides the initial setup for a React application with Firebase authentication.

React Router is used in the project and Private Routes (routes that require you to be logged in) are already set up. 
Similarly, if you **are** logged in, trying to hit the `/login`, `/signup`, or `/forgot-password` routes will send you to the home page. 

TailwindCSS is also set up and included in this starter, as well as Font Awesome icons.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Check out their docs if you want to know more about what it can offer.

## Setup

This boilerplate requires a little bit of setup before it will be fully functional.

### Firebase setup

Make sure you have a Firebase project set up. You will need to grab the keys and credentials for that project and place those in a file at the root of your project called `.env.local`.

The contents of that file should look like this:

```
REACT_APP_FIREBASE_API_KEY=<placeholder>
REACT_APP_FIREBASE_AUTH_DOMAIN=<placeholder>
REACT_APP_FIREBASE_PROJECT_ID=<placeholder>
REACT_APP_FIREBASE_STORAGE_BUCKET=<placeholder>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<placeholder>
REACT_APP_FIREBASE_APP_ID=<placeholder>
REACT_APP_FIREBASE_MEASUREMENT_ID=<placeholder>
```

### Social Logins

If you plan to use social logins, make sure to configure those correctly in your Firebase project. The providers for Google, Facebook, and Twitter are already set up in the project. Feel free to remove those if you won't be needing them. 

To remove those, you will need to remove them in the following locations:

- `/src/util/firebase.js`
- `/src/contexts/AuthContext.js`
- `/src/components/LoginForm.js`

## Running the Project

Once Firebase is configured correctly, you should be able to run the project by navigating into the folder and running `npm run start`
