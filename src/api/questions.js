import axios from 'axios';

const BASE_PATH = `${import.meta.env.VITE_API_ADDRESS}/questions`;

const GetAllQuestions = async ({ token }) => {
  const { data } = await axios.get(`${BASE_PATH}?token=${token}`);
  return data;
};

const GetQuestionById = async ({ token, id }) => {
  const { data } = await axios.get(`${BASE_PATH}/${id}?token=${token}`);
  return data;
};

const AddQuestion = async ({ token, formData }) => {
  const { data } = await axios.post(`${BASE_PATH}?token=${token}`, formData);
  return data;
};

const UpdateQuestion = async ({ token, formData, id }) => {
  const { data } = await axios.put(`${BASE_PATH}/${id}?token=${token}`, formData);
  return data;
};

const DeleteQuestion = async ({ token, id }) => {
  const { data } = await axios.delete(`${BASE_PATH}/${id}?token=${token}`);
  return data;
};

export {
  GetAllQuestions,
  GetQuestionById,
  AddQuestion,
  UpdateQuestion,
  DeleteQuestion,
};
