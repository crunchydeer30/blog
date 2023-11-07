import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAll = async () => {
  await prisma.user.deleteMany();
};

// const follow = async () => {
//   await prisma.follows.create({
//     data: {
//       followerId: "2b7436db-927a-4b22-87c3-b5d8e42f90b4",
//       followingId: "580877d4-6b69-48ae-9962-f8ffbc38f985"
//     }
//   });
// };

async function main() {
  await deleteAll();
  // await follow();  
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

