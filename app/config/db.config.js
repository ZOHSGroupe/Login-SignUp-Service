module.exports = {
  HOST: process.env.MONGODB_HOST || 'localhost',
  PORT: process.env.MONGODB_PORT,
  DB: process.env.MONGODB_DATABASE || "assurance_db"
};