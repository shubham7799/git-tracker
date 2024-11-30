require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { sequelize } = require("./models");
const { History } = require("./models");

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/getAccessToken", async (req, res) => {
  const params =
    "?client_id=" +
    process.env.GITHUB_CLIENT_ID +
    "&client_secret=" +
    process.env.GITHUB_CLIENT_SECRET +
    "&code=" +
    req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: { Accept: "application/json" },
  })
    .then((response) => response.json())
    .then((data) => res.json(data));
});

app.get("/getUserData", async (req, res) => {
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: { Authorization: req.get("Authorization") },
  })
    .then((response) => response.json())
    .then((data) => res.json(data));
});

app.get("/getRepos", async (req, res) => {
  try {
    const user = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: { Authorization: req.get("Authorization") },
    }).then((response) => response.json());
    if (user.id) {
      const repos = await History.findAll({
        where: { uid: user.id },
      });

      const releasePromise = repos.map((repo) =>
        fetch(
          `https://api.github.com/repos/${repo.owner_name}/${repo.repo_name}/releases`,
          {
            method: "GET",
            headers: { Authorization: req.get("Authorization") },
          }
        ).then((response) => response.json())
      );

      const release = await Promise.all(releasePromise);

      const commitPromise = repos.map((repo) =>
        fetch(
          `https://api.github.com/repos/${repo.owner_name}/${repo.repo_name}/commits`,
          {
            method: "GET",
            headers: { Authorization: req.get("Authorization") },
          }
        ).then((response) => response.json())
      );

      const commit = await Promise.all(commitPromise);

      const resRepos = repos.map((repo, index) => ({
        ...repo.dataValues,
        release: release[index],
        commit: commit[index],
      }));

      res.status(200).json(resRepos);
      // .then((releases) => {
      //   console.log(releases);
      //   res.status(200).json(releases);
      // })
      // .catch((error) => {
      //   console.error(error);
      // });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/addRepo", async (req, res) => {
  try {
    const newHistory = {
      uid: req.body.uid,
      owner_name: req.body.owner_name,
      repo_name: req.body.repo_name,
    };
    const repo = await History.findOne({
      where: newHistory,
    });

    if (repo) {
      res.status(409).json({ message: "Repo already added" });
    } else {
      await fetch("https://api.github.com/user", {
        method: "GET",
        headers: { Authorization: req.get("Authorization") },
      }).then(async (response) => {
        if (response.status != 200) {
          res.status(response.status).json(response.json());
        } else {
          const createdHistory = await History.create(newHistory);
          res.status(201).json(createdHistory);
        }
      });
    }
  } catch (error) {
    console.error("Error creating history entry:", error.message);
    res.status(500).json({ message: error.message });
  }
});

async function startServer() {
  sequelize
    .authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error: " + err));

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(
      `GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
}

startServer();
