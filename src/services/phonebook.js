// ------------------------------------------------------------------------------------------------------------

// General idea of extracting communication with the backend into a separate module

// ------------------------------------------------------------------------------------------------------------

import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const deleteData = async (id) => {
  const request = axios.deleteData(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

export default {
  getAll,
  create,
  deleteData,
};
