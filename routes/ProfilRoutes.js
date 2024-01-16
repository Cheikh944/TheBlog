const express = require("express");
const router = express.Router();
const ProfilControllers = require('../controllers/ProfilController')
const upload = require('../middleware/Multer');
const verify = require('../middleware/verifyJWT');

router.post("/create", verify ,upload.single('image'), ProfilControllers.CreatePost);
router.delete('/blogs/:id', ProfilControllers.DeletePost);
router.get('/blogs', ProfilControllers.GetBlogs);
router.post("/update/:id", verify ,upload.single('image'), ProfilControllers.UpdatePost);

module.exports = router;