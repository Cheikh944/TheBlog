import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from '../Api/Axios';
import { useAuth } from '../context/authContext';
import './styles/login.css'
import './styles/blog-page.css'
import moment from 'moment';
import SubmitForm from '../components/HandleSubmit/HandleSubmit'

const CreateBlog = () => {

    const handleSubmit = SubmitForm();
    const { auth, setAuth } = useAuth();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('');

    const quillRef = useRef(null);

    const handleImageUpload = async (file) => {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await Axios.post('/upload', formData);
        const imagePath = response.data.imagePath;

      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', imagePath, 'user');
      }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    const Submit = async () => {

      if(!image || !title || !description || !content){
        console.log('Something went wrong uploading')
        alert('Please complete every option below')
        return;
      }

      const response = await handleSubmit(auth.name, auth.id, title, image, content, description);
      if (response === 'Ok'){
        setTitle("");
        setDescription("");
        setContent("");
        setImage("");
      }
    }

    const modules = useMemo(() => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
  
            input.onchange = async () => {
              const file = input.files[0];
              if (file) {
                handleImageUpload(file);
              }
            };
          },
        },
      },
    }),[]);

  return (
    <div className='blog-creation'>
      <div className="blog-base">
        <label htmlFor="titre">Titre : </label>
        <input maxLength="50" type="text" id='titre' value={title} onChange={(e)=> setTitle(e.target.value)}/>
        <label htmlFor="description">Description : </label>
        <textarea maxLength="200" name="description" id="description" cols="20" rows="10"value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
        <label htmlFor="image-blog">Image de présentation : </label>
        <input type="file" id="image-blog" onChange={(e)=> setImage(e.target.files[0])}/>
        <ReactQuill
        ref={quillRef}
        value={content}
        onChange={(value) => setContent(value)}
        modules={modules}
        />
      </div>
      <div className='blog-design'>
        <div className="header-blog">
          <div className='header-img'/>
          <li className='date'>{moment(Date.now()).format('dddd, D MMM YYYY')}</li>
          <h1>{title}</h1>
        </div>
        <div className='blog-content' dangerouslySetInnerHTML={{__html: content}}/>
      </div>
      <button onClick={Submit}>Submit Blog</button>
    </div>
  )
}


export default CreateBlog