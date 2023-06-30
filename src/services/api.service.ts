import axios from "axios";

export const getData = async <T>(): Promise<T> => {
  const url =
    "https://d8hvkbv3rj.execute-api.ap-southeast-1.amazonaws.com/default/proxy-server";

  const result = await axios
    .get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return result;
};
