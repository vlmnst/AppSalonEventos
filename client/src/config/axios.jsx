import axios from "axios";

const plannerAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/eventPlanner`
});

const clientAxios = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/client`
});

export { 
    plannerAxios,
    clientAxios
};