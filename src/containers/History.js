import React from "react";
import styled from "react-emotion";
import {Col, Row} from 'reactstrap'


export default ({data,history}) => (
  <AccountsDesign>
    {
      data.map( (account, index) => (
      <div className="ui-account" key={index}>
        <Row>
          <Col md={10}>
            {//<div className="img"><OutArrow/></div>
            }
            <div className="label">{account.name}</div>
            <div className="ui-date">{account.date}</div>
            <div className="ui-date">{account.dateVal}</div>
          </Col>
          <Col md={2}>
            <div className="ui-balance">{account.amount} <span className="ui-balance_currency">{account.currency}</span></div>
          </Col>

        </Row>
      </div>
    ) ) }
  </AccountsDesign>
)

const AccountsDesign = styled('div')`
  .ui.avatar.image{
      width:60px;
      height:60px;
  }
  
  .ui-account {
      background: #fff;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 6px;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.025);
      .ui-balance{
        .ui-balance_currency{
            font-size:0.8em
        }
        position: relative;
        top: 40%;
        color: #000;
        font-weight: 800;
        font-size:1.4em
      }
      .img{
        text-align: center;
        display: inline-block;
        margin-right :5px;
      svg {
          width:16px;
          height:16px;
          fill: #47a700;
      }
  }
  .label {
      display: inline-block;
      color: #9c9c9a;
      font-size: 1.2em;
      font-weight: 500;
      padding-top:3px;
  }
  .ui-date{
      margin-top: 15px;
      color: #a0a0a0;
      font-size: 0.8em;
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
      background: #fff;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 6px;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.025);
      .ui-balance{
        .ui-balance_currency{
            font-size:1.0em
        }
        position: relative;
        top: 40%;
        color: #000;
        font-weight: 800;
        font-size:1.7em;
      }
      .img{
        text-align: center;
        display: inline-block;
        margin-right :5px;
      svg {
          width:16px;
          height:16px;
          fill: #47a700;
      }
      
  }
  .label {
      display: inline-block;
      color: #9c9c9a;
      font-size: 1.4em;
      font-weight: 500;
      padding-top:3px;
            margin-bottom: 15px;

  }
  .ui-date{
      margin-top: 3px;
      color: #a0a0a0;
      font-size: 0.98em;
  }
  margin-bottom: 20px;  
  }
`
