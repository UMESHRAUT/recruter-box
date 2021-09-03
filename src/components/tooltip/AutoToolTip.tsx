import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Theme, makeStyles } from '@material-ui/core/styles';

const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: 'black !important',
  },
  tooltip: {
    padding: '5px !important',
    margin: '5px !important',
    backgroundColor: theme.palette.common.black,
    fontSize: 'inherit',
    color: 'white !important',
    top: '5px',
    left: '-5px',
    position: 'relative',
  },
}));

export interface AuxProps {
  title: string;
  children: any;
  showToolTip?: boolean;
}
const AutoToolTip = (props: AuxProps) => {
  const classes = useStylesBootstrap();
  return (
    <>
      {props.showToolTip ? (
        <Tooltip arrow title={props.title} classes={classes}>
          {props.children}
        </Tooltip>
      ) : (
        props.children
      )}
    </>
  );
};
export default AutoToolTip;

AutoToolTip.defaultProps = {
  showToolTip: true,
};
