import { withStyles } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const HdMenuItem = withStyles(() =>
  createStyles({
    root: {
      fontSize: 12,
      fontWeight: 600,
      padding: '12px 16px',
      '&:hover:not($selected):not(.Mui-disabled), &.Mui-focusVisible:not($selected):not(.Mui-disabled)': {
        backgroundColor: 'var(--hover-bg-color)',
      },
      '&$selected:not(.Mui-disabled)': {
        backgroundColor: 'var(--ripple-bg-color)',
      },
      '&.warning': {
        color: 'var(--warning-color)',
      },
      '&.error': {
        color: 'var(--error-color)',
      },
      '&.has-separator': {
        borderTop: 'solid 1px var(--divider-color)',
      },
      '&.Mui-disabled': {
        color: 'var(--text-secondary)',
        cursor: 'default',
      },
    },
    selected: {},
  })
)(MenuItem);

export default HdMenuItem;
