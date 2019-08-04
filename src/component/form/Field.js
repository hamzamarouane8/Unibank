import React from 'react'
import {Dropdown, Form, Input,Checkbox} from 'semantic-ui-react'
import isEmpty from 'lodash/isEmpty'
import {ErrorMessage} from "formik";
import DateTime from '../timePicker'
import FloatedGroup from '../FloatedGroup'

import moment from 'moment'

export default ({type, label, error, value, setFieldValue, specificEvent, ...props} ) => {
  let field = null;
  if (type === 'select') {
    field = <Dropdown  placeholder={label} scrolling fluid selection options={props.options} defaultValue={props.initvalue} onChange={(event, value) => {setFieldValue(props.name, value.value)}}/>
  } else if (type === 'date') {
    field = <DateTime name={label} value={value || moment()} onChange={(e, date) => {setFieldValue(props.name, date.value)}}/>
  } else if (type === 'toggle') {
    field =  <Checkbox toggle onChange={(event, value) => {setFieldValue(props.name, value.checked)}} defaultChecked ={props.initvalue} />
  } else if (type === 'floatedGroup') {
    field =  <FloatedGroup data={props.elements}  setFieldValue={setFieldValue} name={props.name}/>
  } else {
    field = <Input type={type} value={value || ''} onChange={props.onChange} onBlur={props.onBlur} name={props.name} className={props.className}/>
  }
  const hasError = !isEmpty(error)
  return (
    <Form.Field error={hasError}>
      {label && <label>{label}</label>}
      {field}
      <ErrorMessage className='error-field' name={props.name} component="div"/>
    </Form.Field>
  )

}
