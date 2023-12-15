import { Backend_URL } from "@/lib/Constants";
import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = Backend_URL;

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    async (request) => {
      const session = await getSession();

      if (session) {
        request.headers.Authorization = `Bearer ${session.token.access}`;
      }
      return request;
    },
    (error) => {
      // Handle request errors here

      return Promise.reject(error);
    }
  );
  // End of Request interceptor

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
    }
  );
  return instance;
  // End of Response interceptor
};

export default ApiClient();
