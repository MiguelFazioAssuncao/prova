import express from 'express';
import fs from 'fs';

const server = express();
const PORT = 8000;

server.use(server.json());

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
