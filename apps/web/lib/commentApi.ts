import api from './api';

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
    user: {
        userName: string;
        userId: string;
    };
}

export const commentApi = {
    create: async (postId: number, content: string) => {
        const response = await api.post<Comment>('/comment', { postId, content });
        return response.data;
    },
    getAll: async (postId: number) => {
        const response = await api.get<Comment[]>(`/comment?postId=${postId}`);
        return response.data;
    },
    getMyComments: async () => {
        const response = await api.get<(Comment & { post: { title: string } })[]>('/comment/my');
        return response.data;
    },
    update: async (id: number, content: string) => {
        const response = await api.patch(`/comment/${id}`, { content });
        return response.data;
    },
    delete: async (id: number) => {
        const response = await api.delete(`/comment/${id}`);
        return response.data;
    }
};
