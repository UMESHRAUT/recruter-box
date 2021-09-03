import React from 'react';
import { Chip, ChipProps } from '@material-ui/core';
import { StylesProvider } from '@material-ui/core/styles';

const HdChip = (props: ChipProps) => (
  <StylesProvider injectFirst>
    <Chip {...props} deleteIcon={<span className="hevo-icon hevo-close" />} />
  </StylesProvider>
);

export default HdChip;
