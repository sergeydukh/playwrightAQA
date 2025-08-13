import { APIRequestContext, expect } from '@playwright/test';

export type UserPostBody = {
  username: string;
  age: number;  
  user_type: boolean;
};

export type UserPostResponse = {
  user_id: number;
  username: string;
};

export type UserGetResponse = {
  user_id: number;
  username: string;
  age: number;
};

export class UserClient {
  constructor(private request: APIRequestContext) {}

  async createUser(body: UserPostBody): Promise<UserPostResponse> {
    const res = await this.request.post('/user', { data: body });
    
    expect(res.ok(), `POST /user failed: ${res.status()} ${await res.text()}`).toBeTruthy();
    expect(res.status()).toBe(201);

    const json = (await res.json()) as UserPostResponse;
    
    expect(typeof json.user_id).toBe('number');
    expect(json.username).toBe(body.username);
    return json;
  }

  async getUser(user_id: number): Promise<UserGetResponse> {
    const res = await this.request.get('/user', { params: { user_id } });
    expect(res.ok(), `GET /user failed: ${res.status()} ${await res.text()}`).toBeTruthy();
    expect(res.status()).toBe(200);

    const json = (await res.json()) as UserGetResponse;
   
    expect(json.user_id).toBe(user_id);
    expect(typeof json.username).toBe('string');
    expect(typeof json.age).toBe('number');
    expect(json.age).toBeGreaterThanOrEqual(1);
    expect(json.age).toBeLessThanOrEqual(100);
    return json;
  }
}
