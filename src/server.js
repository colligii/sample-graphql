const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const fs = require('fs');

var schema;

const data = fs.readFileSync(`${__dirname}/querys/graphql.gql`, { encoding: 'utf8' })

schema = buildSchema(data);

const port = process.env.PORT || 4000;

const username = [
    {
        user: 'teste',
        pass: '123'
    }
]


var root = {
    getUser: ({user}) => {
        const userGraphQL = username.map(item => {
            if(item.user === user) return item
        })
        if(userGraphQL.length !== 1) {
            throw new Error('User not found')
        } else {
            return userGraphQL[0]
        }
    }

}

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(port);
console.log(`GraphQL SERVER IS RUNNING AT PORT ${port}`);