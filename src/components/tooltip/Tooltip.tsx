import React, { useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { hasOverflowingText } from '../core/utils/dom';

const useStylesBootstrap = makeStyles((theme: Theme) => ({
  arrow: {
    color: 'black',
  },
  tooltip: {
    padding: '5px',
    margin: '5px',
    backgroundColor: theme.palette.common.black,
    fontSize: 'inherit',
    color: 'white',
  },
}));

export interface AuxProps {
  children: any;
  classes?: string;
  interactive?:boolean;
}

const ToolTip = (props: AuxProps) => {
  const [isOverflowed, setIsOverflow] = useState(false);
  const textElementRef = React.useRef<any>(null);

  useEffect(() => {
    setIsOverflow(hasOverflowingText(textElementRef.current, document));
  }, []);

  const classes = useStylesBootstrap();
  return (
    <Tooltip
      interactive={props.interactive}
      arrow
      title={props.children || ''}
      classes={classes}
      disableHoverListener={!isOverflowed}
    >
      <div
        ref={textElementRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        className={props.classes}
      >
        {props.children}
      </div>
    </Tooltip>
  );
};
export default ToolTip;
