import { NetworkRequest } from './request';

export const GetAPIRequest = async (
  url: string,
  params: any,
  authType: any,
  abortController: AbortController,
  requestState: string,
  successState: string,
  failureState: string
) =>
  NetworkRequest(
    'GET',
    url,
    authType,
    params.body,
    params.headers,
    abortController,
    requestState,
    successState,
    failureState
  );
