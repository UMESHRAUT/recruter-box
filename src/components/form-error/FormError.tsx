import React from 'react';
import './FormError.scss';

interface FormErrorProps {
  // eslint-disable-next-line react/no-unused-prop-types
  className?: string;
  children: any;
}

function FormError(props: FormErrorProps) {
  return (
    <div className={`form-error ${props.className}`}>
      <span className="hevo-icon hevo-error-filled form-error-thumbnail" />

      <div className="content error-text">{props.children}</div>
    </div>
  );
}

FormError.defaultProps = {
  className: '',
};

export default FormError;
