# ASAPP Challenge

### Project information

Create a REST API for a chat backend.

### Author

- [Federico Cano](https://www.linkedin.com/in/canofm) <canofedericomartin@gmail.com>

### Pre-requisites

Before running this application, you should need the following programs installed:

- [NodeJS](https://nodejs.org/) (v8.10 or higher)

Also, as optional I would recommend to install [yarn](https://yarnpkg.com/en/) (dependency manager) but you could use `npm` as well, which is installed with `nodejs`.

### Before running

1. Install dependencies by running the following command in your trusted command-line:bash

```bash
yarn
```

or

```bash
npm install
```

2. Create db by running this command:

```bash
yarn knex migrate:lastest
```

or

```bash
npm run knex migrate:lastest
```

### How to run?

1. To start the server: <br />
   **Before starting the server**, you probably would like to set some env variables such as `JWT_SECRET`, `JWT_EXP` or `PORT`.<br />
   In order to set env variables, you should create an `.env` file at root of the project. Take as as example `.sample.env`.

2. Run this command:

```bash
yarn start
```

or

```bash
npm run start
```

### How to run tests?

```bash
yarn test
```

or

```bash
npm run test
```

##### Coverage

```bash
yarn test:coverage
```

or

```bash
npm run test:coverage
```

After running this command, you could see the coverage HTML generated in the folder "coverage" at root level of the project.
