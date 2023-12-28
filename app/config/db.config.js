require('dotenv').config();

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  MONGODB_DOCKER_PORT,
  DB_NAME,
} = process.env;

module.exports = {
  url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${MONGODB_DOCKER_PORT}/${DB_NAME}?authSource=admin`
};
