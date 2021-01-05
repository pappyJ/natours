# Natours Project

A node js project using the mvc design pattern

case study for learning node js as many core node js concepts are implemented on the course developing this project

containarization using docker

Enviromental variables included to help you to start playing around immediatly you run mpm install

### Prerequisites

To run this project locally, the follow tools need to be installed:

- [Node.js](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

### Installation

Clone the project:

```
git clone https://github.com/pappyJ/natours.git
```

Move into the project directory and install it's dependencies:

```
cd natours/
npm install
```

To start the dev API server run the following command:

```
npm start
```

To run with a mongodb image run the command:

### Prerequisites

To run this project locally, the follow tools need to be installed:

- [Docker](https://docs.docker.com/engine/install/)

```
npm run start:docker

```

To Rapid Developement Use An Api Client eg:

[Postman](https://www.postman.com/)

Todo:Api Documentation

```
For Local MongoDB usage remove the `user` and `pass` options in `server.js` and change the connection URI `DATABASE_LOCAL_DOCKER` to `DATABASE_LOCAL`
```
