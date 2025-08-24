import { Prisma, PrismaClient, post, user } from "@prisma/client";

const client = new PrismaClient();

const getUsers = (): Prisma.userCreateInput[] => [
  {
    email: "test1@test.com",
    name: "Test User 1",
  },
  {
    email: "test2@test.com",
    name: "Test User 2",
  },
  {
    email: "test3@test.com",
    name: "Test User 3",
  },
];

const getPosts = (users: user[]): Prisma.postCreateInput[] => [
  {
    author: {
      connect: {
        id: users[0]?.id,
      },
    },
    text: "This is a test post",
    title: "Test Post 1",
  },
];

const getComments = (
  users: user[],
  posts: post[],
): Prisma.commentCreateInput[] => [
  {
    author: {
      connect: {
        id: users[0]?.id,
      },
    },
    text: "This is a test comment",
    post: {
      connect: {
        id: posts[0]?.id,
      },
    },
  },
];

const main = async () => {
  const users = await Promise.all(
    getUsers().map((user) =>
      client.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      }),
    ),
  );
  const posts = await Promise.all(
    getPosts(users).map((post) =>
      client.post.create({
        data: post,
      }),
    ),
  );
  const comments = await Promise.all(
    getComments(users, posts).map((comment) =>
      client.comment.create({
        data: comment,
      }),
    ),
  );

  console.log({ users, posts, comments });
};

main();
