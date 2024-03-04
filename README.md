# Project: ddp-bot

First of course is to install all packages:

`yarn install`

## Run database

`yarn db`

## Setup OpenAI

> To start development or build, you need an OpenAI API KEY

- Duplicate the file `/apps/web/.env.template` and rename it to `.env`.
- Replace the API value from `sk-` to your actual API KEY.

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
