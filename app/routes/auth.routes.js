const { verifySignUp,authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const routes = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to auth service application." });
  });
  app.post("/auth/signup",verifySignUp.checkDuplicateEmailOrCin,controller.signup);
//sign in ==login
  app.post("/auth/signin", controller.signin);
  app.post("/auth/exist-email", controller.existByEmail);
  app.post("/auth/exist-national-id", controller.existByNationalId);
  app.post("/auth/change-password",authJwt.verifyToken, controller.changePassword);
};

module.exports = routes;