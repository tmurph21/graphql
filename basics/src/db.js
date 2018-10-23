// Scalar types - String, Boolean, Int, Float, ID

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

const db = {
  users,
  posts,
  comments
};

export { db as default };
