import axios from "axios";

const axiosApp = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_SERVER_URI_BINGO90}`,
});
// const axiosApp = axios.create({baseURL: scheme + 'api.bingo12.corpberry.com'});

export default axiosApp;
