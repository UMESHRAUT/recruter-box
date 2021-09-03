import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { OutlinedTextFieldProps } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ToolTip from '../tooltip/Tooltip';

interface Props extends Omit<OutlinedTextFieldProps, 'variant'> {}

interface HdTextFieldProps extends Props{
  variant?:'outlined' | 'filled' | 'standard' | undefined
}

const HdTextField = (props: HdTextFieldProps) => (
  <StylesProvider injectFirst>
    <TextField
      {...props}
      variant={props.variant}
      InputLabelProps={{
        ...props.InputLabelProps,
        ...(props.InputProps?.startAdornment
          ? { className: 'MuiInputLabel-inputAdornedStart' }
          : {}),
      }}
      helperText={<ToolTip>{props.helperText}</ToolTip>}
    />
  </StylesProvider>
);

export default HdTextField;

HdTextField.defaultProps = {
  variant:'outlined'
};
