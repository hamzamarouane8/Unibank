import React from 'react'
import {Form, Formik} from "formik";
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'
import * as Yup from 'yup';
import Field from "./Field";
import Button from "../button";


const createYupSchema = (fields) => {
  const shape = {}
  forEach(fields, (field, name) => {
    shape[name] = Yup.string()
    if (field.number) {
     shape[name] = shape[name].matches(/^[0-9]*\.?[0-9]+$/,'veuillez saisir uniquement des chiffres.')
    }
    if (field.required) {
      shape[name] =  shape[name].required(field.empty_message || 'Cette information est obligatoire.' )
    }
    if (field.max) {
        shape[name] = Yup.number().max(field.max.value, field.max.error)
    }
    if (field.maxString) {
      shape[name] =  shape[name].max(field.errorCondition, field.errorMessage)
    }

  })
  return Yup.object().shape(shape)
}


export default class extends React.Component {

  state = {
    globalError: null,
  }

  constructor(props) {
    super(props);
    const yup = createYupSchema(props.fields)
    this.validationSchema = {
      validate: (values, options) => {
        console.log('values',values)
        let validation = {}
        if (props.validate) {
          validation = props.validate(values) || {}
          if (!isEmpty(validation)) {
            const yup2 = createYupSchema(validation)
            return yup2.validate(values).then( (res) => {
              return yup.validate(values, options)
            } )
          }
        }
        return yup.validate(values, options) ;
      }
    };
  }


  render() {
    const {initialValues, onSubmit, fields, submitText,onChange} = this.props;
    const {globalError} = this.state;
    return (
      <FormStyle>
        <Formik
        initialValues={initialValues}
        validationSchema={this.validationSchema}
        onSubmit={(values, {setSubmitting}) => {
          this.setState({globalError: null})
          onSubmit(values).then(() => {
            setSubmitting(false);
          }).catch((err) => {
            this.setState({globalError: err.message})
            setSubmitting(false);
          })
        }}>
        {props => {
          return(
          <Form>
            <div className="ui form">
              <div className="form-fields">
                {map(fields, (field, name) => {
                  field.value = props.values[name];
                  map(props.values, (value, index) => {
                  if (!fields.hasOwnProperty(index)) {
                    delete props.values[index]
                  }
                  })
                  return (
                    <Field key={name}
                           type={field.type}
                           name={name}
                           onChange={(evt) => {
                             props.handleChange(evt)
                             if (field.onChange) {
                              field.onChange(evt.target.value)
                             }
                           }}
                           placeholder={field.label}
                           setFieldValue={(name, value) => {
                             props.setFieldValue(name, value);
                             if (field.onChange) {
                               field.onChange(value)
                             }
                           }}
                           initValue={field.initvalue}
                           onBlur={props.handleBlur}
                           value={props.values[name]}
                           error={props.touched[name] ? props.errors[name] : null}
                           {...field}
                    />
                  )
                })}
              </div>
              <div className="form-actions mt-3">
                {map(this.props.buttons,(button,name)=>{
                  var loading = false;
                  var disabled =false;
                  if(name==='submit'){
                    loading=props.isSubmitting ;
                    disabled=!props.isValid || props.isSubmitting;
                  }
                  return(
                    <Button key={name} type="submit" loading={loading} disabled={disabled} label={button.label} onClick={button.onClick} />
                  )
                })}

                {// <Button  type="submit" loading={props.isSubmitting} disabled={!props.isValid || props.isSubmitting} label={submitText} />
                }
                  </div>
              {globalError && <div className="form-error">{globalError}</div>}
            </div>
          </Form>
        )}}
      </Formik></FormStyle>

    )
  }
}
const FormStyle = styled.div`
  .form-error {
     color: firebrick;
    font-weight: bold;
  }
`

