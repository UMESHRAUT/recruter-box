import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './Popup.scss';

export interface AuxProps {
  title: any;
  children: any;
}

const Popup = (props: AuxProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          fontSize: '12px',
          color: 'inherit',
          padding: 0,
          left: -6,
        },
        arrow: {
          color: 'var(--surface-bg-color)',
          zIndex: 100000,
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Tooltip
        arrow
        open={open}
        interactive
        onClose={handleClose}
        onOpen={handleOpen}
        placement="right-start"
        title={
          <div className="popup-wrapper">
            <div className="popup config-popup">
              <div className="config-container">{props.title}</div>
            </div>
          </div>
        }
      >
        {props.children}
      </Tooltip>
    </MuiThemeProvider>
  );
};

export default Popup;
