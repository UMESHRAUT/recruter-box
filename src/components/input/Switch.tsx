import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const switchWidth = 34;
const switchHeight = 20;
const thumbSize = 16;
const hoverFocusRipple = {
  '& + $track': {
    boxShadow: '0px 0px 0px 4px var(--ripple-bg-color)',
  },
};
const hoverFocusCheckedRipple = {
  '& + $track': {
    backgroundColor: 'var(--accent-dark-color)',
    boxShadow: '0px 0px 0px 4px var(--accent-faded-color)',
  },
};
const disabledTrackOpacity = 0.5;

const HdSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: switchWidth,
      height: switchHeight,
      padding: 0,
      borderRadius: switchHeight / 2,
      overflow: 'visible',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.common.white,
      '&:hover': {
        backgroundColor: 'transparent',
        ...hoverFocusRipple,
      },
      '&$checked': {
        transform: 'translateX(14px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: 'var(--accent-color)',
          opacity: 1,
          border: 'none',
        },
        '&:hover': {
          ...hoverFocusCheckedRipple,
        },
        '&$disabled + $track': {
          opacity: disabledTrackOpacity,
        },
      },
      '&$disabled + $track': {
        backgroundColor: 'var(--divider-color)',
        opacity: disabledTrackOpacity,
      },
      '&$disabled': {
        color: theme.palette.common.white,
      },
    },
    thumb: {
      width: thumbSize,
      height: thumbSize,
      boxShadow: 'none',
    },
    track: {
      borderRadius: switchHeight / 2,
      backgroundColor: 'var(--divider-color)',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    disabled: {},
    checked: {},
    focusVisible: {
      ...hoverFocusRipple,
      '&$checked': {
        ...hoverFocusCheckedRipple,
      },
    },
  })
)(({ classes, ...props }: Props) => (
  <Switch
    focusVisibleClassName={classes.focusVisible}
    classes={{
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked,
      disabled: classes.disabled,
    }}
    {...props}
    disableRipple
    color="primary"
  />
));

export default HdSwitch;
