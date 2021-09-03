import { NetworkRequest } from './request';

export const PutAPIRequest = async (
  url: string,
  params: any,
  authType: any,
  abortController: AbortController = new AbortController(),
  requestState: string,
  successState: string,
  failureState: string
) =>
  NetworkRequest(
    'PUT',
    url,
    authType,
    params.body || {},
    params.header || {},
    abortController,
    requestState,
    successState,
    failureState
  );
