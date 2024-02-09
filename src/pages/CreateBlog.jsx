import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from '../Api/Axios';
import { useAuth } from '../context/authContext';
import './styles/login.css'
import './styles/blog-page.css'
import moment from 'moment';
import SubmitForm from '../components/HandleSubmit/HandleSubmit'
import { storage } from '../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
        const randomNumber = Math.floor(Math.random() * Date.now());
        const imageRef = ref(storage, `Images/${randomNumber}`);
        await uploadBytes(imageRef, file)
        const downloadURL = await getDownloadURL(imageRef);
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', downloadURL, 'user');
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
        <h2 htmlFor="titre">Titre : </h2>
        <input maxLength="50" type="text" id='titre' value={title} onChange={(e)=> setTitle(e.target.value)}/>
        <h2 htmlFor="description">Description : </h2>
        <textarea maxLength="200" name="description" id="description" cols="20" rows="10"value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
        <h2 htmlFor="image-blog">Image de présentation : </h2>
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
          <h2 className='date'>{moment(Date.now()).format('dddd, D MMM YYYY')}</h2>
          <h1>{title}</h1>
        </div>
        <div className='blog-content' dangerouslySetInnerHTML={{__html: content}}/>
      </div>
      <button onClick={Submit}>Submit Blog</button>
    </div>
  )
}


export default CreateBlog