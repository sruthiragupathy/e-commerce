import axios from "axios";

class RESTError extends Error {
  constructor(message) {
    super(message);
    this.name = "RESTError";
  }
}

export const RestApiCalls = async (method, route, data) => {
  switch (method) {
    case "GET": {
      try {
        const res = await axios.get(route);
        if (res.status === 200) {
          return {
            response: res.data[route.split("/")[1]],
            error: false
          };
        } else {
          throw new RESTError("OOPS!Could not fetch data from Server");
        }
      } catch (error) {
        return { response: error, error: true };
      }
    }
    default:
      return "The provided method is not valid";
  }
};
