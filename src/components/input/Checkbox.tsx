import { withStyles } from '@material-ui/core';
import Checkbox, {
  CheckboxClassKey,
  CheckboxProps,
} from '@material-ui/core/Checkbox';
import { createStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

interface Styles extends Partial<Record<CheckboxClassKey, string>> {
  focusVisible?: string;
}

interface Props extends CheckboxProps {
  classes: Styles;
}

const HdCheckbox = withStyles(() =>
  createStyles({
    root: {
      border: 'solid 2px var(--divider-color) !important',
      borderRadius: '4px !important',
      padding: '0 !important',
      width: '16px !important',
      height: '16px !important',
      '&$checked,&$indeterminate,&$checked:hover,&$indeterminate:hover': {
        backgroundColor: 'var(--accent-color)',
        borderColor: 'var(--accent-color)',
        color: '#fff',
      },
      '&$disabled': {
        backgroundColor: 'var(--divider-color)',
        borderColor: 'var(--divider-color)',
        color: 'var(--text-secondary-color)',
      },
    },
    disabled: {},
    checked: {},
    indeterminate: {},
  })
)(({ classes, ...props }: Props) => (
  <Checkbox
    classes={{
      root: classes.root,
      disabled: classes.disabled,
      checked: classes.checked,
      indeterminate: classes.indeterminate,
    }}
    {...props}
    color="primary"
    icon={<span />}
    checkedIcon={
      <SvgIcon style={{ width: 14, height: 14, fill: 'none' }}>
        <path
          d="M4.1,12.7 9,17.6 20.3,6.3"
          style={{ stroke: 'currentColor' }}
          strokeDasharray={22.910259}
          strokeLinecap="round"
          strokeWidth="3px"
        />
      </SvgIcon>
    }
    indeterminateIcon={
      <SvgIcon style={{ width: 14, height: 14, fill: 'none' }}>
        <path
          d="M4 12 L 20 12"
          style={{ stroke: 'currentColor' }}
          strokeLinecap="round"
          strokeWidth="3px"
        />
      </SvgIcon>
    }
  />
));

export default HdCheckbox;
