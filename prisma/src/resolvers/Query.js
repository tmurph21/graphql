const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }, {
          email_contains: args.query
        }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {};

    if (args.query) {
      opArgs.where = {
        OR: [{
          title_contains: args.query
        }, {
          body_contains: args.query
        }]
      };
    }

    return prisma.query.posts(opArgs, info);
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info);
  },
  me(parent, args, { db }, info) {
    return {
      id: '123095',
      name: 'Bob',
      email: 'bob@example.com'
    };
  },
  post(parent, args, { db }, info) {
    return {
      id: '65462',
      title: 'First Post',
      body: 'This is my first post',
      published: true
    };
  }
};

export { Query as default };
