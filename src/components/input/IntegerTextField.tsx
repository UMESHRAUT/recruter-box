import React, { useEffect, useRef, useState } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { dismissToaster, ERROR, notify } from '../toaster/Toaster';
import HdTextField from './TextField';

/* eslint-disable react/require-default-props */
interface IProps {
  onChange: (value: any) => void;
  disabled: boolean;
  label: string;
  defaultValue?: number;
  required?: boolean;
  helperText?: string;
  className?:string;
  error?:boolean;
  message?:string;
  minimum?:number;
  maximum?:number
  style?:any;
}

function IntegerTextField(props: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [Value, setValue] = useState({
    value: props.defaultValue,
    error: false,
  });

  const handleChange = (value:any) => {
    if (isNaN(value)) {
      setValue({ value, error: true });
      // notify({
      //   message: `${props.label} must be a positive number`,
      //   progress_bar: true,
      //   type: ERROR,
      //   closeInTime: 5000,
      // });
      props.onChange(0);
    } else if(value <= ( props.minimum || 0)){
      // notify({
      //   message: `${props.label} must be greater than ${props.minimum}`,
      //   progress_bar: true,
      //   type: ERROR,
      //   closeInTime: 5000,
      // });
      props.onChange(0);
    }else if(value >= ( props.maximum || 100)){
      // notify({
      //   message: `${props.label} must be maller than ${props.maximum}`,
      //   progress_bar: true,
      //   type: ERROR,
      //   closeInTime: 5000,
      // });
      props.onChange(0);
    }else {
      setValue({ value, error: false });
      dismissToaster();
      props.onChange(value);
    }

    // if (isNaN(value) || (value <= ( props.minimum || 0) ||  value >= ( props.maximum || 100))) {
    //   setValue({ value, error: true });
    //   notify({
    //     message: `${props.label} must be a positive number`,
    //     progress_bar: true,
    //     type: ERROR,
    //     closeInTime: 5000,
    //   });
    //   props.onChange(0);
    // } else {
    //   setValue({ value, error: false });
    //   dismissToaster();
    //   props.onChange(value);
    // }
  };

  useEffect(() => {
    setValue(prev=>({ ...prev, value:props.defaultValue }));
  }, [props.defaultValue]);

  return (
    <StylesProvider injectFirst>
      <HdTextField
        style={props.style}
        className={`pl-0 ${props.className}`}
        helperText={props.helperText||props.message}
        required={props.required}
        inputProps={{
          type: 'number',
          min: props.minimum || 0,
          max: props.maximum || 100
        }}
        inputRef={ref}
        disabled={props.disabled}
        error={Value.error||props.error}
        value={Value.value}
        onChange={(e)=>handleChange(parseInt(e.target.value))}
        fullWidth
        label={props.label}
      />
    </StylesProvider>
  );
}

export default IntegerTextField;
