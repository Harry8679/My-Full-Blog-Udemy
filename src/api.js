import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4400/api" });

export default API;