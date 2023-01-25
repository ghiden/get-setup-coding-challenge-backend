# GetSetup Backend Coding Challenge

This is a coding challenge project for GetSetup Backend Role

## Setup

1. Usual NPM install

    ```
    npm i
    ```

2. Create an env file for development

    ```
    cp .env.sample .env.development
    ```

3. Initialize a dev database

    ```
    npm run migrate:dev
    ```

4. Check database by using prisma studio

    ```
    npm run prisma-studio:dev
    ```

    It should show 2 guides and 0 availabilities.

5. Run the dev server

    ```
    npm run dev
    ```

6. Run tests

    Initialize the test database

    ```
    npm run migrate:test
    ```

    Verify that all tests are passing

    ```
    npm run test
    ```
