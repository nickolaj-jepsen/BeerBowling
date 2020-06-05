import { IJWTToken, JWTTokenValidator } from '../dto/JWTTokenDTO';
import { decodeObject } from '../utils/decodeObject';
import { request } from './request';

export async function login(
  email: string,
  password: string,
): Promise<IJWTToken> {
  const res = await request(`/api/token/`, {
    method: 'post',
    body: JSON.stringify({ username: email, password }),
  });
  const data = await res.json();
  return decodeObject(JWTTokenValidator, data);
}
