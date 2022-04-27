const express = require("express");
const tutorialRoute = require("./turorial.routes");
const router = express.Router();

const defaultRoute = [
  {
    path: "/tutorial",
    route: tutorialRoute,
  },
];

defaultRoute.forEach((item) => router.use(item.path, item.route));

module.exports = router;