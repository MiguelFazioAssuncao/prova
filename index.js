import { randomUUID } from 'crypto';
import express from 'express';
import fs from 'fs';

const server = express();
const PORT = 8000;

server.use(express.json());

server.post('/logs', (request, response) => {
    const body = request.body;

    const user = {
        id: randomUUID(),
        dateRequested: new Date(),
        name: body.name,
    }

    fs.readFile('logs.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error('Erro ao ler arquivo:', err);
            return response.status(500).send('Internal Server Error');
        }

        const logs = data ? JSON.parse(data) : [];
        logs.push(user);

        fs.writeFile('logs.txt', JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error('Erro ao escrever arquivo:', err);
                return response.status(500).send('Internal Server Error');
            }

            return response.status(201).json(user);
        });
    });

});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
