import merge from 'lodash/merge';

interface IUrlParameters {
  [key: string]: (string | number | undefined) | (string | number)[];
}

export class HTTPError extends Error {
  constructor(public message: string, public response: Response) {
    super(message);
  }
}

export async function request(
  req: RequestInfo,
  init?: RequestInit,
  defaultHeaders = true,
): Promise<Response> {
  let options: RequestInit = init ? init : {};
  if (defaultHeaders) {
    options = merge(
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      },
      init,
    );
  }
  const res = await fetch(req, options);

  if (!res.ok) {
    throw new HTTPError(
      `Error [${res.status} ${res.statusText}] while requesting "${res.url}" `,
      res,
    );
  }
  return res;
}

export function url(path: string, parameters: IUrlParameters): string {
  const x = new URL(path, window.location.origin);

  Object.entries(parameters).forEach(([key, val]) => {
    if (val) {
      x.searchParams.append(key, val.toString());
    }
  });
  return x.href;
}
