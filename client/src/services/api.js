const API_URL = 'http://localhost:3000/api';

export const api = {
    async searchCities(query) {
        const response = await fetch(`${API_URL}/cities?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to search cities');
        }
        return response.json();
    },

    async getWeather(city) {
        const response = await fetch(`${API_URL}/weather?city=${encodeURIComponent(city)}`);
        if (!response.ok) {
            throw new Error('Failed to get weather');
        }
        return response.json();
    },

    async subscribe(email, city) {
        const response = await fetch(`${API_URL}/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, city }),
        });
        if (!response.ok) {
            throw new Error('Failed to subscribe');
        }
    },

    async confirmSubscription(token) {
        const response = await fetch(`${API_URL}/confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            throw new Error('Failed to confirm subscription');
        }
    },

    async unsubscribe(token) {
        const response = await fetch(`${API_URL}/unsubscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            throw new Error('Failed to unsubscribe');
        }
    },
}; 