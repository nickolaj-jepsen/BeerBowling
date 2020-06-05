import * as t from 'io-ts';

export const JWTTokenValidator = t.type({
  access: t.string,
  refresh: t.string,
});

export type IJWTToken = t.TypeOf<typeof JWTTokenValidator>;
