import React from 'react';
import loader from '../../assets/images/ajax-loader-big.gif';
import './loader.scss';

function Loader({ msg }: any) {
  return (
    <div className="inline-items p-1">
      <img src={loader} width="32" height="32" alt="" />
      <div className="loading-text">
        <div className="p-3">
          <b>{msg || 'LOADING...'} </b>
        </div>
      </div>
    </div>
  );
}

export default Loader;
