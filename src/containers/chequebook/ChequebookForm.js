import React from 'react';
import Form from '../../component/form/index';
import styled from 'react-emotion'
import isEmpty from 'lodash/isEmpty'


const mapOptions = (data) => {
  return (data || []).map((item) => ({key: item.accountId, value: item.accountId, text: item.labelOptions}))
}
let listRadio=[{id:0,value:"normal",label:"Normal",active:true},{id:1,value:"barre",label:"Barré",active:false}]
let listFormule=[{id:0,value:"formuletwinty",label:"20 pages",active:true},{id:1,value:"formuleForty",label:"40 pages",active:false}]

class ChequebookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      accountsChequebook: []
    }
  }

  componentDidMount() {
    this.setState({
      accounts: mapOptions(this.props.data),
      accountsChequebook: mapOptions(this.props.data.filter((elt) => elt.cashAccountType === 'Compte Cheque')),
      errors: isEmpty(this.props.globalError) ? null : this.props.globalError
    })
    this.setState({errors: this.props.globalError})
  }


  render() {
    return (
      <Design>
        <Form
          fields={{
            accountChequebook:  {type: 'select', required: true, label: 'Compte Emetteur', options: this.state.accountsChequebook},
            type: {type: 'floatedGroup',elements:listRadio,required: true,label: 'Mention'},
            typepages: {type: 'floatedGroup',elements:listFormule, required: true, label: 'Formule'},
          }}
          initialValues={{type:listRadio[0].value,typepages:listFormule[0].value}}
          submitText="Valider"
          buttons={{
            submit: { label: 'Commander'},
            return: { label: 'Retour',onClick:()=>{this.props.retour()}}
          }}
          onSubmit={this.props.onSubmit}
        />
      </Design>
    );
  }
}

export default ChequebookForm;
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
