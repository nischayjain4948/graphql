require("dotenv").config();
const express = require("express");
const app = express();

const { graphqlHTTP } = require("express-graphql");
const { schema, root } = require("./graphQLSchema");

// require axios for make external api calls




// localDataBaseMongoDB
const conn = require("./config/db");
conn();






// here we are creating the schema

/*
Inside graphql we have certain scaler type builtIN
-ID
-INT
-String
-List
-Float
-Boolean
*/







// middleware for access the graphql server 
app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root
}))







app.listen(process.env.PORT || 8000, () => {
    console.log("Server is running on port 8000");
})