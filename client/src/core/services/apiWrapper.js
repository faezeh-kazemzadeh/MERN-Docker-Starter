export const apiWrapper = async (request, ...args) => {
    try {
        const response = await request(...args);
        return response.data;
    } catch (error) {
        console.error("API call failed:", error);
        throw error;
    }
};