import React from 'react';
import Form from '../../component/form/index';
import moment from 'moment'
import styled from 'react-emotion'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'

const mapOptions = (data) => {
  return (data || []).map((item) => ({key: item.accountId, value: item.accountId, text: item.labelOptions}))
}

class VirementForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts1: [],
      accounts2: [],
      errors: null
    }
  }

  componentDidMount() {
    this.setState({
      accounts2: mapOptions(this.props.data),
      accounts1: mapOptions(this.props.data),
      errors: isEmpty(this.props.globalError) ? null : this.props.globalError
    })
    this.setState({errors: this.props.globalError})
  }


  render() {
    return (
      <Design>
        <Form
          fields={{
            accountTransmitter: {
              type: 'select',
              required: true,
              label: 'Compte Emetteur',
              options: this.state.accounts1,
              onChange: (value) => {
                this.setState({
                  accounts2: mapOptions(this.props.data.filter((elt) => elt.accountId !== value))
                })
              }
            },
            accountReceiver: {
              type: 'select',
              required: true,
              label: 'Compte Recepteur',
              options: this.state.accounts2
            },
            amount: {
              type: 'text',
              label: 'Montant',
              required: true,
              number: true
            },
            date_vir: {type: 'date', required: true, label: 'Date'},
            pattern: {type: 'text', required: true, label: 'Motif'},
          }}
          validate = { (values) => {
            if (!values.accountTransmitter) return null
            const account = find(this.props.data, {accountId: values.accountTransmitter})
            let max = {}
           // if (account.availableBalance < account.plafond) {
            if (account.availableBalance < 1000) {
              max = { value : account.availableBalance, error: 'Vous avez dépassé votre balance.' }
            }else {
              max = { value : 1000, error: 'Vous avez dépassé votre plafond de compte.' }
            }
            return { amount: { type: 'number', max } }
          }}
          initialValues={{date_vir: moment().format('YYYY-MM-DD')}}
          submitText="Valider"
          buttons={{
            submit: {label: 'Valider'},
          }}
          onSubmit={this.props.onSubmit}
        />
      </Design>
    );
  }
}

export default VirementForm;
const Design = styled('div')`
  .field .dropdown{
    background: #FFF;
    border-radius: 20px;
  }
.field .ui input{
    background: none ;
    border:0;
    border-bottom: 1px solid #e1dfe4;

  }
  
`
