import React, { useEffect, useState } from 'react'
import './styles/profil.css'
import { Link } from 'react-router-dom';
import Axios from '../Api/Axios';
import { useAuth } from '../context/authContext';

const Profil = () => {
  const { auth } = useAuth();
  const [blogs, setBlogs] = useState([]);
  
  useEffect(() => {
    Axios.get(`/profil/blogs?user_id=${auth.id}`)
    .then(response => {
        setBlogs(response.data);
      })
    .catch(error => {
      res.status(500).json({ success: false, error: 'Something went wrong' + error });
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/profil/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog._id!== id));
    } catch {
    }
  }

  return (
    <div className='profil-row'>
      <h1>Profil</h1>
      <Link to= "/create"><button>New Blog</button></Link>
      <div className="my-blog blog-row">
        {blogs.map(blog => {
        return (
            <div className="my-blog-card" key={blog._id}>
              <Link to= {`/blog/${blog._id}`}>
                <div className='my-blog-card-header-img' style={{ backgroundImage: `url(${blog.imagePres})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}/>
              </Link>
              <h2>{blog.title}</h2>
              <button onClick={()=> handleDelete(blog._id)}>Delete</button>
              <Link to= {`/update/${blog._id}`}><button className='btn-right'>Update</button></Link>
            </div>
         )
        })}
      </div>
    </div>
  )
}

export default Profil