import axios from "axios";

export const getData = async <T>(): Promise<T> => {
  const url = `http://localhost:4000/s3-data`;

  const result = await axios
    .get(url)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

  console.log(result, "result!!!!!!!");

  return result;
};
