import React from "react";
import styled from "react-emotion";
import {Col, Row} from 'reactstrap'
import Button from '../component/button'
import {connect} from "react-redux";
import { Checkbox } from 'semantic-ui-react'

class ListBeneficiaires extends React.Component{

    state ={
      checkedItems: new Map(),
    }

    constructor(props) {
      super(props);
    }

  handleBeneficiaryChange = (idAccount) => {
      this.props.handleBeneficiaryChange(idAccount);
    }



render(){ const {dataBeneficiaryPhysique,dataBeneficiaryMoral} = this.props;
  this.props.getListToDelete(this.state.checkedItems)
  return (
  <BeneficiairesDesign>
  { dataBeneficiaryPhysique !=null && dataBeneficiaryPhysique.map( (account, index) => {
    return(
    <div className="ui-beneficiary" key={index}>
      <Row>
        <Col md={0.2} className="text-right">
         <div className="checkbox"> <Checkbox name={account.beneficiaryRIB} checked={this.state.checkedItems.get(account.beneficiaryRIB)} onClick={(event, value) =>{
            this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(account.beneficiaryRIB, value.checked)}))
         }} /></div>
        </Col>
        <Col md={3}>
          <div className="label">Nom</div>
          <div className="value">{account.beneficiaryName}</div>
        </Col>
        <Col md={3}>
          <div className="label">Prenom</div>
          <div className="value">{account.beneficiaryFirstName}</div>
        </Col>
        <Col md={3}>
          <div className="label">Rib</div>
          <div className="value">{account.beneficiaryRIB !== null ? account.beneficiaryRIB:account.accountId}</div>
        </Col>
        <Col md={2} className="text-right">
          <Button  className="action" onClick={()=>{this.handleBeneficiaryChange(account.beneficiaryRIB)}} label='Supprimer'/>
        </Col>
      </Row>
    </div>
  )} ) }
    { dataBeneficiaryMoral !=null && dataBeneficiaryMoral.map( (account, index) => (
      <div className="ui-beneficiary" key={index}>
        <Row>
          <Col md={6}>
            <div className="label">Raison sociale</div>
            <div className="value">{account.beneficiaryName}</div>
          </Col>
          <Col md={3}>
            <div className="label">Rib</div>
            <div className="value">{account.beneficiaryRIB !== null ? account.beneficiaryRIB:account.accountId}</div>
          </Col>
          <Col md={3} className="text-right">
            <Button  className="action" onClick={()=>{this.handleHistoryChange(account.beneficiaryRIB)}} label='Supprimer'/>
          </Col>
        </Row>
      </div>
    ) ) }
</BeneficiairesDesign>)
  }


}

export default connect()(ListBeneficiaires);

const BeneficiairesDesign = styled('div')`
  .ui-beneficiary {
    background: #FFF;
    padding: 30px;
    margin-bottom: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.025);
    
    .checkbox{
    padding:8px;
    }
    
    .ui.checkbox input:checked ~ .box:after, .ui.checkbox input:checked ~ label:after{
    color:#922c88;
    }
    .label {
      color: #999;
      font-size: 0.9em;
      font-weight: 500;
    }
    
    .value {
      margin-top: 5px;
      color: #393842;
      font-weight: 600;
      font-size: 0.9em;
    }
    
    .action {
      margin-top: 15px;
      margin-right:10px;
      float: right;
      color: #888;
      background: #E6E7E8;
      font-weight: 600;
      border-radius: 3px;
      padding: 8px 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.75em;
      transition: all 0.2s linear;
      
      &:hover {
        background: #555;
        color: #FFF;
      }
    }
  }
  margin-bottom: 80px;
  
  @media (min-width: 1024px) {
      .ui-beneficiary {
    background: #FFF;
    padding: 30px;
    margin-bottom: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.025);
    
    .label {
      color: #999;
      font-size: 0.9em;
      font-weight: 500;
    }
    
    .value {
      margin-top: 5px;
      color: #393842;
      font-weight: 600;
      font-size: 1.5em;
    }
    
     .ui.icon.button {
     margin-right:30px;
      margin-top: 15px;
      float: right;
      color: #888;
      background: #fff;
      font-weight: 600;
      border-radius: 25px;
      padding: 8px 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.75em;
      padding: 17px;
      box-shadow: 0 4px 9px rgb(241, 241, 241);
      transition: all 0.2s linear;
      
      &:hover {
        background: #555;
        color: #FFF;
      }
    }
  }
 
  margin-bottom: 80px;
  
  }
`

