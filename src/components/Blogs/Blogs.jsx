import React, { useEffect, useState } from "react";
import "./allblogs.css";
import Axios from "../../Api/Axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    Axios.get("/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête");
      });
  }, []);

  return (
    <div className="allblogs">
      <h2 className="subTitle">All Blogs</h2>
      <div className="blog-row">
        {blogs.map((blog) => {
          const formattedDate = moment(blog.CreatedAt).format(
            "dddd, D MMM YYYY"
          );
          return (
            <Link to={`/blog/${blog._id}`} key={blog._id}>
              <div className="blog-card">
                <div
                  className="header-img"
                  style={{
                    backgroundImage: `url(${blog.imagePres})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                />
                <div className="card-text">
                  <h3 className="date">{formattedDate}</h3>
                  <h2>{blog.title}</h2>
                  <p>{blog.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
