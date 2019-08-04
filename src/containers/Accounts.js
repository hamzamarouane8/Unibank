import React from "react";
import styled from "react-emotion";
import {Col, Row} from 'reactstrap'
import Button from '../component/button'
import utils from '../app/utils'

export default class extends React.Component{
  constructor(props) {
    super(props);
  }
  handleHistoryChange = (idAccount) => {
    this.props.handleHistory(idAccount);
  }

render(){ const {history, data} = this.props;
  return (
  <AccountsDesign>
  { data.map( (account, index) => (
    <div className="ui-account" key={index}>
      <Row>
        <Col md={2}>
          <div className="label">Type de compte</div>
          <div className="value">{account.cashAccountType}</div>
        </Col>
        <Col md={3}>
          <div className="label">Numéro de compte</div>
          <div className="value">{account.accountId}</div>
        </Col>
        <Col md={2}>
          <div className="label">Solde du compte</div>
          <div className={account.details === 'DB'? 'ui-flag-red':'value'}>
            { utils.formatNumber(account.availableBalance)} <span className="currency">DHS</span>
          </div>
        </Col>
        <Col md={2}>
          <div className="label">Opérations à venir</div>
          <div className={account.usage === 'DB'? 'ui-flag-red':'value'}>{ utils.formatNumber(account.ibanAccountKey)} <span className="currency">DHS</span></div>
        </Col>
        <Col md={3} className="text-right">
          <Button  className="action" onClick={()=>{this.handleHistoryChange(account.accountId)}} label='Historique'/>
          <Button  className="action" label='Virement' />
        </Col>
      </Row>
    </div>
  ) ) }
</AccountsDesign>)
  }


}

const AccountsDesign = styled('div')`
  .ui-account {
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
      
      
      .currency {
        font-size: 0.9em; 
        color: #999;
      }
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
        background: #922c88;
        color: #FFF;
      }
    }
    
    .flag-red {
      background: #ea041e;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      margin: 7px 5px 0 0;
      float: left;
    }
  }
   .ui-flag-red {
      color: firebrick;
      margin-top: 5px;
      font-weight: 600;
      font-size: 0.9em;
  }
  margin-bottom: 80px;
  
  @media (min-width: 1024px) {
      .ui-account {
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
      
      
      .currency {
        font-size: 0.7em; 
        color: #999;
      }
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
        background: #922c88;
        color: #FFF;
      }
    }
    
    .flag-red {
      background: #ea041e;
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 8px;
      margin: 7px 5px 0 0;
      float: left;
    }
  }
   .ui-flag-red {
      color: #922c88;
      margin-top: 5px;
      font-weight: 600;
      font-size: 1.4em;
  }
  margin-bottom: 80px;
  
  }
`

