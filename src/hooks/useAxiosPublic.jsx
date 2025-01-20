import axios from 'axios';


const axiosPublic = axios.create({
    baseURL: 'https://daily-chronicle-server-side.vercel.app',
  });

const useAxiosPublic = () => {

    return axiosPublic 
};

export default useAxiosPublic;