/**
 * Simple TCP echo server for testing TCP Proxy feature.
 * Tests: tcpProxy.enabled, TCPRoute creation.
 */

const net = require('net');

const PORT = process.env.PORT || 5432;

const server = net.createServer((socket) => {
  console.log(`[TCP] Client connected from ${socket.remoteAddress}:${socket.remotePort}`);
  
  socket.on('data', (data) => {
    const message = data.toString().trim();
    console.log(`[TCP] Received: ${message}`);
    
    // Echo back with prefix
    socket.write(`ECHO: ${message}\n`);
  });
  
  socket.on('end', () => {
    console.log('[TCP] Client disconnected');
  });
  
  socket.on('error', (err) => {
    console.error('[TCP] Socket error:', err.message);
  });
});

server.on('error', (err) => {
  console.error('[TCP] Server error:', err);
  process.exit(1);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[TCP] Echo server listening on port ${PORT}`);
  console.log('[TCP] Platform:', process.env.PLATFORM_SERVICE_NAME);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[TCP] Shutting down...');
  server.close(() => {
    console.log('[TCP] Server closed');
    process.exit(0);
  });
});
