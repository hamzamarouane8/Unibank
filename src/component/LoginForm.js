import React, {Fragment} from 'react';
import Form from '../component/form';
import styled from 'styled-components';

//---------------------------------------------


export default ({onSubmit, initialValues}) => (
  <FormStyle>
    <Form
      fields={{
        username: {type: 'text', required: true, label: 'ID no.',empty_message:'Please enter your login'},
        password: {type: 'password', required: true, label: 'Password',empty_message:'Please enter your password'}
      }}
      buttons={{
        confirm: {type: 'confirmation', label: 'Se connecter'}
      }}
      initialValues={initialValues}
      submitText="Log in"
      subscibeText="demande de souscription"
      buttons={{
        submit: {label: 'Log in'},
      }}
      onSubmit={onSubmit}
    />

  </FormStyle>


)

const FormStyle = styled.div`
.ui.button {
    border-radius: 40px !important;
    background-color: #392c70 !important;
    padding: 10px 20px !important;
    color: #fff !important;
    float: right !important;
    text-transform: uppercase !important;
}

.ui.form .field.field input {
    border: none !important;
    border-bottom: 2px solid #f1f1f1 !important;
    background-color: transparent !important;
}

.error-field {
    color: red !important;
}
`
