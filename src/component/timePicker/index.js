import React from 'react'
import moment from 'moment'
import {DateInput} from 'semantic-ui-calendar-react';

export default ({name, value, onChange}) => {
  return (
    <DateInput
      name={name}
      placeholder="Date"
      value={value}
      iconPosition="left"
      dateFormat= "YYYY-MM-DD"
      selected={value ? value : null}
      onChange={onChange} />
  )

}

