/**
 * Frontend Configuration
 * Centralized configuration for API endpoints and other settings
 */

// Determine API base URL based on environment
const getApiBaseUrl = (): string => {
  // In development, you might want to use http://localhost:8080
  // In production, use relative paths so Nginx proxy handles it
  if (import.meta.env.DEV) {
    // Development: can use direct backend URL or relative path
    // Using relative path to work with both local and VM deployments
    return '/api';
  }
  // Production: use relative path for Nginx proxy routing
  return '/api';
};

export const config = {
  // API Configuration
  api: {
    baseUrl: getApiBaseUrl(),
    
    // Sensor endpoints
    sensors: {
      list: () => `${config.api.baseUrl}/sensor_metadata`,
      add: () => `${config.api.baseUrl}/sensors`,
      delete: (sensorId: string) => `${config.api.baseUrl}/sensors/${sensorId}`,
      import: () => `${config.api.baseUrl}/sensors/import`,
    },
    
    // History/Firestore endpoints
    history: {
      load: () => `${config.api.baseUrl}/history`,
      status: () => `${config.api.baseUrl}/history/status`,
    },
    
    // Webhook endpoint
    webhook: () => `${config.api.baseUrl}/webhook`,
    
    // Health check
    health: () => `${config.api.baseUrl.replace('/api', '')}/health`,
  },

  // Application settings
  app: {
    name: 'Sensor Data Management',
    version: '1.0.0',
  },

  // Polling intervals (in milliseconds)
  polling: {
    historyStatus: 1000, // Check history load status every 1 second
  },
};

export default config;
