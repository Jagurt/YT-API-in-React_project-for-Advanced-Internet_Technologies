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

### App.js

App.js file has a `state` which stores useful variables.<br />
When variable from `state` is changed via `setState` method a message is send.<br />
Message tells React that variable and all components that variable affects should be <br />
rendered again with updated values. <br />

#### Website can be displayed in 3 modes: 
* ViewerMode    - Mode to display searched videos
* PlayerMode    - Mode to display video player, description, comments, and videos \*related to played one displayed on side
* PlaylistMode  - Basically same as ViewerMode but needed some changes becouse Youtube API's JSON <br />
                  for videos and playlistItems are quite different.
<details>
  <summary> *"related to played one" </summary>
  
  Videos on side in PlayerMode are not related to played one<br />
  but are search results from ViewerMode. I didn't have time to make that work :(
  
  </details>
  
  The `modeSelector` function in App.js is responsible for chosing correct display<br />
  based on a \"kind\" of clicked search result.<br />
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
  
## ViewerMode.js
ViewerMode gets results from search from App and then displays it.

ViewerMode has a `state` that looks like this:
* searchedResults - all searched results that have been passed to ViewerMode by App (default 50)
* viewedResults - results from search that are currently visible on site (default 10, up to 50)

`state` is set twice becouse of the different cases we call ViewerMode.
* Firstly in `constructor` method - it works when we already have searched when we build ViewerMode component
* Secondly in `componentWillReceiveProps` method - when we receive results after ViewerMode has been built

I disabled page scrolling in `index.html`

```html
<body style="height: 100%; overflow: hidden;">
 ```
 
and made ViewerMode component scrollable.<br />
That enables tracking of ViewerMode components scroll value and loading more<br />
results when scrolled to the bottom.<br />
Check is made as `onScroll` event and it calls `longenSearchResult` method <br />
which checks scroll value of container with list of results.

## PlayerMode.js
PlayerMode gets selected video from App and then displays it, its comments, and videos \*related to it.

<details>
  <summary> *"related to it" </summary>
  
  Videos on side  are not related to played one but instead<br />
  are search results from ViewerMode. I didn't have time to make that work :(<br />
  tho i know how.
  
</details>

### VideComments.js
VideComments has most job to do in `constructor`.

It has to distinguish `video` prop between a `videoItem` and `playlistItem`, <br />
correctly get `videoId`, call YouTube API for comments, save them to state <br />
and force update to rerender comments.

In `render` method list of comments items is created and then returned.

### CommentItem.js
CommentItem is just html and ccs code responsible for correct displaying<br />
of comment and its details.

### ViewerMode in PlayerMode
I thought it would be cool if I could scroll those side videos<br />
and have them loading dynamically so I implemented ViewerMode in PlayerMode.

I made ViewerMode take its width as a prop and created a constructor to handle this case.

## PlaylistMode
PlaylistMode is basically a ViewerMode but with different items.

It has to call YouTube API to get `playlistItems` contained in clicked playlist.<br />
Then when it gets `playlistItems` it calls `forceUpdate` to rerender display.

It, like a PlayerMode, uses ViewerMode to display items it got from YouTube API.<br />
Big downside to this solution is that all components such as "VideoComments" have<br />
to distinguish whether video comes from playlist or search.

I feel like there is probably smart way to go around that but i haven't found it.

## The end
I hope my readme is as clear as it could be considering I am writing it at 11 pm.
I would like to thank my Proffesor (whom name I don't know if I can type in here) <br />
for having most substantive and useful classes in college.
