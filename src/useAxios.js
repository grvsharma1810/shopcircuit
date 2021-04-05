import axios from "axios";
import { useState } from "react";
import { useToast } from "./components/shared-components/Toast/toast-context"

const getMainURL = (url) => url.split("/")[2];

export const useAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();

  async function genericRequest(callback, successMessage) {
    try {
      setIsLoading(true);
      const data = await callback();
      return data;
    } catch (err) {
      showErrorToast({ title: "Error", description: "Reqest Falied! Server Error" });
    } finally {
      setIsLoading(false);
      if (successMessage) {
        showSuccessToast(successMessage);
      }
    }
  }

  async function getData() {
    return genericRequest(async () => {
      const response = await axios.get(url);
      return response.data[`${getMainURL(url)}Items`];
    });
  }

  async function postData(newItem) {
    return genericRequest(async () => {
      const response = await axios.post(url, newItem);
      return response.data[`${getMainURL(url)}Item`];
    }, { title: "SUCCESS", description: `${newItem.name} added to your ${getMainURL(url)}` });
  }

  async function deleteData(id) {
    return genericRequest(async () => {
      const response = await axios.delete(`${url}/${id}`);
      if (response.status === 204) {
        return "success";
      }
    }, { title: "DELETED", description: `Removed from your ${getMainURL(url)}` });
  }

  return { isLoading, getData, postData, deleteData };
};