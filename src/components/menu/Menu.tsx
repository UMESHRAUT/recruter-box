import {
  MenuClassKey,
  PopperProps,
  Theme,
  withStyles,
} from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './Menu.scss';

interface Styles extends Partial<Record<MenuClassKey, string>> {}

interface Props extends PopperProps {
  classes: Styles;
  onClose: () => void;
}

export function useMenuState() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl !== null) {
      setAnchorEl(null);
      return;
    }

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return { anchorEl, handleClick, handleClose };
}

const popperOptions = {
  placement: 'bottom-end',
  modifiers: {
    flip: {
      // This is not supported in Popper 1, either wait for Material UI 5 or use another popper wrapper.
      fallbackPlacements: [
        'bottom-end',
        'bottom-start',
        'top-end',
        'top-start',
      ],
    },
  },
};

const HdMenu = withStyles((theme: Theme) => createStyles({}))(
  ({ classes, ...props }: Props) => {
    function handleListKeyDown(event: React.KeyboardEvent) {
      if (
        event.key === 'Tab' ||
        event.key === 'Escape' ||
        event.key === 'Esc'
      ) {
        event.preventDefault();
        props.onClose();
      }
    }

    function onClickAway() {
      props.onClose();
    }

    return (
      <Popper
        open={props.open}
        anchorEl={props.anchorEl}
        popperOptions={popperOptions}
        className={`menu-container ${props.className}`}
      >
        <div>
          <ClickAwayListener onClickAway={onClickAway}>
            <MenuList
              autoFocusItem={props.open}
              style={{ padding: 0 }}
              onKeyDown={handleListKeyDown}
            >
              {props.children}
            </MenuList>
          </ClickAwayListener>
        </div>
      </Popper>
    );
  }
);

export default HdMenu;
