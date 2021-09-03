import React from 'react';
import { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import HdAutocomplete from './Autocomplete';
import HdTextField from './TextField';

interface Props
  extends Omit<AutocompleteProps<any, any, any, any>, 'renderInput'> {
  // eslint-disable-next-line react/require-default-props
  inputLabel?: string;
  // eslint-disable-next-line react/require-default-props
  placeholder?: string;
  // eslint-disable-next-line react/require-default-props
  autoCompleteClassName?: string;
  // eslint-disable-next-line react/require-default-props
  variant?:'outlined' | 'filled' | 'standard' | undefined
}

const HdSelectInput = ({
   variant,
  inputLabel,
  className,
  placeholder,
  ...props
}: Props) => {
  let displayText = placeholder;
  let displayRemaining = '';
  let shouldLabelShrink: boolean | undefined;

  const alwaysShowDisplayText =
    !inputLabel ||
    (Array.isArray(props.value)
      ? Boolean(props.value.length)
      : Boolean(props.value));

  const getOptionLabel = props.getOptionLabel || ((option) => option);

  if (props.value) {
    if (props.multiple && Array.isArray(props.value) && props.value.length) {
      const remaining = props.value.slice(1).length;
      displayText = getOptionLabel(props.value[0]);
      if (remaining) {
        displayRemaining = ` +${remaining}`;
      }
    } else {
      displayText = getOptionLabel(props.value);
    }
  }

  if (Array.isArray(props.value)) {
    if (props.value.length) {
      shouldLabelShrink = true;
    }
  } else if (props.value) {
    shouldLabelShrink = true;
  }

  let displayTextClassNames = 'HdSelectInput-display';

  if (props.size === 'small') {
    displayTextClassNames += ' HdSelectInputDisplay-marginDense';
  }

  if (alwaysShowDisplayText) {
    displayTextClassNames += ' HdSelectInputDisplay-displayAlways';
  }

  return (
    <div
      className={`HdSelectInput-root ${className}`}
      style={{ width: props.style?.width }}
    >
      <HdAutocomplete
        {...props}
        className={props.autoCompleteClassName}
        renderTags={() => <></>}
        renderInput={(params:any) => (
          <>
            <div className={displayTextClassNames}>
              <div className="HdSelectInput-display-left">{displayText}</div>
              {displayRemaining}
            </div>

            <HdTextField
              {...params}
              className="HdSelectInput-inputRoot"
              variant={variant}
              label={inputLabel}
              placeholder={placeholder}
              InputProps={{
                ...params.InputProps,
                startAdornment: undefined,
              }}
              onKeyDown={(event:any) => {
                if (event.key !== 'Tab' && event.key !== 'Enter') {
                  event.preventDefault();
                }
              }}
              InputLabelProps={{
                ...params.InputLabelProps,
                shrink: shouldLabelShrink,
              }}
            />
          </>
        )}
      />
    </div>
  );
};

export default HdSelectInput;
