import axios from "axios";
const apiRequest = axios.create({
  baseURL: "https://blog-backend-dgvd.onrender.com",
  // baseURL:process.env.BASE_URL,
  withCredentials: true,
});

export default apiRequest;