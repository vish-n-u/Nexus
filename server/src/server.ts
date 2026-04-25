import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { orchestratorTask } from './trigger/orchestrator';

const app = express();
const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

io.on('connection', (socket) => {
  console.log('[socket] client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('[socket] client disconnected:', socket.id);
  });
});

// Internal endpoint — called by the orchestrator task to push socket events
app.post('/emit-status', (req, res) => {
  const { nodeId, status } = req.body;
  io.emit('nodeStatus', { nodeId, status });
  res.json({ ok: true });
});

// Kick off the orchestrator task — responds immediately, runs async
app.post('/run-workflow', async (req, res) => {
  const { nodes, edges } = req.body;
  try {
    await orchestratorTask.trigger({
      nodes,
      edges,
      serverUrl: 'http://localhost:3001',
    });
    res.json({ ok: true });
  } catch (err: any) {
    console.error('[run-workflow] failed to trigger orchestrator:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
