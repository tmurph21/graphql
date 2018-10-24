const Query = {
  users(parent, args, { db }, info) {
    if (args.query) {
      return db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()));
    }

    return db.users;
  },
  posts(parent, args, { db }, info) {
    if (args.query) {
      return db.posts.filter(post => (post.title.toLowerCase().includes(args.query.toLowerCase())
        || post.body.toLowerCase().includes(args.query.toLowerCase())));
    }

    return db.posts;
  },
  comments(parent, args, { db }, info) {
    return db.comments;
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
