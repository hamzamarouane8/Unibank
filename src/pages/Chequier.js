import React from 'react';
import {connect} from 'react-redux'
import ReactNotification from "react-notifications-component";

//import {NotificationContainer, NotificationManager} from 'react-notifications';
import ListChequebook from '../containers/chequebook/ListChequebook'
import ChequebookForm from '../containers/chequebook/ChequebookForm'
import {loadAccountsAction, addChequebookAction, loadChequebookAction, deleteBeneficiairyAction, cancelChequebookAction} from "../app/store/actions";
import styled from "react-emotion";
import PageLayout from '../layouts/Page'
import Button from "../component/button";

class Beneficiaires extends React.Component {

  state = {
    accounts: [],
    finish: false,
    form: null,
    globalError: null,
    listCheckbook:[],
    activeList:true,
  }
  constructor(props){
    super(props);
    this.notificationDOMRef = React.createRef();

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
    this.props.dispatch(loadChequebookAction()).then((data) => {
      this.setState({listCheckbook: data.payload.checkBookOrders})
    })
  }
  handleCancelOrderCheckbook = (idChechbook) => {
    this.props.dispatch(cancelChequebookAction(idChechbook)).then(()=>{
      var checkbook= this.state.listCheckbook.find((elt) => elt.ckeckBookOrderId === idChechbook)
      this.notificationDOMRef.current.addNotification({
        title: "Annulation chequier",
        message: `votre demande de commande de chéquier ${checkbook.type} de ${checkbook.capacity}est annulée`,
        type: "success",
        insert: "centre",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 4000 },
        dismissable: { click: true }
      });
      this.componentDidMount();
    })
  }
  render() {

    return (
      <Design>
        <PageLayout title="Chéquier" description="Vous consultez la page Chéquier">
          <div className="add-img">
            {this.state.activeList && <Button type="submit"  nameIcon="plus" onClick={()=>{this.setState({activeList: false})}}/>}
          </div>
          <div className="clearfix"/>

          <div className="content list-checkbook">
            {this.state.activeList &&<ListChequebook handleCancelOrderCheckbook={this.handleCancelOrderCheckbook} data={this.state.listCheckbook} accounts={this.state.accounts}/>}
          </div>
          <div className="content new-checkbook">
            {!this.state.activeList && this.state.accounts.length>0 &&
            <ChequebookForm
              data={this.state.accounts}
              onSubmit={(form) => this.props.dispatch(addChequebookAction(form)).then(() => {
                 // NotificationManager.success(, 'Success');
                this.notificationDOMRef.current.addNotification({
                  title: "Ajout chequier",
                  message: `votre demande de commande de chéquier ${form.type.type} de ${form.typepages.type} est prise en charge.il sera disponible au niveau de votre agence dans un délai de 5 jours ouvrés.`,
                  type: "success",
                  insert: "top",
                  container: "top-right",
                  animationIn: ["animated", "fadeIn"],
                  animationOut: ["animated", "fadeOut"],
                  dismiss: { duration: 4000 },
                  dismissable: { click: true }
                });
                  this.props.dispatch(loadChequebookAction()).then((data) => {
                  this.setState({listCheckbook: data.payload.checkBookOrders,activeList: true})
                })
                  })
              }
              retour={()=>{
                return this.setState({activeList: true})}
              }
            />
            }
          </div>
        </PageLayout>
        <ReactNotification ref={this.notificationDOMRef} />

      </Design>

    );
  }

}
const mapState2Props = (state) => ({session: state.session})

export default connect(mapState2Props)(Beneficiaires);
const Design = styled('div')`
  .ui.form .field{
      color: firebrick;
      margin-top:10px;
      .ui[class*="left floated"].buttons{
            margin-bottom:20px!important;
      }
  }
.add-img{
 display: inline-block;
float:right;
padding-left:10px;
padding-right:10px;
margin-bottom:10px;
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


