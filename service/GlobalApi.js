import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResume = (data) => axiosClient.post("user-resumes", data);
const getUserResumes = (userEmail) =>
  axiosClient.get("user-resumes?filters[userEmail][$eq]=" + userEmail);
const UpdateResumeDetails = (id, data) =>
  axiosClient.put("user-resumes/" + id, data);
const getResumeById = (id) =>
  axiosClient.get("user-resumes/" + id + "?populate=*");
const deleteResume = (id) => axiosClient.delete("user-resumes/" + id);

export default {
  createNewResume,
  getUserResumes,
  UpdateResumeDetails,
  getResumeById,
  deleteResume,
};
