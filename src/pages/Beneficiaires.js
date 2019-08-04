import React from 'react';
import {connect} from 'react-redux'
import {
  loadBeneficiairesAction,
  addBeneficiairyAction,
  deleteBeneficiairyAction,
  loadHistoryById
} from "../app/store/actions";
import ListBeneficiaires from "../containers/ListBeneficiaires";
import BenefeciaireForm from "../containers/BeneficiaireForm";

import styled from "react-emotion";
import PageLayout from '../layouts/Page'
import Button from "../component/button";
import forEach from "lodash/forEach";

class Beneficiaires extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      beneficiaires: [] ,
      listBeneficiaryPhysique:[],
      listBeneficiaryMoral:[],
      historyAccounts:[],
      activeList: true,
      activeForm: false,
      listToDelete:[]
    }
  }

 /* handleHistory = (idAccount) => {
    this.props.dispatch(deleteBeneficiairyAction(idAccount)).then(()=>window.location.reload())
  }*/

  componentDidMount() {
    this.props.dispatch(loadBeneficiairesAction()).then((data) => {
      let listBeneficiaryMoral =[];
      let listBeneficiaryPhysique=[];
      let listBeneficiaries = data.payload.beneficiaries.length>0?data.payload.beneficiaries:[]
      listBeneficiaries.map((item,index)=>{
               if(item.business){
                 listBeneficiaryMoral.push(item)
               }else{
                 listBeneficiaryPhysique.push(item)
               }
      })
      this.setState({listBeneficiaryPhysique:listBeneficiaryPhysique,listBeneficiaryMoral:listBeneficiaryMoral })
    })
  }

  getListToDelete = (list) => {
    let listToDelete = [];
    list.forEach((value, key) => {
      if(value){
        listToDelete.push(key)
      }else{
        listToDelete.filter(el => el != key )
      }
    })
    this.setState({listToDelete});
  }

  handleEventDelete(){
   this.props.dispatch(deleteBeneficiairyAction(this.state.listToDelete)).then(()=>this.componentDidMount());
  }

  render() {
    return (
      <Design>
        <PageLayout title="Bénéficiaires" description="Vous consultez la liste de vos bénéficiaires">
          <div className="add-img">
            {this.state.activeList && <Button type="submit"  nameIcon="plus" onClick={()=>{this.setState({activeList: false,activeForm:true})}}/>}
            {this.state.activeList && <Button type="submit"  nameIcon="delete" disabled={this.state.listToDelete!= null && this.state.listToDelete.length>0?false:true} onClick={()=>{this.handleEventDelete()}}/>}
          </div>
          <div className="clearfix"/>
          <div className="content list-beneficiaires">
            {this.state.activeList && <ListBeneficiaires getListToDelete={this.getListToDelete}
                                                         handleHistory={this.handleHistory}
                                                         dataBeneficiaryMoral={this.state.listBeneficiaryMoral}
                                                         dataBeneficiaryPhysique={this.state.listBeneficiaryPhysique}  />}
          </div>
          <div className="content new-benefeciaire">
            {this.state.activeForm && <BenefeciaireForm data={this.state.beneficiaires}
                                                        retour={()=>{
                                                          return this.setState({activeList: true, activeForm: false})}
                                                        }
                                                        onSubmit={(data)=>this.props.dispatch(addBeneficiairyAction(data)).then(()=>{
                                                          window.location.reload();
                                                          this.setState({activeForm:false,activeList:true})})
                                                        }
            />}
          </div>
       </PageLayout>
      </Design>
    );
  }
}
const mapState2Props = (state) => ({session: state.session})

export default connect(mapState2Props)(Beneficiaires);
const Design = styled('div')`
.add-img{
.ui.icon.button, .ui.icon.buttons .button{
margin-left:5px;
    border-radius: 55px;
background:#922c88 !important;
color:#FFF;

}
}
  .content .ui.text.menu .active.item{
    font-weight: 700;
    font-size:1.2em;
    pointer-events: auto;
  }
  .content .ui.text.menu .item{
    pointer-events: none;
  }
  .ui.text.menu :first-child:nth-last-child(2),
  .ui.text.menu :first-child:nth-last-child(2) ~ li {
  pointer-events: auto;
}
.content .ui.text.menu :first-child:nth-last-child(1),
  .ui.text.menu :first-child:nth-last-child(1) ~ li {
    pointer-events: none;
}
.add-img{
 display: inline-block;
float:right;
padding-left:10px;
padding-right:10px;
margin-bottom:10px;
}
`
/*
 text menu
 */
