/* eslint-disable no-use-before-define */
import React from 'react';
import { InputBaseComponentProps } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';
import ChipInput from 'material-ui-chip-input';
import HdChip from '../chip/Chip';
import ToolTip from '../tooltip/Tooltip';

interface Prop
  extends Omit<InputBaseComponentProps, 'chipRenderer' | 'variant'> {}

export default function HdChipInput(props: Prop) {
  return (
    <StylesProvider injectFirst>
      <div className="HdChipInput-custom">
        <ChipInput
          {...props}
          variant="outlined"
          helperText={<ToolTip>{props.helperText}</ToolTip>}
          chipRenderer={(
            { value: chipValue, handleClick, handleDelete },
            key
          ) => (
              chipValue && <HdChip
                className="mr-3 mb-3"
                key={key}
                onClick={handleClick}
                onDelete={handleDelete}
                label={chipValue}
              />
            )
          }
        />
      </div>
    </StylesProvider>
  );
}
