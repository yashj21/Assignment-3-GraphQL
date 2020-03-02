const express = require('express');
const fs = require('fs');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { Kind } = require('graphql/language');

let aboutMessage = "Issue Tracker API v1.0";

const productsDB = [];

const resolvers = {
    Query: {
        about: () => aboutMessage,
        productList,
    },
    Mutation: {
        setAboutMessage,
        productAdd,
    }
};

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

function productList() {
    return productsDB;
}

function productAdd(_, { product }) {
    product.id = productsDB.length + 1;
    productsDB.push(product);
    return product;
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});


const app = express();
app.use(express.static(__dirname.replace('server','')+'public'));
console.log(__dirname);
app.use(express.json());
server.applyMiddleware({ app, path: '/graphql' });
const PORT =3000;
app.listen(PORT,()=>{console.log('hello')});