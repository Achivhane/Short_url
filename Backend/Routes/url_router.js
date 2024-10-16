const express = require("express");
const {
  createShortURL,
  getbyShortId,
  getAnalyticByShortId,
  getAll,
} = require("../Controller/url_controller");
const router = express.Router();

router.post("/", createShortURL);
router.get("/:shortId", getbyShortId);
router.get("/analytics/:shortId", getAnalyticByShortId);
router.get("/", getAll);

module.exports = router;
