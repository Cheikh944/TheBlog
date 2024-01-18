const express = require("express");
const router = express.Router();
const ProfilControllers = require("../controllers/ProfilController");
const verify = require("../middleware/verifyJWT");

router.post("/create", verify, ProfilControllers.CreatePost);
router.delete("/blogs/:id", ProfilControllers.DeletePost);
router.get("/blogs", ProfilControllers.GetBlogs);
router.post("/update/:id", verify, ProfilControllers.UpdatePost);

module.exports = router;
