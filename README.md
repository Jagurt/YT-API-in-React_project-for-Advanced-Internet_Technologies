#### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Using YouTube API with React

## Description

  I made this project as a college final project for Advanced Internet Technologies.<br />
  It surely could look better but I am tired and don't have much time to correct it.
  
## Technologies
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - version [ECMAScript 2020](https://tc39.es/ecma262/)
* [React](https://en.reactjs.org/docs/getting-started.html) - version 16.13.1
* [YouTube Data API v3](https://developers.google.com/youtube/v3/docs/?apix=true) - version 3.0

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

You have to be careful to not reload website too often or else your api key may become temporarily blocked.

<details>
  <summary>More React related, autocreated, readme content</summary> 
  
### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
</details>

## The App Logic

App.js file has a `state` which stores useful variables.<br />
When variable from `state` is changed via `setState` method a message is send.<br />
Message tells React that variable and all components that variable affects should be <br />
rendered again with updated values. <br />

### Website can be displayed in 3 modes: 
* ViewerMode    - Mode to display searched videos
* PlayerMode    - Mode to display video player, description, comments, and videos *related to played one* displayed on side
* PlaylistMode  - Basically same as ViewerMode but needed some changes becouse Youtube API's JSON <br />
                  for videos and playlistItems are quite different.
<details>
  <summary> *Related videos* </summary>
  
  Videos on side in PlayerMode are not are not related to played one<br />
  but are search results from ViewerMode. I didn't have time to make that work :(
  
  </details>
  
  The `modeSelector` function in App.js is responsible for chosing correct display.
  It is called in App.js `render` method.
  
  ```js
  render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit} />
                <this.modeSelector />
            </div>
        )
    };
  ```
  
