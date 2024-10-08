console.log(process.env.TYPEORM_MIGRATIONS);
console.log(process.env.TYPEORM_ENTITIES);
module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: ["src/database/migrations"],
    entitiesDir: "src/app/entities/",
  },
};
