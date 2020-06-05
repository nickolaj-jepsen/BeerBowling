import { fold } from 'fp-ts/es6/Either';
import { pipe } from 'fp-ts/es6/pipeable';
import * as io from 'io-ts';
import { reporter } from 'io-ts-reporters';

export class DecodeError extends Error {}

// Apply a validator and get the result in a `Promise`
export function decodeObject<T, O, I>(
  validator: io.Type<T, O, I>,
  input: I,
): Promise<T> {
  const result = validator.decode(input);
  return pipe(
    result,
    fold(
      (errors) => {
        const messages = reporter(result);
        return Promise.reject(new DecodeError(messages.join('\n')));
      },
      (value) => Promise.resolve(value),
    ),
  );
}
