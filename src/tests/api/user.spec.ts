import { test, expect } from '../fixtures/userClient';
import { randomUsername, validAge } from '../../utils/data';

test.describe('User API — basic contract', () => {
    test('POST Create User ', async ({ apiClient }) => {
        const body = { username: randomUsername('sergey'), age: validAge(), user_type: true };
        const res = await apiClient.createUser(body);
        expect(res.username).toBe(body.username);
        expect(typeof res.user_id).toBe('number');
    });

    test('GET Get User Info by user_id', async ({ apiClient }) => {
        const created = await apiClient.createUser({ username: randomUsername('temp'), age: 25, user_type: false });
        const got = await apiClient.getUser(created.user_id);
        expect(got.username).toBe(created.username);
        expect(got.user_id).toBe(created.user_id);
        expect(got.age).toBeGreaterThanOrEqual(1);
        expect(got.age).toBeLessThanOrEqual(100);
    });
});

test.describe('User API — negative cases', () => {
    const badCases = [
        { name: 'age too small (0)', body: { username: randomUsername('bad'), age: 0, user_type: true }, status: 400 },
        { name: 'age too big (101)', body: { username: randomUsername('bad'), age: 101, user_type: true }, status: 400 },
        { name: 'empty username', body: { username: '   ', age: 20, user_type: false }, status: 400 },
        { name: 'wrong user_type type', body: { username: randomUsername('bad'), age: 20, user_type: 'yes' as any }, status: 400 }
    ];

    for (const c of badCases) {
        test(`POST /user → ${c.status} on ${c.name}`, async ({ request }) => {
            const res = await request.post('/user', { data: c.body });
            expect(res.status(), await res.text()).toBe(c.status);
        });
    }

    test('GET /user → 400 when user_id is missing', async ({ request }) => {
        const res = await request.get('/user');
        expect(res.status(), await res.text()).toBe(400);
    });

    test('GET /user → 404 when user not found', async ({ request }) => {
        const res = await request.get('/user', { params: { user_id: 999999 } });
        expect(res.status(), await res.text()).toBe(404);
    });
});
