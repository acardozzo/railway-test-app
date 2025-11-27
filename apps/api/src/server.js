const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

// Platform variables (injected by deploy-watchoperation)
const platformVars = {
  projectName: process.env.PLATFORM_PROJECT_NAME,
  serviceName: process.env.PLATFORM_SERVICE_NAME,
  namespace: process.env.PLATFORM_NAMESPACE,
  environment: process.env.PLATFORM_ENVIRONMENT_NAME,
  slug: process.env.PLATFORM_SLUG,
};

// Addon variables (injected from addons)
const addonVars = {
  databaseUrl: process.env.DATABASE_URL,
  redisUrl: process.env.REDIS_URL,
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Platform info endpoint (for testing system variables)
app.get('/platform', (req, res) => {
  res.json(platformVars);
});

// Addons info endpoint (for testing addon injection)
app.get('/addons', (req, res) => {
  res.json({
    database: addonVars.databaseUrl ? 'connected' : 'not configured',
    redis: addonVars.redisUrl ? 'connected' : 'not configured',
  });
});

// Environment info endpoint
app.get('/env', (req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV,
    port: PORT,
    customVar: process.env.CUSTOM_VAR,
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'railway-test-api',
    version: '1.0.0',
    message: 'Railway-like platform E2E test application',
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Platform variables:', platformVars);
  console.log('Addon variables:', Object.keys(addonVars).filter(k => addonVars[k]));
});
