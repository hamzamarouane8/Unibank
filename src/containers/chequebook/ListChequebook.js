import React from "react";
import styled from "react-emotion";
import {Col, Row} from 'reactstrap'
import Button from './../../component/button'
import {connect} from "react-redux";

class ListChequebook extends React.Component{
  constructor(props) {
    super(props);
  }

  handleCancelEvent = (idAccount) => {
    this.props.handleCancelOrderCheckbook(idAccount);
  }
  render(){
    const { data,accounts} = this.props;
    return (
      <BeneficiairesDesign>
        { data !=null && data.map( (checkbook, index) => {
          let account = accounts.find((elt) => elt.accountId === checkbook.accountId);
          var disableButton = checkbook.status==='en cours'?false:true;
          return(
            <div className="ui-checkbook" key={index}>
              <Row>
                <Col md={2}>
                  <div className="label">Date demande</div>
                  <div className="value">{checkbook.orderDate}</div>
                </Col>
                <Col md={3}>
                  <div className="label">Nom et Prenom</div>
                  <div className="value">{account!=null &&  account.name !=null ?account.name:''}</div>
                </Col>
                <Col md={3}>
                  <div className="label">Numero de compte</div>
                  <div className="value">{account!=null &&  account.iban !=null ?account.iban:''}</div>
                </Col>
                <Col md={2}>
                  <div className="label">Status</div>
                  <div className="value">{checkbook.status}</div>
                </Col>
                <Col md={2} className="text-right">
                  <Button  className="action" disabled={disableButton}  onClick={()=>{this.handleCancelEvent(checkbook.ckeckBookOrderId)}} label='Annuler'/>
                </Col>
              </Row>
            </div>
          )} ) }
      </BeneficiairesDesign>)
  }


}

export default connect()(ListChequebook);

const BeneficiairesDesign = styled('div')`
  .ui-checkbook {
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
      .ui-checkbook {
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
