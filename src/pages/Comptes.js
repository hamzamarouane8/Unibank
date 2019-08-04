import React from 'react';
import {connect} from 'react-redux'
import {loadAccountsAction, loadHistoryById} from "../app/store/actions";
import PageLayout from '../layouts/Page'
import Accounts from "../containers/Accounts";
import History from "../containers/History";

import {Tab} from 'semantic-ui-react'
import styled from "react-emotion";

class Comptes extends React.Component {

  state = {
    accounts: [] ,
    historyAccounts:[],
    activeIndex: 0, 
    account:''
  }

  componentDidMount() {
    this.props.dispatch(loadAccountsAction()).then((data) => {
      if(data.payload.accounts.length>0) {
        this.props.dispatch(loadHistoryById(data.payload.accounts[0].accountId)).then((data) => {
          return this.setState({historyAccounts: data.payload.operations})
        })}
      this.setState({accounts: data.payload.accounts.length>0?data.payload.accounts:[]})
    })
  }
  
  handleHistory = (idAccount) => {
    this.props.dispatch(loadHistoryById(idAccount)).then((data)=>this.setState({activeIndex:1,historyAccounts:data.payload.operations,account:' / '+idAccount}))
  }

  handleTabChange = (e, { activeIndex }) => {
    if(activeIndex == 0){
        return this.setState({ activeIndex , account :'' })
    }else{
        return null;
    }
  }

  render() {
    let panes = [
      { menuItem: 'Liste des comptes' ,active:false, render: () => <Accounts handleHistory={this.handleHistory} data={this.state.accounts}  /> },
      { menuItem: 'Historique des comptes' ,active :false, render: () =><History data={this.state.historyAccounts} />},
    ]
    const { activeIndex } = { activeIndex: this.state.activeIndex}
    return (
      <Design>
      <PageLayout title={"Comptes"+this.state.account} description={"Vous consultez la liste de vos comptes"}>
      
        <Tab menu={{ text: true }} activeIndex={activeIndex} panes={panes} onTabChange={this.handleTabChange}/>
      </PageLayout>
      </Design>
    );
  }
}


export default connect()(Comptes);
const Design = styled('div')`
  .ui.text.menu .active.item{
  color:#922c88;
    font-weight: 600;
    font-size:1.0em;
    pointer-events: auto;
  }
  .ui.text.menu .item{
    pointer-events: none;
  }
  .ui.text.menu :first-child:nth-last-child(2),
  .ui.text.menu :first-child:nth-last-child(2) ~ li {
  pointer-events: auto;
}
.ui.text.menu :first-child:nth-last-child(1),
  .ui.text.menu :first-child:nth-last-child(1) ~ li {
    pointer-events: none;
}
`
/*
 text menu
 */
