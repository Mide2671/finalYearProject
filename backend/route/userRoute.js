const { Router } = require("express");
const { crawler, process, chat } = require("../controllers/userControllers");

const router = new Router();
router.get("/crawl", crawler);
router.get("/test", (req, res) => {
  res.send("hello");
});
router.post("/process", process);
router.get("/chat", chat);

module.exports = router;
