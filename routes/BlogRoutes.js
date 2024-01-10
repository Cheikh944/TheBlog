const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController")

router.get("/", BlogController.GetAll);
router.get('/recent', BlogController.GetRecent);
router.get('/:id', BlogController.GetById);

module.exports = router;