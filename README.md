# E-commercify

[![CI](https://github.com/Twaha-Rahman/e-commercify/workflows/CI/badge.svg)](https://github.com/Twaha-Rahman/e-commercify/actions?query=workflow%3ACI)
[![Build Status](https://travis-ci.com/Twaha-Rahman/e-commercify.svg?branch=master)](https://travis-ci.com/github/Twaha-Rahman/e-commercify)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=Twaha-Rahman/e-commercify)](https://dependabot.com)
[![Setup Automated](https://img.shields.io/badge/setup-automated-blue?logo=gitpod)](https://gitpod.io/from-referrer/)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?logo=GitHub)](https://github.com/Twaha-Rahman/e-commercify/pulls)

`E-commercify` is a full open source E-commerce site from the frontend to the backend. The project uses all the latest
and industry approved technologies to create a complete e-commerce site that's ready to be deployed.

You can see a live demo of the project by clicking here -

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Twaha-Rahman/e-commercify)

## Install prerequisites

Start by installing the prerequisite software:

| Name                          | Version | Notes                                                                               |
| ----------------------------- | ------- | ----------------------------------------------------------------------------------- |
| Node.js                       | `12.x`  | [Download Node.js](http://nodejs.org)                                               |
| npm (comes bundled with Node) | `6.x`   | Does not have LTS releases, we use the version bundled with Node LTS                |
| MongoDB Community Server      | `4.2.7` | [Download MongoDB Community Server](https://www.mongodb.com/try/download/community) |

If you're going to contribute to this project, you'll also need a text-editor and `git`. You can use _any_ text editor you want, but we recommend using [VSCode](https://code.visualstudio.com/). We also recommend you use the latest version of [Git](https://git-scm.com/).

## Running For Production

Running `E-Commercify` as a production site is very simple.

Follow these steps -

1. [Install the required softwares](#install-prerequisites)
2. Set up the environment variable file by running -

```
# macOS / Linux
cp sample.env .env

# Windows
copy sample.env .env
```

3. Change the `IS_PRODUCTION` value in the `.env` file from `false` to `true`. Like so -

```
IS_PRODUCTION=true
```

4. Install all the dependencies by running -

```
npm ci
```

5. Start the production server by running -

```
npm run start
```

## Contributing

We are glad to receive PRs from anybody who is interested. If you want to contribute to this open source project
head over to the [Contributing Guide](CONTRIBUTING.md).

## Ask For Help

If you have any question about the project, you can open an issue. You can also reach us in the [E-Commercify Devs](https://discord.gg/gCgdu5s) Discord server.

Happy Coding!
