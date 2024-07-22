## FakeStoreApi

[![Netlify Status](https://api.netlify.com/api/v1/badges/e51bf785-4c65-4182-aff9-18c5ffbf08e9/deploy-status)](https://app.netlify.com/sites/klimbarkstore/deploys)
![GitHub top language](https://img.shields.io/github/languages/top/Barklim/fakestoreapi)

Simple user list of FakeStoreApi application with TypeScript, React and React Hooks.

- Client - [netlify](https://klimbarkstore.netlify.app/)
- json-server - [vercel](https://todo-list-json-server-hnyxyyqsa-klim-barks-projects.vercel.app/)
- api - [FakeStoreApi](https://fakestoreapi.com/)

## Run application

install dependencies and run application

```
npm i && npm run start
```

## Scripts

- `npm run start` - start application
- `npm run build` - build dev mode
- `npm run ts` - run typescript
- `npm run start:js` - run built javascript
- `npm run lint` - lint react files
- `npm run preview` - preview application
- `npm run test` - run unit test vitest
- `npm run test:ui` - run unit test vitest:ui

## Install tooling

Make sure you have the following installed

- NodeJS — check .nvmrc file for needed version
- Yarn

## Done

- can search user by debounced typing
- can add in editable mode user, if press enter or press button add

## Todo

- add view mode feature by table or list
    - add pagination and virtualization
- classical architecture to module
    - migrate from vite to webpack, vitest to jest
    - custom hook for localstorage
    - local storage or indexdb for offline
- loaders state, skeleton for load
- cannot add items with the same name in a row
- edit fields items
- create transform class for user entity to user item list
- add some styled scss
- down button must close list with animation
- relative paths for imports like @/module/ui/...
- feature api for first time init
- if last item no border bottom
- Keyboard pressing, ctr+z, ctrl+e (radix ui?) e.t.c

For local start better use local [json-server](https://github.com/Barklim/todo-list-json-server) it work faster
```
npm i && npm run start
```
if use local json-server change config/index.ts const URL

## Frontend stack

- **UI**: `react`, `chakra-ui`
- **Data model**: `json-server`, `local storage`
- **Lang**: `typescript`
- **Lint**: `eslint`, `prettier`
- **Deployment**: `netlify`

<div align="center">

[<img title="react" alt="react" height=48 src="https://cdn.auth0.com/blog/react-js/react.png"/>](https://react.dev/)
[<img title="typescript" alt="typescript" height=48 src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png"/>](https://www.typescriptlang.org/)
[<img title="chakra-ui" alt="material-ui" height=48 src="https://avatars.githubusercontent.com/u/54212428?s=200&v=4"/>](https://v2.chakra-ui.com/)
[<img title="vite" alt="vite" height=48 src="https://avatars.githubusercontent.com/u/65625612?s=200&v=4"/>](https://vitejs.dev/)
[<img title="vitest" alt="vite" height=48 src="https://avatars.githubusercontent.com/u/95747107?s=200&v=4"/>](https://vitest.dev/)
[<img title="eslint" alt="eslint" height=48 src="https://d33wubrfki0l68.cloudfront.net/204482ca413433c80cd14fe369e2181dd97a2a40/092e2/assets/img/logo.svg"/>](https://eslint.org/)
[<img title="prettier" alt="prettier" height=48 src="https://prettier.io/icon.png"/>](https://prettier.io/)
</div>