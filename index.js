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


 const user = [];
const schema = buildSchema(`
type User {
    userId: Int
    name : String,
    age : Int,
    email : String,
    mobile : String
}

type Product {
    id : Int
    title: String,
    price : Float,
    imageUrl:String,
    description : String
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
    findProductWithSQL(id:Int) : [Product]
    getAllProduct : [Product]
}

type Mutation{
    createUser(userId: Int, name:String,age:Int, email:String,mobile:String):String
    getUser(userId:Int) :User
    createProductWithSQL(title:String, price:Float, imageUrl:String, description:String) : String
    deleteProductWithSQL(id:Int) : String
    updateProductWithSQL(id:Int, title:String, price:Float, imageUrl:String, description:String) : String
  
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
    },
    createUser : ({userId, name, age, email, mobile}) =>{
        user.push({userId, name, age, email, mobile});
        console.log("user", user);
        return `User added successfully`;
    },
    getUser:({userId}) =>{
         const data = user.filter((r)=>r.userId === userId)
         console.log("return", data);
         return data[0];
    },
    createProductWithSQL : async ({title, price, imageUrl, description}) =>{
        try{
        const response = await axios.post("http://localhost:4948/api/product", {title,price,imageUrl,description})
        console.log("response", response);
        return response.data.message;
        }
        catch(error){
            return error;
        }

    }, 
    findProductWithSQL : async ({id}) =>{
        const data = await axios.get(`http://localhost:4948/api/getproduct?prodId=${id}`)
        console.log("data", data.data.product);
        return data.data.product

    },
    getAllProduct : async () =>{
        const {data} = await axios.get("http://localhost:4948/api/getproducts")
        return data.result
    },
    deleteProductWithSQL : async ({id}) =>{
        try{
        const {data} = await axios.delete(`http://localhost:4948/api/deleteproduct/${id}`)
         return data.message;
        }
        catch(error){
            return error;
        }

    },
    updateProductWithSQL : async ({id,title,price,imageUrl,description}) =>{
        try{
            const {data} = await axios.patch(`http://localhost:4948/api/updateproduct/${id}`, {title,price,imageUrl,description})
            return data.message;
            console.log("Product updated", result);


        }
        catch(error){
            console.log("error", error);
            return error;
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