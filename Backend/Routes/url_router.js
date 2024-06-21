const express = require("express");
const { createShortURL } = require("../Controller/url_controller");
const router = express.Router();

router.post("/", createShortURL);

module.exports = router;
