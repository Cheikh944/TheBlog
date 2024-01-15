import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Axios from '../Api/Axios';

const Blog = () => {

  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(`/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données du blog');
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <div className='blog-design'>
        <div className="header-blog">
          <div className='header-img' style={{ backgroundImage: `url(${blog.imagePres})`}}/>
          <li className='date'>{ moment(blog.CreatedAt).format('dddd, D MMM YYYY') }</li>
          <h1>{blog.title}</h1>
        </div>
        <div className='blog-content' dangerouslySetInnerHTML={{__html: blog.content}}/>
      </div>
    </div>
  )
}

export default Blog