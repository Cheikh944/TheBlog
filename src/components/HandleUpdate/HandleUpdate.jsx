import Axios from '../../Api/Axios';
import useRefreshToken from '../../hooks/useRefresh';
import { useAuth } from '../../context/authContext';
import { useParams } from 'react-router-dom';

const UpdateForm = ()=> {

    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    const { id } = useParams();

    const handleSubmit = async (name, authId, title, image, content, description) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('id', authId);
        formData.append('title', title);
        formData.append('image', image);
        formData.append('content', content);
        formData.append('description', description);
  
          try {
            const response = await Axios.post(`/profil/update/${id}`, formData, {
              headers: {
                'Authorization': `Bearer ${auth.accessToken}`
              }
            });
            return "Ok";
          } catch (error) {
            // Vérifier si l'erreur est due à un jeton expiré
            if (error.response && error.response.status === 401 && error.response.data.error === 'Token expired') {
              try {
                const newAccessToken = await refresh();
                setAuth(prev => ({
                  ...prev,
                  accessToken: newAccessToken
                }));
                const response = await Axios.post('/profil/create', formData, {
                  headers: {
                    'Authorization': `Bearer ${newAccessToken}`
                  }
                });
                return "Ok";
              } catch (error) {
                throw error; // Propagate the error if the second attempt also fails
              }
            }
            throw error;
          }
    };
    
    return handleSubmit
}
export default UpdateForm