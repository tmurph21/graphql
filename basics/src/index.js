import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Scalar types - String, Boolean, Int, Float, ID

// Demo User Data
const users = [
  {
    id: '1',
    name: 'Thomas',
    email: 'tmurph21@gmail.com',
    age: 26
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
  }
];

const posts = [
  {
    id: '1',
    title: 'test',
    body: 'idk',
    published: true,
    author: '1'
  },
  {
    id: '2',
    title: 'idk',
    body: 'test',
    published: true,
    author: '1'
  },
  {
    id: '3',
    title: '...',
    body: '...',
    published: true,
    author: '3'
  }
];

const comments = [
  {
    id: '1',
    text: 'comment 1',
    author: '1',
    post: '1'
  },
  {
    id: '2',
    text: 'comment 2',
    author: '2',
    post: '2'
  },
  {
    id: '3',
    text: 'comment 3',
    author: '1',
    post: '3'
  },
  {
    id: '4',
    text: 'comment 4',
    author: '3',
    post: '1'
  }
];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: ID!, post: ID!): Comment!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (args.query) {
        return users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()));
      }

      return users;
    },
    posts(parent, args, ctx, info) {
      if (args.query) {
        return posts.filter(post => (post.title.toLowerCase().includes(args.query.toLowerCase())
          || post.body.toLowerCase().includes(args.query.toLowerCase())));
      }

      return posts;
    },
    comments(parent, args, ctx, info) {
      return comments;
    },
    me(parent, args, ctx, info) {
      return {
        id: '123095',
        name: 'Bob',
        email: 'bob@example.com'
      };
    },
    post(parent, args, ctx, info) {
      return {
        id: '65462',
        title: 'First Post',
        body: 'This is my first post',
        published: true
      };
    }
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.email);

      if (emailTaken) throw new Error('Email taken');

      const user = {
        id: uuidv4(),
        ...args
      };

      users.push(user);

      return user;
    },
    createPost(parents, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author);

      if (!userExists) throw new Error('User does not exist');

      const post = {
        id: uuidv4(),
        ...args
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author);
      const postExists = posts.some(post => post.published && post.id === args.post);

      if (!userExists) throw new Error('User does not exist');
      if (!postExists) throw new Error('Post does not exist');

      const comment = {
        id: uuidv4(),
        ...args
      };

      return comment;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id);
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.author === parent.id);
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up on port 4000');
});
