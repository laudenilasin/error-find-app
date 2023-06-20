import axios from "axios";

export const getData = async <T>(): Promise<T> => {
  const url = 'https://3ol4kpau8g.execute-api.ap-southeast-1.amazonaws.com/prod/proxy-server';
  // const url = `http://localhost:4000/s3-data`;

  const result = await axios
    .get(url)
    .then((response) => {
      console.log(response);
      return response.data.data;
    })
    .catch((error) => {
      console.error(error);
    });

    console.log(result);
  return result;
};
 