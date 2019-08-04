import React from 'react';
import {connect} from 'react-redux'
import styled from "react-emotion";

import VirementForm from '../containers/virement/VirementForm'
import {loadAccountsAction, virementAction, virementConfirmAction} from "../app/store/actions";
import VirementConfirm from '../containers/virement/VirementConfirm'
import {Divider} from 'semantic-ui-react'
import PageLayout from '../layouts/Page'
import VirementSuccess from '../containers/virement/VirementSuccess'
import IcCheck from '../component/images/Check'
import isString from "lodash/isString";
import find from 'lodash/find'


class Virement extends React.Component {

  state = {
    accounts: [],
    formation: true,
    confirmation: false,
    finish: false,
    form: null,
    globalError: null,

  }

  componentDidMount() {
    this.props.dispatch(loadAccountsAction()).then((data) => {
      let listAccounts = data.payload.accounts.map((item) => {
        return{
              ...item,
              labelOptions: (item.cashAccountType + '--' + item.accountId + '--' + item.availableBalance + ' ' + item.currency)
              }
      });
      this.setState({accounts: listAccounts})
    })
  }

  render() {
    let progressItems = [
      {text: 'Information', status: this.state.formation},
      {text: 'Confirmation', status: this.state.confirmation},
      {text: 'Finish', status: this.state.finish}]
    return (
      <Design>
        <PageLayout title="Virement" description="Vous consultez la page de virement">
          <Divider className="divider1"/>
          <div className="ui-progress-bar">
            {progressItems.map((item, index) => (
              <div key={index} className={item.status ? 'ui-virement-progress active' : 'ui-virement-progress '}>
                <div className="img">
                  {isString(IcCheck) ? <img alt="" src={IcCheck}/> : <IcCheck/>}
                </div>
                <span>{item.text}</span><span
                className="ui-progress-content">.......... </span>
              </div>
            ))}
          </div>
          
          <Divider className="divider"/>
          {this.state.accounts.length>0 && this.state.formation && !this.state.confirmation && !this.state.finish &&
          <VirementForm
            data={this.state.accounts}
            onSubmit={(form) => this.props.dispatch(virementConfirmAction(form)).then(() => {
                  return this.setState({confirmation: true, form: form})
              }
            )
            }
          />
          }

          {this.state.form != null && this.state.formation && this.state.confirmation && !this.state.finish &&
          <VirementConfirm
            fields={{
              accountTransmitter: {name: 'Compte Emetteur', label: 'accountTransmitter'},
              accountReceiver: {name: 'Compte Recepteur', label: 'accountReceiver'},
              amount: {name: 'Montant...', label: 'amount'},
              date_vir: {name: 'Date...', label: 'date_vir'},
              pattern: {name: 'Motif...', label: 'pattern'}
            }}
            data={this.state.accounts}
            dataTrans={this.state.form}
            transfer={() => {
              const account = find(this.state.accounts, {accountId: this.state.form.accountReceiver})
              this.state.form.accountReceiver = account.iban 
              return this.props.dispatch(virementAction(this.state.form)).then(() => this.setState({finish: true})).catch((err) => {
                this.setState({globalError: err.message})
              })
            }}
            retour={() => {
              return this.setState({confirmation: false, form: null, globalError: null})
            }}
            error={this.state.globalError}
          />
          }

          {
            this.state.formation && this.state.confirmation && this.state.finish && <VirementSuccess/>
          }
        </PageLayout>
      </Design>

    );
  }
}

const mapState2Props = (state) => ({session: state.session})

export default connect(mapState2Props)(Virement);

const Design = styled('div')`
.ui.form .field{
      color: firebrick;
  }
  .ui-progress-bar{
      text-align: center;
      margin-bottom:35px;
      margin-top:35px;
  }
  .divider{
      margin-bottom:50px;
  }
  .ui-virement-progress {
      .img {
          svg {
              fill: #D4D2D9;
          }
          width: 40px;
          height: 40px;
          padding :7px;
          border-radius: 30px;
          border: 2px solid #D4D2D9;
          display: inline-block;
          margin-right:18px;
      }
      display: inline-block;
      margin-right:30px;
      color:#D4D2D9;
      font-size:20px;
  }
  .ui-virement-progress.active {
    transition: all 0.8s;
    .img{
      background: #5DB100;
      border-radius: 30px;
      border: 2px solid #5DB100;
      transition: all 0.8s;
      svg {
        transition: all 0.8s;
          fill: #fff;
      }
      
    }
      color:#5DB100;
  }
  .ui-check{
      float: left;
      margin-right:30px
  }
  .ui-progress-content{
    font-size:35px;
      margin-left:20px;
      letter-spacing: 6px;
  }
  .ui.icon.button, .ui.icon.buttons .button {
     
      margin-top: 15px;
      float: right;
      color: #FFF;
      background: #333;
      font-weight: 600;
      border-radius: 30px;
      padding: 12px 15px ;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.75em;
  }  
`
/*
button
 margin-top: 15px;
      float: right;
      color: #FFF;
      background: #333;
      font-weight: 600;
      border-radius: 30px;
      padding: 12px 15px ;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 0.75em;
 */
