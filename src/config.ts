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

// Determine Grafana base URL based on environment
const getGrafanaBaseUrl = (): string => {
  if (import.meta.env.DEV) {
    // Development: direct access to Grafana
    return 'http://localhost:3000';
  }
  // Production: use relative path for Nginx proxy routing
  return '/grafana';
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

  // Grafana Configuration
  grafana: {
    baseUrl: getGrafanaBaseUrl(),
    
    // Dashboard URLs
    dashboards: {
      main: (panelId?: string) => {
        const base = `${config.grafana.baseUrl}/d-solo/ad8fclh/main-dashboard?orgId=1&timezone=browser&theme=light`;
        return panelId ? `${base}&panelId=${panelId}&__feature.dashboardSceneSolo=true` : base;
      },
      sensor: (sensorId: string) => 
        `${config.grafana.baseUrl}/d/ad6d5kp/sensori-kohtainen-nakyma?orgId=1&timezone=browser&theme=light&var-SensorID=${sensorId}`,
      overview: () => 
        `${config.grafana.baseUrl}/d/adlcv8h/yleisnakyma?orgId=1`,
    },
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
