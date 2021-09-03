import Cookie from 'js-cookie';
import { useState } from 'react';
import { ERROR, notify } from '../toaster/Toaster';
import {
  HEVO_TOKEN_COOKIE_KEY, LOGOUT,
} from '../../redux/constants/AuthConstants';
import { ActionsState } from './interface';
import { API_FAIL, API_SUCCESS } from '../../redux/constants/ApiStateConstants';

export enum RequestAuthType {
  BASIC = 'BASIC',
  BEARER = 'BEARER',
}

const errorMessage = 'Something went wrong';

export const NetworkRequest = async (
  method: string,
  url: string,
  authType: any,
  params: any,
  headers: any,
  abortController: AbortController,
  requestState: string,
  successState: string,
  failureState: string
) => {
  const token = Cookie.get(HEVO_TOKEN_COOKIE_KEY);

  const authentication =`Bearer ${token}`;

  try {
    const rawData: any = await fetch(url, {
      method,
      signal: abortController.signal,
      body: params && JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        Authorization: authentication,
      },
    });

    if (rawData.status === 400) {
      const jsonData = await rawData.json();
      return {
        type: failureState,
        payload: jsonData.message || jsonData.error_message || errorMessage,
      };
    }

    if (rawData.status === 401 || rawData.status === 403) {
      const jsonData = await rawData.json();

      // notify({
      //   message: jsonData.error_message || errorMessage,
      //   progress_bar: true,
      //   type: ERROR,
      //   closeInTime: 5000,
      // });

      return { type: LOGOUT, payload: jsonData.error_message || errorMessage };
    }

    if (rawData.status === 500) {
      const jsonData = await rawData.json();
      throw new Error(jsonData.error_message || 'Internal server error');
    }

    if (rawData.status >= 500) {
      throw new Error('Gateway Timeout');
    }

    if (rawData.status === 204 || rawData.status === 201) {
      return { type: successState, payload: '' };
    }
    const jsonData = await rawData.json();
    if (jsonData.success === true) {
      return {
        type: successState,
        payload: jsonData.data || jsonData.success_message || errorMessage,
      };
    }

    throw new Error(jsonData.error_message);
  } catch (error) {
    if (error.name === 'AbortError') {
      return { type: requestState };
    }

    return { type: failureState, payload: error.message || errorMessage };
  }
};

/**
 * This hook tracks the side effect status on a list of entities of a give type.
 * Please note that this doesn't share context between different components.
 */
export function useEntityListActionHook() {
  const [actionsState, setActionsState] = useState<ActionsState>({});

  const performAction = async (key: number, request: Promise<any>) => {
    setActionsState((currentState) => ({
      ...currentState,
      [key]: { inflight: true },
    }));

    const response = await request;

    if (response.type === API_SUCCESS) {
      setActionsState((currentState) => ({
        ...currentState,
        [key]: { inflight: false },
      }));
    }

    if (response.type === API_FAIL) {
      setActionsState((currentState) => ({
        ...currentState,
        [key]: { inflight: false, error: response.payload },
      }));

      // notify({
      //   message: response.payload,
      //   progress_bar: true,
      //   type: ERROR,
      //   closeInTime: 5000,
      // });
    }

    return response;
  };

  return {
    actionsState,
    performAction,
  };
}
