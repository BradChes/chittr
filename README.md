# Chittr
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
<p align="center">
  <img src="images/app-icon.png " alt="Chittr application icon"
	  title="Chittr application icon" align="center" width="200" height="200" />
</p>

## Set-up
Before running this React-Native project, there are a couple of steps to do before hand.
1. Make sure the correct Chittr server version is running locally on your machine:
    - This Chittr application only works on `chittr_server_v6`
      - From within terminal, navigate to `chittr_server_v6` directory and run: `npm install`
      - Update the `./config/config.js` file to point at your mudfoot database
      - Run `npm start` and then navigate to http://localhost:3333/api/v0.0.5/ to see the 'server up' message
      - Finally, run `npm test` in the same directory to check if the API sends back the correct results

2. Once the project has been cloned from GitHub, navigate to the projects directory from within terminal and run `npm install`. This is to download a package and it's dependencies that this project relies on.

3. Open up Android Studio using this project's `android` folder. Once the Android project has loaded, from the build tab, select the `Make Project` option. Then, navigate to the AVD manager and boot up an emulator you would like to use to see this application in.

4. When steps 1, 2 and 3 have been completed you are now ready to run this project. Once again, from within the projects directory, run `react-native run-android`. This should begin the process of building and launching the Chittr application on the Android emulator you have open.

## Introduction
This is a React-Native mobile application using the Chittr API. Within the application a user can signup for a Chittr account. From there, they can log in and access/interact with the Chittr API. Activities within the application are broken down into tabs.

### Home
From the home tab a logged in user can see a list of others, as well as theirs, chits.
- These chits are built up of:
  - Including:
    - User name
    - Date
    - Chit content
  - Can include:
    - Photo
    - Position (Latitude, Longitude)

### Post
Here a logged in user can choose to chit from their account. They can chit only a message if they choose so, but they can also include an image as well as their location if they wanted. 

### Search
This tab is dedicated to searching for other users on Chittr. When a user enters something into the search bar, then presses the search button, a list is populated with users meeting the search criteria. From the list, a user can press a result to be prompted to follow or unfollow that user.

### Settings
The final tab is where all the management takes place, and has been divided into sub headings for readability.
- User Information
  - Update the profile picture by using the camera on device
  - Update user information including:
    - First name
    - Surname
    - Email address
    - Password
- Follow Management
  - List of following users
  - List of followers a user has currently
- Log out
  - Purely one button that logs out the user. Removes the user session token from the server, and clears the async storage on device

## Notable libraries used

### FastImage
Solves issues that general affects `<Image>` in React-Native, this issues are:
- Flickering
- Cache misses
- Low performance loading from cache
- Low performance in general

https://github.com/DylanVann/react-native-fast-image

### React Native Async Storage
An asynchronous, unencrypted, persistent, key-value storage system for React-Native. It is used within this application to store the logged in user's ID and session token. 

https://github.com/react-native-community/async-storage

### React Native Camera
Enables the ability to use the camera on the device. Chittr needs the camera so that a user can update their profile picture as well as include a picture on one of their chits.

https://github.com/react-native-community/react-native-camera

### React Native Geolocation
The addition of getting the location of the user. Used so that a user can chit their location if they so desire.

https://github.com/react-native-community/react-native-geolocation

### React Navigation
Helps with the overall navigation structure of the application.

https://github.com/react-navigation/react-navigation

### React Navigation Tabs
Used to display the tabs a logged in user will see. Helps with the navigation between: 
- Home
- Post
- Search
- Settings

https://github.com/react-navigation/tabs

### React Navigation Stack
Stacks were used when tabs weren't necessary. Mainly when displaying non-prominent views, for example:
- Sign up
- Log in
- Camera
- Following
- Followers

https://github.com/react-navigation/stack

### React Native Background Timer
This library helps set up the scheduling for sending a chit at a certain time.

https://github.com/ocetnik/react-native-background-timer
