import Axios from '../Api/Axios';
import { useAuth } from '../context/authContext';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await Axios.get('/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return {name: response.data.name, accessToken: response.data.accessToken, id: response.data.id }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;