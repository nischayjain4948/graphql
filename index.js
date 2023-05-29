const express = require("express");
const app = express();
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");





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

const schema = buildSchema(`
type User {
    name : String,
    age : Int,
    email : String,
    mobile : Int
}

type Query {
    hello:String
    welcomeMsg(name:String, date:Int!):String 
    getUser : User
}
`)


const root = {
    hello: () => {
        return "Hello World!"
    },
    welcomeMsg: (args) => {
        return `Hey, ${args.name} how's life going! Today date is ${args.date}`
    }
}





// middleware for access the graphql server 
app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root

}))







app.listen(process.env.PORT || 5500, () => {
    console.log("Server is running on port 5500");
})