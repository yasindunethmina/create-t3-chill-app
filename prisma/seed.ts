import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const client = new PrismaClient();

const getProfiles = () => [
  {
    id: randomUUID(),
    email: "test1@example.com",
    displayName: "Test User 1",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: randomUUID(),
    email: "test2@example.com",
    displayName: "Test User 2",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: randomUUID(),
    email: "test3@example.com",
    displayName: "Test User 3",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
  },
];

const getPosts = (profiles: { id: string }[]) => [
  {
    author: { connect: { id: profiles[0].id } },
    text: "This is a test post",
    title: "Test Post 1",
  },
  {
    author: { connect: { id: profiles[1].id } },
    text: "Another test post",
    title: "Test Post 2",
  },
];

const getComments = (profiles: { id: string }[], posts: { id: string }[]) => [
  {
    author: { connect: { id: profiles[0].id } },
    text: "This is a test comment",
    post: { connect: { id: posts[0].id } },
  },
  {
    author: { connect: { id: profiles[1].id } },
    text: "Another test comment",
    post: { connect: { id: posts[1].id } },
  },
];

const main = async () => {
  // Clean up (optional, for dev)
  await client.comment.deleteMany();
  await client.post.deleteMany();
  await client.profile.deleteMany();

  // Seed profiles
  const profiles = await Promise.all(
    getProfiles().map((profile) => client.profile.create({ data: profile })),
  );

  // Seed posts
  const posts = await Promise.all(
    getPosts(profiles).map((post) => client.post.create({ data: post })),
  );

  // Seed comments
  const comments = await Promise.all(
    getComments(profiles, posts).map((comment) =>
      client.comment.create({ data: comment }),
    ),
  );

  console.log({ profiles, posts, comments });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => client.$disconnect());
