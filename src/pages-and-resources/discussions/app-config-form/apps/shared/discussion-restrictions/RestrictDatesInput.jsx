import React, { useState, useCallback } from 'react';
import { Form } from '@edx/paragon';
import { useFormikContext, getIn } from 'formik';
import PropTypes from 'prop-types';

import FieldFeedback from '../../../../../../generic/FieldFeedback';

const RestictDatesInput = ({
  value,
  type,
  label,
  fieldName,
  helpText,
  fieldClasses,
  feedbackClasses,
  formGroupClasses,
  fieldNameCommonBase,
}) => {
  const {
    handleChange, handleBlur, errors, touched,
  } = useFormikContext();

  const [inFocus, setInFocus] = useState(false);
  const fieldError = getIn(errors, `${fieldNameCommonBase}.${fieldName}`);
  const fieldTouched = getIn(touched, `${fieldNameCommonBase}.${fieldName}`);
  const isInvalidInput = Boolean(!inFocus && fieldError && fieldTouched);

  const handleFocusOut = useCallback((event) => {
    handleBlur(event);
    setInFocus(false);
  }, [handleBlur, setInFocus]);

  const handleSetFocus = useCallback(() => {
    setInFocus(true);
  }, [setInFocus]);

  return (
    <Form.Group
      controlId={`${fieldNameCommonBase}.${fieldName}`}
      className={`col ${formGroupClasses}`}
      isInvalid={isInvalidInput}
    >
      <Form.Control
        name={`${fieldNameCommonBase}.${fieldName}`}
        value={value}
        type={type}
        onChange={handleChange}
        floatingLabel={label}
        className={fieldClasses}
        onBlur={handleFocusOut}
        onFocus={handleSetFocus}
      />
      <FieldFeedback
        feedbackCondition={inFocus}
        errorCondition={isInvalidInput}
        errorMessage={fieldError || ''}
        feedbackMessage={helpText}
        transitionClasses="mt-1"
        feedbackClasses={feedbackClasses}
      />
    </Form.Group>
  );
};

RestictDatesInput.propTypes = {
  value: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  feedbackClasses: PropTypes.string,
  fieldClasses: PropTypes.string,
  formGroupClasses: PropTypes.string,
  fieldNameCommonBase: PropTypes.string.isRequired,
};

RestictDatesInput.defaultProps = {
  fieldClasses: '',
  helpText: '',
  feedbackClasses: '',
  formGroupClasses: '',
};

export default React.memo(RestictDatesInput);
