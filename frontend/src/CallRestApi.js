import axios from "axios";

class RESTError extends Error {
  constructor(message) {
    super(message);
    this.name = "RESTError";
  }
}

export const RestApiCalls = async (method, route, data) => {
  console.log(method,route)
  switch (method) {
    case "GET": {
      try {
        const res = await axios({
          method: 'GET',
          url: route
        });
        console.log({res});
        if (res.status === 200) {
          return {
            response: res.data,
            error: false
          };
        } else {
          throw new RESTError("OOPS!Could not fetch data from Server");
        }
      } catch (error) {
        return { response: error, error: true };
      }
    }
    case  "POST": {
      try {
        const res = await axios.post(route,data)
        return res.data;
      }
      catch(error) {
        console.log(error);
        return { success: false, error: error.message};
      }
    }
    case "DELETE": {
      try {
        const res = await axios.delete(route)
        return res.data
      }
      catch(error) {
        return { success: false, error: error.message};
      }
    }

    default:
      return "The provided method is not valid";
  }
};
