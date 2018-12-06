import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

export { prisma as default };

// const createPostForUser = async (authorId, data) => {
//   const userExists = await prisma.exists.User({
//     id: authorId
//   });

//   if (!userExists) throw new Error('User not found');

//   try {
//     const post = await prisma.mutation.createPost({
//       data: {
//         ...data,
//         author: {
//           connect: {
//             id: authorId
//           }
//         }
//       }
//     }, '{ id title body published author { id name email posts { id title } } }');

//     return post;
//   } catch (e) {
//     return e;
//   }
// };

// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({
//     id: postId
//   });

//   if (!postExists) throw new Error('Post not found');

//   try {
//     const post = await prisma.mutation.updatePost({
//       where: {
//         id: postId
//       },
//       data: {
//         ...data
//       }
//     }, '{ id title body published author { id name email posts { id title } } }');

//     return post;
//   } catch (e) {
//     return e;
//   }
// };
