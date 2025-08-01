export const BASE_URL = "https://expensetracker-backend-nrna.onrender.com";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    SIGNUP: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },
  DASHBOARD: {
    GET_DASHBOARD_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: "/api/v1/income/download",
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expenses/add",
    GET_EXPENSE: "/api/v1/expenses/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expenses/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/v1/expenses/download",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-images",
  },
};
