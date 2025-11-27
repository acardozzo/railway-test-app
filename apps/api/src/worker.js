/**
 * Worker process for background jobs.
 * Tests: process type "worker", no Service/HTTPRoute created.
 */

console.log('Worker started');
console.log('Platform:', process.env.PLATFORM_SERVICE_NAME);
console.log('Database URL:', process.env.DATABASE_URL ? 'configured' : 'not set');

let jobCount = 0;

// Simulate background job processing
setInterval(() => {
  jobCount++;
  console.log(`[Worker] Processing job #${jobCount} at ${new Date().toISOString()}`);
  
  // Simulate work
  const workDuration = Math.random() * 1000;
  setTimeout(() => {
    console.log(`[Worker] Job #${jobCount} completed in ${workDuration.toFixed(0)}ms`);
  }, workDuration);
}, 5000);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Worker] Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('[Worker] Received SIGINT, shutting down gracefully...');
  process.exit(0);
});
