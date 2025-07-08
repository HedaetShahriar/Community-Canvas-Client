import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate} from 'react-router';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

const useAxiosSecure = () => {
    const navigate = useNavigate();

    const { user, logOut } = useAuth();

    axiosInstance.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
    });
    axiosInstance.interceptors.response.use(response => {
        return response;
    }, error => {
        if(error.response && (error.response.status === 401 || error.response.status === 403)) {
            logOut()
                .then(() => {
                    console.error('Unauthorized access - user logged out');
                    navigate('/auth/login');
                })
                .catch(logoutError => {
                    console.error('Error during logout:', logoutError);
                });
        }
        return Promise.reject(error);
    }
    );

    return axiosInstance;
};

export default useAxiosSecure;