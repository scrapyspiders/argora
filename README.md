# Argora

Argora is a simple multipurpose and censorship resistant social network living on the Arweave blockchain. 

## Arweave community dependencies

- [use-arconnect](https://github.com/martonlederer/use-arconnect)
- [ar-gql](https://github.com/johnletey/arGQL)

## Future features idea

### bridge web 2.0 -> web 3.0

- "Tweet my toot" button: possibility to make a tweet of a toot when tooting
- "Share" button with a tiny url generation

### features on the arweave

- update profile with weaveID
- Possibility to toot pictures
- Possibility to toot polls
- retoot button

### UI specific

- Loading views when waiting for network response
- Emojis drawer
- Limit the number of characters per toot
- Desktop notifications
- shortcut ctrl+enter/cmd+enter to send a toot without clicking the button
- Display AR cumulated price and $ equivalent when typing on a form

### User incentives

Knowing that:
Each new Post is a new Thread with initialy n_Comments = 0
Each Comment is at the same time someone else's Thread's Comment AND a new Thread with initialy n_Comments = 0

There would be:
A PSC generation along with PSTs for each new Thread.
The user that initialized the Thread becomes the moderator of the comments (feature to define).
Commentators obtain some PSTs in proportion to their comment position.
PSTs give reward for each new Comment on this same Thread.

Example:
1. user A post something
2. A PSC called argora-A-[timestamp] is created
3. 64 PSTs are minted
4. user B comments on A's Thread (-> 2. A PSC called argora-B-[timestamp] is created [...])
5. user B receives 32 PSTs from argora-A-[timestamp]
6. user C comments on A's Thread (-> 2. A PSC called argora-C-[timestamp] is created [...])
7. user C receives 16 PSTs argora-A-[timestamp] from user B
8. and so on until the last 2 commentators get 1 PST each

For each new comment, PSTs holders get paid.
ArVerify would be used to limit sybil attack.

----------------

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
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

----------------

# personal notes

```
{/* <FulfillingSquareSpinner color={colors.purple[1]} /> */}
{/* <ScalingSquaresSpinner color={colors.purple[1]} /> */}
{/* <SelfBuildingSquareSpinner color={colors.purple[1]} /> */}
{/* <PixelSpinner color={colors.blue[1]} /> */}
{/* <CirclesToRhombusesSpinner color={colors.green[1]} /> */}
{/* <LoopingRhombusesSpinner color={colors.blue[1]} /> */}
```

```
{/* <LoopingRhombusesSpinner size={8} color={colors.purple[1]} style={{display: 'inline-block'}} /> mining */}
{/* <PixelSpinner size={30} color={colors.purple[1]} style={{display: 'inline-flex'}} /> (mining) */}
```