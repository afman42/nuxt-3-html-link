import { usePrisma } from "@sidebase/nuxt-prisma";

export default eventHandler(async (event) => {
  const prisma = usePrisma(event);
  const body = await readBody(event);
  return prisma.post.create({
    data: {
      content: body.text,
    },
  });
});
