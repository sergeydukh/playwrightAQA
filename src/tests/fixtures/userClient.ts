import { test as base, request } from '@playwright/test';
import { UserClient } from '../api/UserClient';

type Fixtures = {
    apiClient: UserClient;
};

export const test = base.extend<Fixtures>({
    apiClient: async ({ baseURL }, use) => {
        // общий контекст запросов с baseURL из конфига
        const ctx = await request.newContext({ baseURL });
        await use(new UserClient(ctx));
        await ctx.dispose();
    }
});

// реэкспорт expect для удобства
export const expect = test.expect;
