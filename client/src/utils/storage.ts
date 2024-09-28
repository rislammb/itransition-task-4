export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (data: string) => {
  localStorage.setItem("token", data);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
