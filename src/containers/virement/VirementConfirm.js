import React from 'react';
import Button from "../../component/button/index";
import VirementInfo from './VirementInfo'
import {Col, Row} from 'reactstrap'
import styled from "react-emotion";
import form from '../../component/form';
import find from 'lodash/find'

class VirementConfirm extends React.Component {
  state = {
    globalError: null,

  }
  constructor(props) {
    super(props);
  }

  render() {
    const {transfer ,retour,data,dataTrans,error} = this.props;
    const globalError = error;
    return (
      <Design >
  <Row>
          <Col className="mt-3 text-muted">
          <VirementInfo
            fields={{
              accountTransmitter: {name: 'Compte Emetteur', label: 'accountId'},
              nameTransmitter: {name: 'NOM', label: 'name'},
              adressTransmitter: {name: 'ADRESSE',  label: 'stoppageStatus'}
            }}
            data={find(this.props.data, {accountId: dataTrans.accountTransmitter})}
            title="EMETTEUR"
          />
            <VirementInfo
              fields={{
                accountReceiver: {name: 'Compte Emetteur', label: 'accountId'},
                nameReceiver: {name: 'NOM', label: 'name'},
                adressReceiver: {name: 'ADRESSE',  label: 'stoppageStatus'}
              }}
              data={find(this.props.data, {accountId: dataTrans.accountReceiver})}
              title="RECEPTEUR"
            />
          </Col>
          <Col>
            <VirementInfo
              fields={{
                amount: {name: 'MONTANT', label: 'amount'},
                date: {name: 'DATE', label: 'date_vir'}
              }}
              data={dataTrans}
              title="TRANSFER DETAILS"
            />
          </Col>
        </Row>
        <Row className="float-right">
          <div className="form-actions col-xs-6">
            <Button type="submit" label ="Confirmer" onClick={transfer}/>
          </div>
          <div className="form-actions col-xs-6">
            <Button type="button"  label="annuler" onClick={retour}/>

          </div>

        </Row>
        <Row >
          {globalError && <div className="error-form-vir col-xs-2">{globalError}</div>}
        </Row>

      </Design>
    );
  }
}

export default VirementConfirm;

const Design = styled('div')`

  .form-actions{
  }
.error-form-vir{
 margin-left 50px;
        color: firebrick;
    font-weight: bold;
}

`

