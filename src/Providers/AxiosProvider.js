import axios from "axios";

const domainUrl = "https://shop-circuit.gauravkumarkum4.repl.co";

export const useAxios = () => {

  async function getData(url) {
    console.log("get");
    try {
      const response = await axios.get(`${domainUrl}${url}`);
      console.log(response)
      return response.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404: alert(`Error 404! ${error.response.message}`);
            return null;
          case 500: alert(`Internal Server Error! ${error.response.message}`);
            return null;
          default: return error.response;
        }
      } else if (error.request) {
        alert("Please Check Your Internet Connection");
        return null;
      } else {
        alert("Something went wrong");
      }
    }
  }

  async function postData(url, item) {
    console.log("post");
    try {
      const response = await axios.post(`${domainUrl}${url}`, item);
      console.log(response)
      return response.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404: alert(`Error 404! ${error.response.message}`);
            return null;
          case 500: alert(`Internal Server Error! ${error.response.message}`);
            return null;
          default: return error.response;
        }
      } else if (error.request) {
        alert("Please Check Your Internet Connection");
        return null;
      } else {
        alert("Something went wrong");
      }
    }
  }

  async function deleteData(url) {
    console.log("delete");
    try {
      const response = await axios.delete(`${domainUrl}${url}`);
      console.log(response)
      return response.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404: alert(`Error 404! ${error.response.message}`);
            return null;
          case 500: alert(`Internal Server Error! ${error.response.message}`);
            return null;
          default: return error.response;
        }
      } else if (error.request) {
        alert("Please Check Your Internet Connection");
        return null;
      } else {
        alert("Something went wrong");
      }
    }
  }

  return { getData, postData, deleteData };
};