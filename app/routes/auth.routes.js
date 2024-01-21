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
    res.json({ message: "Welcome to bezkoder application." });
  });
  app.post("/auth/signin",verifySignUp.checkDuplicateEmailOrCin,controller.signin);

  app.post("/auth/signup", controller.signup);
  app.post("/auth/change-password",authJwt.verifyToken, controller.changePassword);
};

module.exports = routes;