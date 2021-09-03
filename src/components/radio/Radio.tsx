import { RadioClassKey, RadioProps, withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import React from 'react';
import Radio from '@material-ui/core/Radio';

interface Styles extends Partial<Record<RadioClassKey, string>> {
  focusVisible?: string;
}

interface Props extends RadioProps {
  classes: Styles;
}

const HdRadio = withStyles(() =>
  createStyles({
    root: {
      border: 'solid 2px var(--divider-color)',
      borderRadius: '50%',
      padding: 0,
      width: 16,
      height: 16,
      '&$checked,&$checked:hover': {
        borderWidth: 5,
        borderColor: 'var(--accent-color)',
      },
      '&$disabled': {
        backgroundColor: 'var(--divider-color)',
        borderColor: 'var(--divider-color)',
        '&$checked': {
          borderWidth: 3,
          borderColor: 'var(--default-faded-color)',
        },
      },
    },
    disabled: {},
    checked: {},
  }),
)(({ classes, ...props }: Props) => (
  <Radio
    classes={{
      root: classes.root,
      disabled: classes.disabled,
      checked: classes.checked,
    }}
    {...props}
    color="primary"
    icon={<span />}
    checkedIcon={<span />}
  />
));

export default HdRadio;
