# GitTracker

This is a platform where you can add your repositories and check on them for new release.

## Features

- #### Can access all release notes and commits
- #### Will see if any new release has been added
- #### Can login with Github
- #### Runs smoothly on mobile as well

## Prerequisites

Make sure you have the following installed:

- ##### Node.js (v16+)
- ##### npm or yarn
- ##### PostgreSQL (v12+)

## Getting Started

### 1. Clone the Repository

Clone this repository to your system.

### 2. Set Up the Server

#### Navigate to the server directory:

```sh
cd server
```

#### Install dependencies:

```sh
npm install
```

#### Configure the database:

The server requires environment variables for database connection and server configuration. Create a .env file in the server directory:

```sh
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DIALECT=postgres
PORT=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

#### Create the database:

```sh
node scripts/initializeDB.js
```

#### Start the server:

```sh
npm run dev
```

### 3. Set Up the Client

#### Navigate to the client directory:

```sh
cd ../client
```

#### Install dependencies:

```sh
npm install
```

#### Configure the environment:

Create a .env file in the client directory:

```sh
REACT_APP_BASE_URL=
REACT_APP_CLIENT_ID=
```

#### Start the server:

```sh
npm start
```

## Technologies Used

- Backend: Node.js, Express, Sequelize, PostgreSQL
- Frontend: React, Apollo Client
- Other: Markdown rendering, GraphQL queries & mutations
