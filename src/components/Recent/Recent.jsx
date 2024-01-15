import React, { useEffect, useState } from 'react'
import './recent.css'
import Axios from '../../Api/Axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Recent = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    Axios.get('/blogs/recent')
    .then(response => {
        console.log('Réponse du serveur:', response?.data);
        setBlogs(response?.data);
      })
    .catch(error => {
        console.error('Erreur lors de la requête GET:', error);
      });
  }, []);

  if(blogs.length < 1) {
    return (
      <p>Loading ...</p>
    )
  }

  return (
    <div className='recent'>
        <h2 className='categorie'>Recent blogs posts</h2>
        <div className="blog-row">
          <Link to= {`/blog/${blogs[0]._id}`} className='recent-card-left'>
            <div className="recent-left-img" style={{
              backgroundImage: `url(${blogs[0].imagePres})`,
             }}
            />
              <div className="card-text">
                <h2 className='date'>{moment(blogs[0].CreatedAt).format('dddd, D MMM YYYY')}</h2>
                <h2>{blogs[0].title}</h2>
                <p>{blogs[0].description}</p>
            </div>
          </Link>
          <Link to= {`/blog/${blogs[1]._id}`} className='recent-card recent-1'>
            <div className="recent-card-img" style={{ backgroundImage: `url(${blogs[1].imagePres})` }}/>
              <div className="card-text">
                <h2 className='date'>{moment(blogs[1].CreatedAt).format('dddd, D MMM YYYY')}</h2>
                <h2>{blogs[1].title}</h2>
                <p>{blogs[1].description}</p>
              </div>
          </Link>
          { blogs[2] &&(
          <Link to={`/blog/${blogs[2]._id}`} className='recent-card recent-2'>
          <div className="recent-card-img" style={{ backgroundImage: `url(${blogs[2].imagePres})` }}/>
            <div className="card-text">
              <h2 className='date'>{moment(blogs[2].CreatedAt).format('dddd, D MMM YYYY')}</h2>
              <h2>{blogs[2].title}</h2>
              <p>{blogs[2].description}</p>
            </div>
        </Link>            
          )}
          { blogs[3] &&(          
          <Link to= {`/blog/${blogs[3]._id}`} className='recent-card-bottom'>
              <div className="recent-card-bottom-img" style={{
                backgroundImage: `url(${blogs[3].imagePres})`,
             }}
                />
              <div className="card-text">
                <h2 className='date'>{moment(blogs[3].CreatedAt).format('dddd, D MMM YYYY')}</h2>
                <h2>{blogs[3].title}</h2>
                <p>{blogs[3].description}</p>
              </div>
          </Link>
          )}
        </div>
    </div>
  )
}

export default Recent