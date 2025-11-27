/**
 * Cron job script.
 * Tests: process type "cron", CronJob resource created.
 * 
 * This script runs once and exits (for CronJob compatibility).
 */

console.log('='.repeat(50));
console.log('Cron job started at:', new Date().toISOString());
console.log('Platform:', process.env.PLATFORM_SERVICE_NAME);
console.log('='.repeat(50));

// Simulate cron task (cleanup, reports, etc.)
async function runCronTask() {
  console.log('[Cron] Starting scheduled task...');
  
  // Simulate database cleanup
  console.log('[Cron] Cleaning up old records...');
  await sleep(1000);
  console.log('[Cron] Cleaned 42 old records');
  
  // Simulate report generation
  console.log('[Cron] Generating daily report...');
  await sleep(500);
  console.log('[Cron] Report generated successfully');
  
  // Simulate cache invalidation
  console.log('[Cron] Invalidating expired cache entries...');
  await sleep(300);
  console.log('[Cron] Cache cleanup completed');
  
  console.log('='.repeat(50));
  console.log('Cron job completed at:', new Date().toISOString());
  console.log('='.repeat(50));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Run and exit
runCronTask()
  .then(() => {
    console.log('[Cron] Exiting with success');
    process.exit(0);
  })
  .catch(err => {
    console.error('[Cron] Error:', err);
    process.exit(1);
  });
