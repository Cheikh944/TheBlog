const Blog = require("../models/Blog");

const GetAll = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Something went wrong' })
      }
}

const GetRecent = async (req, res) => {
  try {
    const blogs = await Blog.find();
    const sortedBlogs = blogs.sort((blog1, blog2) => {
      const date1 = new Date(blog1.CreatedAt);
      const date2 = new Date(blog2.CreatedAt);
      return date2 - date1;
    });
    res.json(sortedBlogs.slice(0, 4));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Something went wrong' })
  }
}

const GetById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Something went wrong' })
      }
}

module.exports = {
    GetAll,
    GetRecent,
    GetById
}