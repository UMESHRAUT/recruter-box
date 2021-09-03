import { NetworkRequest } from './request';

export const PostAPIRequest = async (
  url: string,
  body: any,
  authType: any,
  requestState: string,
  successState: string,
  failureState: string,
  abortController?: AbortController
) =>
  NetworkRequest(
    'POST',
    url,
    authType,
    body,
    {},
    abortController || new AbortController(),
    requestState,
    successState,
    failureState
  );
