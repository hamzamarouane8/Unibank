## DIGICAMP Front

it's a project that have web frontend prject DIGI-CAMP.
it's an application NodeJS/React managed by  [Lerna](https://github.com/lerna/lerna).

### Architecture project

as mentioned above this is a project managed by lerna , this mean that the project's codebase is orginized into multi-package repositories. 
Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and npm.

##### What does a DIGI-CAMP repo look like?

    ./portfolio-repo
    ├── package.json
    ├── app
    │    └── src
    │       ├── assets
    │       ├── components
    │       ├── features
    │       ├── pages
    │       ├── services
    ├── packages
    │    └── core
    │       ├── package-core-1
    │           └── package.json
    │       ├── package-core-2
    │           └── package.json
    │    └── widget
    │       ├── package-widget-1
    │           └── package.json
    │       ├── package-widget-2
    │           └── package.json

this architecture will allow the project parent "Portfolio-repo" to have multi child projects inside , and these projects are `core` , `widget` and the application it-self `App`, the philosophy behind is to divide the project into multi-mini-projects and each of these project have a spesific role and also to give the possibilite to reuse these packages for other projects .

in Portfolio-repo we have 3 main projects, and they are :
    - `App`
    - `core`
    - `widgets`

and each of these packages have a spesific role to serve that the project parent portfolio-repo will run perfectly .
* package `App` , it contains our application ( call API , UI intergation, handling event ...) and to make sure to separate all layers of App project to insure a strong and understandable communication between all components of the application and for that perpose this project devided to :
    - assets [contains all css files and images and fonts]
    - components [contains all components reusable localy for the application]
    - features [contains all features of each page]
    - pages [contains all pages of the application]
    - services [contains all operations that allows calling apis]
    
    
* Package `Core` it contains all the components UI and all basic operations (login , logout , session...) needed inside `App`.

* package `widgets` it contains all complex components (slider, footer, map...) needed inside `App`.

so basicly `App` uses compoents from package `Core` and `Widgets` , and by this process each package will have a spesific role , and it needs to be respected.

## Getting Started

Let's start by installing Lerna as a dev dependency of your project with npm.
```
# npm i -g lerna
```

after these enter directory of main project and tap:

```
# npm install
# npm run build
# lerna bootstrap
# lerna link
# npm run dev // in mode dev execute this line to recompile automatically all packages 
```

to start the application , re-open another console and tap :

```
# cd app
# npm run start
```
