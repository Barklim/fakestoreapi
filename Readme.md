## FakeStoreApi

Simple user list of FakeStoreApi application with TypeScript, React and React Hooks.

- Client - [vercel](https://todos-swart-eight.vercel.app/)
- json-server - [vercel](https://todo-list-json-server-hnyxyyqsa-klim-barks-projects.vercel.app/)

## Run application

```
npm i && npm run start - install dependencies and run application
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

## Todo

- add some styled scss
- migrate from vite to webpack, vitest to jest
- handleclick usecallback?
- down button must close todos with animation
- relative paths for imports like @/module/ui/...
- local storage or indexdb
- feature api for first time init
- ban
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
- **Deployment**: `vercel`

<div align="center">

[<img title="react" alt="react" height=48 src="https://cdn.auth0.com/blog/react-js/react.png"/>](https://react.dev/)
[<img title="typescript" alt="typescript" height=48 src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png"/>](https://www.typescriptlang.org/)
[<img title="chakra-ui" alt="material-ui" height=48 src="https://avatars.githubusercontent.com/u/54212428?s=200&v=4"/>](https://v2.chakra-ui.com/)
[<img title="vite" alt="vite" height=48 src="https://avatars.githubusercontent.com/u/65625612?s=200&v=4"/>](https://vitejs.dev/)
[<img title="vitest" alt="vite" height=48 src="https://avatars.githubusercontent.com/u/95747107?s=200&v=4"/>](https://vitest.dev/)
[<img title="eslint" alt="eslint" height=48 src="https://d33wubrfki0l68.cloudfront.net/204482ca413433c80cd14fe369e2181dd97a2a40/092e2/assets/img/logo.svg"/>](https://eslint.org/)
[<img title="prettier" alt="prettier" height=48 src="https://prettier.io/icon.png"/>](https://prettier.io/)
</div>