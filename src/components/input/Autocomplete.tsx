import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';

import HdCheckbox from './Checkbox';

const HdAutocomplete = (props: AutocompleteProps<any, any, any, any>) => {
  const allSelected =
    props.options &&
    props?.value && props?.options.length === props?.value.length;
  const getOptionLabel = props.getOptionLabel || ((option) => option);

  return (
    <StylesProvider injectFirst>
      <Autocomplete
        popupIcon={
          !props.disabled && (
            <div className="hevo-icon hevo-dropdown-arrow icon-size-2" />
          )
        }
        closeIcon={<div className="hevo-icon hevo-close icon-size-2" />}
        disableCloseOnSelect={Boolean(props.multiple)}
        openOnFocus={true}
        limitTags={1}
        {...props}
        renderOption={(option, state) => {
          const selectAllProps =
            option.value === 'select-all' // To control the state of 'select-all' checkbox
              ? { checked: allSelected }
              : {};
              return (
                <>
                  {props.multiple && (
                    <HdCheckbox
                      style={{ marginRight: 8 }}
                      checked={state.selected}
                      {...selectAllProps}
                    />
                  )}
                  {props.renderOption
                    ? props.renderOption(option, state)
                    : getOptionLabel(option)}
                </>
              );
          }
        }
      />
    </StylesProvider>
  );
};

export default HdAutocomplete;
