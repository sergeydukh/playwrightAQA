import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let nextId = 1;

// POST /user  { username: string, age: number[1..100], user_type: boolean } -> { user_id, username }
app.post('/user', (req, res) => {
    const { username, age, user_type } = req.body || {};

    if (typeof username !== 'string' || !username.trim()) {
        return res.status(400).json({ error: 'username must be non-empty string' });
    }
    if (typeof age !== 'number' || age < 1 || age > 100) {
        return res.status(400).json({ error: 'age must be integer 1..100' });
    }
    if (typeof user_type !== 'boolean') {
        return res.status(400).json({ error: 'user_type must be boolean' });
    }

    const user = { user_id: nextId++, username: username.trim(), age, user_type };
    users.push(user);

    return res.status(201).json({ user_id: user.user_id, username: user.username });
});

// GET /user?user_id=123  -> { username, age, user_id }
app.get('/user', (req, res) => {
    const user_id = Number(req.query.user_id);
    if (!Number.isInteger(user_id)) {
        return res.status(400).json({ error: 'user_id query param required (integer)' });
    }
    const user = users.find((u) => u.user_id === user_id);
    if (!user) return res.status(404).json({ error: 'user not found' });

    const { username, age } = user;
    return res.json({ username, age, user_id });
});

// health-check
app.get('/health', (_, res) => res.send('ok'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`User API listening on http://localhost:${PORT}`);
});
