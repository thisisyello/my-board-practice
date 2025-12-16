import api from "./api";

export interface CreatePostParams {
    title: string;
    content: string;
}

export const postApi = {
    create: async (data: CreatePostParams) => {
        const response = await api.post('/post', data);
        return response.data
    },
    update: async (id: number, data: Partial<CreatePostParams>) => {
        const response = await api.patch(`/post/${id}`, data);
        return response.data
    },
    getAll: async (page: number = 1) => {
        const response = await api.get(`/post?page=${page}&limit=10`);
        return response.data;
    },
    getMyPosts: async (page: number = 1) => {
        const response = await api.get(`/post/my?page=${page}&limit=10`);
        return response.data;
    },
    getBest: async (limit: number = 3) => {
        const response = await api.get(`/post/best?limit=${limit}`);
        return response.data;
    },
    getOne: async (id: number) => {
        const response = await api.get(`/post/${id}`);
        return response.data;
    },
    like: async (id: number, like: boolean) => {
        const response = await api.patch(`/post/${id}/like`, { like });
        return response.data;
    }
}