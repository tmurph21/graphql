import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

const createPostForUser = async (authorId, data) => {
  const userExists = await prisma.exists.User({
    id: authorId
  });

  if (!userExists) throw new Error('User not found');

  try {
    const post = await prisma.mutation.createPost({
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    }, '{ id title body published author { id name email posts { id title } } }');

    return post;
  } catch (e) {
    return e;
  }
};

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({
    id: postId
  });

  if (!postExists) throw new Error('Post not found');

  try {
    const post = await prisma.mutation.updatePost({
      where: {
        id: postId
      },
      data: {
        ...data
      }
    }, '{ id title body published author { id name email posts { id title } } }');

    return post;
  } catch (e) {
    return e;
  }
};

// createPostForUser('cjnnn5qnt00540863dz6vhhe0', {
//   title: 'Post',
//   body: 'Body',
//   published: true
// }).then((user) => {
//   console.log(JSON.stringify(user, null, 2));
// }).catch(e => console.log(e.message));

// updatePostForUser('cjnoqhkw9007l08631ot8ujwp', {
//   title: 'Async Await Title',
//   body: 'Async Await Body'
// }).then((post) => {
//   console.log(post);
// }).catch(e => console.log(e.message));
