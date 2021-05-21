# React + Firebase + Tailwind Boilerplate

This project is a boilerplate that provides the initial setup for a React application with Firebase authentication.
TailwindCSS is set up and included, as well as Font Awesome icons.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Check out their docs if you are unsure how to run this project.

## Setup

This boilerplate requires a little bit of setup before it will be fully functional.

### Firebase setup

Make sure you have a Firebase project set up. You will need to grab the keys and credentials for that project and place those in `.env.local` in place of the `<placeholder>` values. 

### Social Logins

If you plan to use social logins, make sure to configure those correctly in your Firebase project. The providers for Google, Facebook, and Twitter are already set up in the project. Feel free to remove those if you won't be needing them. 

To remove those, you will need to remove them in the following locations:

- `/src/util/firebase.js`
- `/src/contexts/AuthContext.js`
- `/src/components/LoginForm.js`

## Running the Project

Once Firebase is configured correctly, you should be able to run the project by navigating into the folder and running `npm run start`