import Axios from '../../Api/Axios';
import useRefreshToken from '../../hooks/useRefresh';
import { useAuth } from '../../context/authContext';

const SubmitForm = ()=> {

    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();

    const handleSubmit = async (name, id, title, image, content, description) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('id', id);
        formData.append('title', title);
        formData.append('image', image);
        formData.append('content', content);
        formData.append('description', description);
  
          try {
            const response = await Axios.post('/profil/create', formData, {
              headers: {
                'Authorization': `Bearer ${auth.accessToken}`
              }
            });
            console.log('Réponse du serveur:', response?.data);
            return "Ok";
          } catch (error) {
            console.error('Erreur lors de la requête POST:', error.response.data.error, error);
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
                console.log('Réponse du serveur après rafraîchissement du jeton:', response?.data);
                return "Ok";
              } catch (error) {
                console.error('Erreur lors de la nouvelle tentative POST après rafraîchissement du jeton:', error);
                throw error; // Propagate the error if the second attempt also fails
              }
            }
            throw error;
          }
    };
    
    return handleSubmit
}
export default SubmitForm