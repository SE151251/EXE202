import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://fresh-style.azurewebsites.net/odata',
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      try {
        const newData = await axios.request({
          method: "POST",
          url: "https://fresh-style.azurewebsites.net/odata/Authentications/ReGenerateToken",
          data: {
            accessToken: localStorage.getItem("access_token"),
            refreshToken: localStorage.getItem("refresh_token")
          },
        });

        // Lưu newAccessToken vào Local Storage hoặc trình quản lý trạng thái
        localStorage.setItem("access_token", newData.AccessToken);

        // Thực hiện lại yêu cầu gốc với access token đã làm mới
        error.config.headers.Authorization = `Bearer ${newData.AccessToken}`;
        const response = await axios.request(error.config);
        return response;
      } catch (refreshError) {
        // Xử lý lỗi khi làm mới access token
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
