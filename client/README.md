# Client

## Webpack

https://github.com/codefine/babylonjs-webpack

## Intro

Start a BABYLON.js project with:

* webpack
* typescript
* pep.js

## Start


``` bash
npm i
```

## Scripts

``` bash
npm run dev     # start development server
npm run build   # package components for production env
```

## Structure

``` bash
- BABYLONJS Project
  |- config            # webpack confs
  |- src
     |- assets         # static resource (textures, models ets.)
     |- libs           # librarys and plugins
     |- styles         # sass styles
     |- components     # Game components
     |- index.ts       # entry file
     |- index.html     # basic html file
  |- postcss.config.js # postcss conf
  |- tsconfig.js       # ts conf
```

## libs

* `tencentTouchFixers` - Fixed Touch-Error in mobile broswer such as { QQ, Wechat }
* `fpsMonitor` - FPS monitor by GUI
