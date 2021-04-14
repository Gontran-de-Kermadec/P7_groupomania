import axios from 'axios'

const axiosUrl = axios.create({
  baseURL: 'http://localhost:3000/',
//   timeout: 1000,
//   headers: {
//     Authorization: `Bearer ${this.$userInfo.token}`,
// }
});

export default axiosUrl