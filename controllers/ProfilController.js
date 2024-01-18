const Blog = require("../models/Blog");

const CreatePost = async (req, res) => {
  const { title, image, description, name, content, id } = req.body;
  try {
    const newBlog = {
      name,
      user_id: id,
      description,
      content,
      title,
      imagePres: image,
      CreatedAt: Date.now(),
    };
    await Blog.collection.insertOne(newBlog);
    res
      .status(201)
      .json({ success: true, message: "Blog created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const UpdatePost = async (req, res) => {
  const { title, image, description, name, content, id } = req.body;
  const blogId = req.params.id;
  try {
    await Blog.findByIdAndUpdate(
      { _id: blogId }, // Le critère de recherche, vous pouvez utiliser un autre champ comme "name", "user_id", etc., selon vos besoins
      {
        $set: {
          name,
          user_id: id,
          description,
          content,
          title,
          imagePres: image,
          CreatedAt: Date.now(),
        },
      }
    );
    res
      .status(201)
      .json({ success: true, message: "Blog updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const DeletePost = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, error: "Blog not found" });
    }
    res.json({ success: true, deletedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

const GetBlogs = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const blogs = await Blog.find({ user_id: userId });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
};
module.exports = {
  CreatePost,
  DeletePost,
  GetBlogs,
  UpdatePost,
};
