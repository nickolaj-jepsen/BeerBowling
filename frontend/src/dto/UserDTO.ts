import * as t from 'io-ts';

export const UserValidator = t.type({
  exp: t.number,
  token_type: t.string,
  jti: t.string,
  user_id: t.number,
});

export type IUser = t.TypeOf<typeof UserValidator>;
