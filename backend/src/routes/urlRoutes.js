const express = require("express");
const router = express.Router();
const { shortenUrl, redirectUrl } = require("../controllers/urlController");

// API endpoint for shortening long URLs
router.post("/shorten", shortenUrl);

// API endpoint for redirecting from a short URL to its long URL
router.get("/:shortCode", redirectUrl);

module.exports = router;
