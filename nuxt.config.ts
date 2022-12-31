// https://nuxt.com/docs/api/configuration/nuxt-config
import { setAbsoluteSqliteDatabaseUrlForPrisma } from "@sidebase/nuxt-prisma";
setAbsoluteSqliteDatabaseUrlForPrisma("./prisma/dev.db");
export default defineNuxtConfig({
  extends: ["@sidebase/nuxt-prisma"],
});
