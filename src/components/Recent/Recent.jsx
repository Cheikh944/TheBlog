import React, { useEffect, useState } from "react";
import Axios from "../../Api/Axios";
import moment from "moment";
import { Link } from "react-router-dom";
import './recent.css'

const Recent = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    Axios.get("/blogs/recent")
      .then((response) => {
        setBlogs(response?.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête");
      });
  }, []);

  if (blogs.length < 1) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="recent">
      <h2 className="subTitle">Latest Posts</h2>
      <div className="blog-row">
        <Link to={`/blog/${blogs[0]._id}`} key={blogs[0]._id}>
          <div className="blog-card">
            <div
              className="header-img"
              style={{
                backgroundImage: `url(${blogs[0].imagePres})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
            <div className="card-text">
              <h3 className="date">{moment(blogs[0].CreatedAt).format("dddd, D MMM YYYY")}</h3>
              <h2>{blogs[0].title}</h2>
              <p>{blogs[0].description}</p>
            </div>
          </div>
        </Link>
        <Link to={`/blog/${blogs[1]._id}`} key={blogs[1]._id}>
          <div className="blog-card">
            <div
              className="header-img"
              style={{
                backgroundImage: `url(${blogs[1].imagePres})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
            <div className="card-text">
              <h3 className="date">{moment(blogs[1].CreatedAt).format("dddd, D MMM YYYY")}</h3>
              <h2>{blogs[1].title}</h2>
              <p>{blogs[1].description}</p>
            </div>
          </div>
        </Link>
        <Link to={`/blog/${blogs[2]._id}`} key={blogs[2]._id}>
          <div className="blog-card">
            <div
              className="header-img"
              style={{
                backgroundImage: `url(${blogs[2].imagePres})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
            <div className="card-text">
              <h3 className="date">{moment(blogs[2].CreatedAt).format("dddd, D MMM YYYY")}</h3>
              <h2>{blogs[2].title}</h2>
              <p>{blogs[2].description}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Recent;
