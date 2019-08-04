import React from 'react';
import {connect} from 'react-redux'
import styled from 'react-emotion'
import {Col, Row} from 'reactstrap'

const assets = {
  success_vir:require('../../assets/img/artboard_1.png')
}

class Virement extends React.Component {

  render() {
    return (
      <Design>
        <container >
          <Row >
          <Col className="ui-success">
            {<img src={assets.success_vir} alt=""  width={250} className="ui-success_img"/>
               }
          </Col>
          <Col className="ui-success">
            <div >
            <div className="ui-success-msg">Merci</div>
            <div className="ui-success-msg-details"> le transfert a été effectué avec succès.</div>
            </div>
          </Col >
          </Row>
        </container>
      </Design>

    );
  }
}

export default connect()(Virement);

const Design = styled('div')`
.ui-success-msg { 
    font-weight: 600;
    font-size:2.6em;
    margin-bottom:20px;
    color:#9592a3;
}
.ui-success_img{
float:right;
margin-right:50px;
}
.ui-success{
margin-top: auto;
margin-bottom: auto;
}
.ui-success-msg-details{
color:#c8c6cf;
font-weight: 600;
    font-size: 1.5em;
}
`
