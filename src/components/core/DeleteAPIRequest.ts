import { NetworkRequest } from './request';

export const DeleteAPIRequest = async (
  url: string,
  params: any,
  authType: any,
  requestState: string,
  successState: string,
  failureState: string,
  abortController?: AbortController
) =>
  NetworkRequest(
    'DELETE',
    url,
    authType,
    params.body || {},
    params.headers || {},
    abortController || new AbortController(),
    requestState,
    successState,
    failureState
  );
