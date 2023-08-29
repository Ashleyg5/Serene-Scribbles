const { gql } = require('apollo-server-express');


const typeDefs = gql`
  # Define which fields are accessible from the model

type User {
    _id: ID
    name: String
    email: String
    username: String
    myMood:[Mood]
    myEntry:[Entry]
}

type userInput{
  _id: ID
  name: String
  username: String
}

type Mood {
    _id: ID
    sticker: String
    feeling: String
    scale: Number
    why: String
    date: Date
}

type moodInput {
    _id: ID
    sticker: String
    feeling: String
    scale: Number
    why: String
    date: Date
}

type Entry {
    _id: ID
    description: String
    date: Date
}

type entryInput {
    _id: ID
    description: String
    date: Date
}

type Auth {
  token: ID!
  user: User
}

# Define which queries the front end is allowed to make and what data is returned
  
type Query {
    users: [User]
    user(username: String!): User
    mood: [Mood]
    moods(username: String!): [Mood]
    me: User
    entry: [Entry]
    entries(username: String!): [Entry]
}

type Mutation {
    login(username: String!, password: String!): Auth
    addUser(name: String!, email: String!, username: String!, password: String!): Auth
    updateUser(name: String, username: String): User
    addMood(sticker: String!, feeling: String!, scale: Number!, why: String!, date: Date!): Mood
    removeMood(moodId: ID!): User
    addEntry(description: String!, date: Date!): Entry
    removeEntry(entryId: ID!): User
    
}
`;

module.exports = typeDefs;
