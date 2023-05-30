const express = require("express");
const app = express();
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

// require axios for make external api calls

const axios = require("axios");





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

type Post {
    userId:Int,
    id:Int,
    title:String,
    body:String
}

type Query {
    hello:String
    welcomeMsg(name:String, date:Int!):String 
    getUser : User
    getPosts:[Post]
}



`)


const root = {
    hello: () => {
        return "Hello World!"
    },
    welcomeMsg: (args) => {
        return `Hey, ${args.name} how's life going! Today date is ${args.date}`
    },
    getUser: () => {
        const user = {
            name: "navneet",
            age: 23,
            email: "navneet@mail.com",
            mobile: 9865365696
        }
        return user
    },
    getPosts: async () => {
        try {
            const posts = await axios.get("https://jsonplaceholder.typicode.com/posts")
            return posts.data;
        }
        catch (error) {
            return error
        }
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