import React from 'react';
import Form from '../component/form';
import moment from 'moment'
import styled from 'react-emotion'
import isEmpty from 'lodash/isEmpty'
import find from 'lodash/find'

const mapOptions = (data) => {
  return (data || []).map((item) => ({key: item.id, value: item.label, text:item.label}))
}
var rib ={type: 'text', label: 'RIB', required: true,maxString:true,errorMessage:"votre Rib n'est pas valide",errorCondition:24};
var numAccount = {type: 'text', label: 'numéro de compte', required: true}
var fName= {type: 'text', label: 'Nom du bénéficiaire', required: true,maxString :true,errorMessage:"votre Prenom n'est pas valide",errorCondition:100}
var lName = {type: 'text', label: 'Prénom du bénéficiaire', required: true,maxString :true,errorMessage:"votre Nom n'est pas valide",errorCondition:100}
var raison = {type: 'text', label: 'Raison Sociale', required: true, maxString :true,errorMessage:"votre Raison Sociale n'est pas valide",errorCondition:100}


let fieldsClientPhysique={fname:fName,lname:lName,numAccount:numAccount}
let fieldsClientMorale={raison:raison,numAccount:numAccount}
let fieldsPhysique={fname:fName,lname:lName,rib:rib}
let fieldsMorale={raison:raison,rib:rib}

let listTypeBeneficiary=[{id:1,type:"morale",label:"Personne Morale"},{id:2,type:"physique",label:"Personne Physique"}]
class VirementForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beneficiaires: [],
      errors: null,
      typeBeneficiary:true, // physique
      toggle:false,
    }
  }

  componentDidMount() {
    this.setState({
      beneficiaires: this.props.data,

  })
}

render() {
  return (
    <Design>
      {this.state.typeBeneficiary && this.state.toggle &&
      <Form
        fields ={{
          typeBeneficiary: {
            type: 'select',
            initvalue:this.state.typeBeneficiary ? listTypeBeneficiary[1].label:listTypeBeneficiary[0].label,
            required: true,
            label: 'Type Bénéficiaire',
            options:mapOptions(listTypeBeneficiary),
            onChange: (value) => {this.setState({typeBeneficiary:value==='Personne Physique'?true:false})}
          },
          toggle: {
            type: 'toggle',
            initvalue:this.state.toggle,
            required: true,
            label: 'Client UB',
            onChange :(value) =>{this.setState({toggle: value})}
            },
          ...fieldsClientPhysique

        }}

        buttons={{
          submit: { label: 'Valider'},
          return: { label: 'Retour',onClick:()=>{this.props.retour()}}
        }}
        initialValues={{typeBeneficiary:this.state.typeBeneficiary?listTypeBeneficiary[1].label:listTypeBeneficiary[0].label,toggle:this.state.toggle}}
        submitText="Valider"
        onSubmit={this.props.onSubmit}
      />
      }
      {this.state.typeBeneficiary && !this.state.toggle && <Form
        //formPhysique
        fields ={{
          typeBeneficiary: {
            type: 'select',
            required: true,
            initvalue:this.state.typeBeneficiary ? listTypeBeneficiary[1].label:listTypeBeneficiary[0].label,
            label: 'Type Bénéficiaire',
            options:mapOptions(listTypeBeneficiary),
            onChange: (value) => {
              this.setState({typeBeneficiary:value==='Personne Physique'?true:false})}
          },
          toggle: {
            type: 'toggle',
            initvalue:this.state.toggle,
            required: true,
            label: 'Client UB',
            onChange :(value) =>{
              this.setState({toggle: value})}
          },
          ...fieldsPhysique
        }}
        buttons={{
          submit: { label: 'Valider'},
          return: { label: 'Retour',onClick:()=>{this.props.retour()}}
        }
        }
        initialValues={{typeBeneficiary:this.state.typeBeneficiary?listTypeBeneficiary[1].label:listTypeBeneficiary[0].label,toggle:this.state.toggle}}
        submitText="Valider"
        onSubmit={this.props.onSubmit}
      />}
      {!this.state.typeBeneficiary && this.state.toggle &&<Form
        fields ={{
          typeBeneficiary: {
            type: 'select',
            required: true,
            initvalue:this.state.typeBeneficiary ? listTypeBeneficiary[1].label:listTypeBeneficiary[0].label,
            label: 'Type Bénéficiaire',
            options:mapOptions(listTypeBeneficiary),
            onChange: (value) => {this.setState({typeBeneficiary:value==='Personne Physique'?true:false})
            }
          },
          toggle: {
            type: 'toggle',
            required: true,
            initvalue:this.state.toggle,
            label: 'Client UB',
            onChange :(value) =>{this.setState({toggle: value})}
          },
          ...fieldsClientMorale
        }}
        buttons={{
          submit: { label: 'Valider'},
          return: { label: 'Retour',onClick:()=>{this.props.retour()}}
        }}
        initialValues={{typeBeneficiary:this.state.typeBeneficiary?listTypeBeneficiary[1].label:listTypeBeneficiary[0].label,toggle:this.state.toggle}}
        submitText="Valider"
        onSubmit={this.props.onSubmit}
      />}
      {!this.state.typeBeneficiary && !this.state.toggle &&<Form
        //formMoral
        fields ={{
          typeBeneficiary: {
            type: 'select',
            required: true,
            initvalue:this.state.typeBeneficiary ? listTypeBeneficiary[1].label:listTypeBeneficiary[0].label,
            label: 'Type Bénéficiaire',
            options:mapOptions(listTypeBeneficiary),
            onChange: (value) => {this.setState({typeBeneficiary:value==='Personne Physique'?true:false})}
          },
          toggle: {
            type: 'toggle',
            required: true,
            initvalue:this.state.toggle,
            label: 'Client UB',
            onChange :(value) =>{this.setState({toggle: value})}
          },
          ...fieldsMorale
        }}
        buttons={{
          submit: { label: 'Valider'},
          return: { label: 'Retour',onClick:()=>{this.props.retour()}}
        }}
        initialValues={{typeBeneficiary:this.state.typeBeneficiary?listTypeBeneficiary[1].label:listTypeBeneficiary[0].label,toggle:this.state.toggle}}
        submitText="Valider"
        onSubmit={this.props.onSubmit}
      />}



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
