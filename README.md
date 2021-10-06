# ICD Finlit Adminpanel

Built with [React](https://facebook.github.io/react/), [Material-UI](https://material-ui.com), [React Router](https://reacttraining.com/react-router/).
**No jQuery and Bootstrap!**

**This version uses React 16.8.6, React Router v5, MaterialUI v4, built with React Hooks and React Context (No Redux)**

## Full Version

This is a limited version of [**Full ICD Finlit Adminpanel**] with more components, pages and theme support.

## Features

- React (**16.8.6**)
- React Hooks
- React Context
- **No jQuery and Bootstrap!**
- Mobile friendly layout (responsive)
- Create-react-app under the hood
- React Router v5
- Material-UI v4
- Modular Architecture
- CSS-in-JS styles
- Webpack build
- Stylish, clean, responsive layout
- Authentication

## Pages

We have implemented some basic pages, so you can see our template in action.

- Dashboard
- Typography
- Tables
- Notifications
- Charts
- Icons
- Maps
- Login
- Error

## Quick Start

#### 1. Get the latest version

You can start by cloning the latest version of ICD Finlit Adminpanel on your
local machine by running:

```shell
$ git clone https://@bitbucket.org/Shehrozerao/icd-finlit-adminpanel.git
$ cd icd-finlit-adminpanel
```
#### 2. Install Node Version 10

#### 3. Run `npm install`

This will install both run-time project dependencies and developer tools listed
in [package.json](package.json) file.

#### 4. Run `npm start`

Runs the app in the development mode.

Open http://localhost:3000 to view it in the browser. Whenever you modify any of the source files inside the `/src` folder,
the module bundler ([Webpack](http://webpack.github.io/)) will recompile the
app on the fly and refresh all the connected browsers.

#### 5. Run `npm run build:production`

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Memory Leak Solution
export NODE_OPTIONS=--max_old_space_size=12288
