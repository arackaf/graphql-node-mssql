const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const expressGraphql = require("express-graphql");
const resolvers = require("./graphql/resolver");
const schema = require("./graphql/schema");
const { makeExecutableSchema } = require("graphql-tools");

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);
const root = {
  /*db: dbPromise*/
};
const executableSchema = makeExecutableSchema({ typeDefs: schema, resolvers });

app.use(
  "/graphql",
  expressGraphql({
    schema: executableSchema,
    graphiql: true,
    rootValue: root
  })
);

app.use("/src/", express.static(__dirname + "/static/"));
app.use("/node_modules/", express.static(__dirname + "/node_modules/"));

app.listen(process.env.PORT || 3000);
