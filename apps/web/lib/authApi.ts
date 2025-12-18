import api from './api';

export interface SignupParams {
  userName: string;
  userId: string;
  password: string;
}

export interface LoginParams {
  userId: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: number;
    userName: string;
    userId: string;
  };
}

export const authApi = {
  signup: async (data: SignupParams) => {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },
  
  login: async (data: LoginParams) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get<{ id: number; userName: string; userId: string; createdAt: string }>('/auth/me');
    return response.data;
  }
};
