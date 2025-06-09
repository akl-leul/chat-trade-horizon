
export const ENV = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // App configuration
  app: {
    name: 'Chat Trade Horizon',
    version: '1.0.0',
    description: 'Professional trading and communication platform'
  },
  
  // API configuration
  api: {
    timeout: 30000,
    retryAttempts: 3
  },
  
  // Storage keys
  storage: {
    users: 'cth_users',
    user: 'cth_current_user',
    messages: 'cth_messages'
  }
} as const;
