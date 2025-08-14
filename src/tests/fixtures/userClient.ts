import { test as base, request } from '@playwright/test';
import { UserClient } from '../api/UserClient';

type Fixtures = {
    apiClient: UserClient;
};

export const test = base.extend<Fixtures>({
    apiClient: async ({ baseURL }, use) => {
        const ctx = await request.newContext({ baseURL });
        const client = new UserClient(ctx);
        await use(client);
        await ctx.dispose();
    }
});

export const expect = test.expect;
