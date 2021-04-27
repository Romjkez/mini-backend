
module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  entities: [process.env.NODE_ENV === "test" ? `${__dirname}/**/*.entity.{js,ts}` : `dist/**/*.entity.{ts,js}`],
  synchronize: true
  /*migrations: [
    `${baseDir}/migration/!**!/!*.{ts,js}`,
  ],*/
};
