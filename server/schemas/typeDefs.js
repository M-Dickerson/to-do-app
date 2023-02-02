const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        bio: String
        trips: [Trip]
        posts: [Post]
        followers: [User]
        tripCount: Int
        postCount: Int
        followerCount: Int
    }

    type Trip {
        _id: ID!
        location: String!
        posts: [Post]
    }

    type Post {
        _id: ID!
        title: String!
        description: String!
        image: String
        likes: Int
        comments: [Comment]
        createdAt: String!
    }

    type Comment {
        _id: ID!
        text: String!
        user: User
        createdAt: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    input AddPostInfo {
        title: String!
        description: String!
        image: String
        tripId: String
    }

    # Read operations 
    type Query {
        me: User
        getPosts(postId: String): [Post]
        getTrip(tripId: String!): Trip
    }

    # Create, Update, Delete operations
    type Mutation {
        login(email: String!, password: String!): Auth 
        addUser(username: String!, email: String!, password: String!): Auth
        addTrip(location: String!): User
        deleteTrip(tripId: String!): User
        addPost(postInfo: AddPostInfo): Trip
        deletePost(postId: String!): Post
        addComment(postId: String!, text: String!, userId: String!): Post
        deleteComment(commentId: String!, postId: String!): Post
    }
`;

module.exports = typeDefs;
