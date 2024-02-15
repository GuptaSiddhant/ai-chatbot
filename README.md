# Project: @ddp-bot

Based on Song Turbo Starter Project: _RTKQ_

It contains a _NextJS_ App with a UI Library package. As well as packages for Typescript definitions and Redux toolkit. It also containg examples of using RTK Query for API fetching.

## Next steps:

- Initialize git and make the first commit

  `git init -b main`

  `git add .`

  `git commit -m "chore: Project created"`

- Connect a remote repository and push to it.

  `git remote add origin <LINK TO REPO>`

  `git push`

- Setup CI/CD

- Implement the project :-)

---

## Packages source files:

- The web app (_@ddp-bot/web_) - /apps/web
- UI lib (_@ddp-bot/web-ui_) - /packages/ui/web-ui
- Typescript (_@ddp-bot/types_) - /packages/core/types
- Redux Toolkit (_@ddp-bot/store_) - /packages/core/store
- RTK Query - (_@ddp-bot/api_) - /packages/core/api

---

First of course is to install all packages:

`yarn install`

## Development Web

Mocking is turned on by default for dev environment and off for production builds. Global flag is set in files /apps/web/.env and /apps/web/.env.development respectively. Mocking is also set on a per api level in /packages/core/api-mocks/src/handlers.ts

To start server:

`yarn dev:web`

Available at http://localhost:3000

---

## Run development server for ui lib using Storybook

`yarn dev:storybook`

Available at http://localhost:6006

---

## To build the web app for deploy

`yarn build:web`

Generated app can be found at: /apps/web/.next

---

## Building storybook for deploy

`yarn build:storybook`

Generated app can be found at: /packages/ui/web/storybook-static

---

For questions contact bjorn.allvin@accenture.com
