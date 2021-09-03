import { useState } from 'react';
import { RequestAuthType } from './request';
import {
  API_FAIL,
  API_REQUEST,
  API_SUCCESS,
} from '../../redux/constants/ApiStateConstants';
import { GetAPIRequest } from './GetAPIRequest';
import { NotificationType, notify } from '../toaster/Toaster';
import { PostAPIRequest } from './PostAPIRequest';
import { PutAPIRequest } from './PutAPIRequest';
import { DeleteAPIRequest } from './DeleteAPIRequest';

const abortController = new AbortController();
const useApiHook = (authType?:string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);

  const notifyMessage = (type:NotificationType, message: string) =>{
    // notify({
    //   message,
    //   progress_bar: true,
    //   type,
    //   closeInTime: 5000,
    // });
  };

  const getApi = async (url: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    const response = await GetAPIRequest(
      url,
      {},
      authType || RequestAuthType.BEARER,
      abortController,
      API_REQUEST,
      API_SUCCESS,
      API_FAIL,
    );

    setLoading(false);
    if (response.type === API_SUCCESS) {
      setData(response.payload);
    } else {
      setError(response.payload || 'Something went Wrong!');
    }
  };

  const postApi = async (url: string, body:any) => {
    setLoading(true);
    setError(null);
    setData(null);
    const response = await PostAPIRequest(
      url,
      body,
      authType || RequestAuthType.BEARER,
      API_REQUEST,
      API_SUCCESS,
      API_FAIL,
      abortController,
    );

    setLoading(false);
    if (response.type === API_SUCCESS) {
      setData(response.payload);
    } else {
      const errorMessage = response.payload || 'Something went Wrong!';
      // notifyMessage(NotificationType.ERROR, errorMessage);
      setError(errorMessage);
    }
  };

  const putApi = async (url: string,body?:any) => {
    setLoading(true);
    setError(null);
    setData(null);
    const response = await PutAPIRequest(
      url,
      {body},
      authType || RequestAuthType.BEARER,
      abortController,
      API_REQUEST,
      API_SUCCESS,
      API_FAIL,
    );

    setLoading(false);
    if (response.type === API_SUCCESS) {
      setData(response.payload);
    } else {
      const errorMessage = response.payload || 'Something went Wrong!';
      // notifyMessage(NotificationType.ERROR, errorMessage);
      setError(errorMessage);
    }
  };

  const deleteApi = async (url: string, message:string) => {
    setLoading(true);
    setError(null);
    setData(null);
    const response = await DeleteAPIRequest(
      url,
      {},
      authType || RequestAuthType.BEARER,
      API_REQUEST,
      API_SUCCESS,
      API_FAIL,
      abortController,
    );

    setLoading(false);
    if (response.type === API_SUCCESS) {
      notifyMessage(NotificationType.SUCCESS, message);
      setData(response.payload);
    } else {
      const errorMessage = response.payload || 'Something went Wrong!';
      notifyMessage(NotificationType.ERROR, errorMessage);
      setError(errorMessage);
    }
  };

  return { loading, data, error, getApi, postApi, putApi, deleteApi };
};

export default useApiHook;
