import api from './axios';

export const getPersonalizedRecommendations = async () => {
    try {
        const response = await api.get('/recommendations/personalized');
        return response.data;
    } catch (error) {
        console.error('Error fetching personalized recommendations:', error);
        throw error;
    }
};
