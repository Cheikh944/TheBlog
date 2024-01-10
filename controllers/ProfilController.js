const Blog = require("../models/Blog");

const CreatePost = async (req, res) => {
    const {title, description, name, content, id} = req.body;
    console.log(content)
    console.log(req.file)
    try {
        const newBlog = { name, user_id: id, description, content, title, imagePres: 'http://localhost:3000/Image/' + req.file.filename, CreatedAt: Date.now() };
        await Blog.collection.insertOne(newBlog);
        res.status(201).json({ success: true, message: 'Blog created successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Something went wrong' })
      }
}
const DeletePost = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.json({ success: true, deletedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
}

const GetBlogs = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const blogs = await Blog.find({ user_id: userId });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
}
module.exports = {
    CreatePost,
    DeletePost,
    GetBlogs
}