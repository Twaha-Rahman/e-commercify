# Contribution Guide

The whole project structure can be found on the [Project Structure](#Project-Structure) section.

## How to contribute

We are glad to receive PRs from anybody who is interested. Follow these steps to contribute to this project -

1. Install the required softwares listed in the [README](README.md#Install-prerequisites).
2. Fork the repo
3. Clone your forked repo
4. Set up the environment variable file by running -

```
# macOS / Linux
cp sample.env .env

# Windows
copy sample.env .env
```

5. Create a new branch on the cloned repo and switch to it
6. Make changes to add, update or fix a feature
7. Review/test/debug your changes by [running the server locally](#running-locally-for-development)
8. Commit changes and submit a Pull Request (aka PR in short)

...and that's it! You're now a contributor!

## Project Structure

The `E-Commercify` project being really big, it has been divided into three separate parts -

1. [Backend API](Docs/BACKEND_API.md)
2. [User Visited Site](Docs/USER_VISITED_SITE.md)
3. [Management and Analytics Site](MANAGEMENT_ANALYTICS.md)

## Available Scripts

The project has some helpful scripts to get you up and running. The scripts are -

1. `npm run start` - Runs the server
2. `npm run dev` - Runs the server and restarts the server if any file is changed
3. `npm run debug` - Runs the server with `--inspect` flag (this way we can use [Chrome Dev Tools to debug the server](Docs/DEBUGGING_WITH_INSPECT.md)) and restarts the server if any files is changed.
4. `npm run test` - Runs all the test using Jest
5. `npm run eslint` - Runs ESLint
6. `npm run fill-db` - Injects sample data into the database
