const axios = require('axios');

class IPGeolocation {
    constructor() {
        // Simple in-memory cache
        this.cache = new Map();
        this.cacheTimeout = 3600000; // 1 hour
    }

    async getLocation(ip) {
        // Check cache first
        if (this.cache.has(ip)) {
            const cached = this.cache.get(ip);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            // For demo purposes, using a simple mock response
            // In production, use services like ipapi.co, ipinfo.io, or MaxMind
            const location = this.mockIPLookup(ip);

            // Cache the result
            this.cache.set(ip, {
                data: location,
                timestamp: Date.now()
            });

            return location;
        } catch (error) {
            console.error('IP geolocation error:', error);
            return { country: 'UNKNOWN', city: 'Unknown' };
        }
    }

    mockIPLookup(ip) {
        // Mock implementation for demo
        const mockData = {
            '1.1.1.1': { country: 'US', city: 'New York' },
            '2.2.2.2': { country: 'UK', city: 'London' },
            '3.3.3.3': { country: 'ES', city: 'Madrid' },
            '4.4.4.4': { country: 'FR', city: 'Paris' },
            '5.5.5.5': { country: 'DE', city: 'Berlin' }
        };

        // Check if IP matches our mock data
        if (mockData[ip]) {
            return mockData[ip];
        }

        // Random assignment for unknown IPs
        const countries = ['US', 'UK', 'ES', 'FR', 'DE'];
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];

        return {
            country: randomCountry,
            city: 'Unknown'
        };
    }

    // Production implementation using real API
    async getRealLocation(ip) {
        // Example using ipapi.co (free tier available)
        try {
            const response = await axios.get(`https://ipapi.co/${ip}/json/`);
            return {
                country: response.data.country_code,
                city: response.data.city,
                region: response.data.region,
                latitude: response.data.latitude,
                longitude: response.data.longitude
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { IPGeolocation };