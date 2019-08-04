import React from 'react';
import get from 'lodash/get'
import Table from "./table";
import styled from 'styled-components'

export default ({data}) => (
  <AccoutsStyle>
    <Table headers={[
      {name: 'cashAccountType', title: 'Type de compte'},
      {name: 'accountId', title: 'Numéro du compte'},
      {name: 'availableBalance' , title: 'Solde temps réel', render: (value, record) => {
          if (get(record, 'details') === 'DB') {
            return <span className="ui-flag-red">{value}</span>
          }else {
            return value
          }
        }},
      {name: 'ibanAccountKey', title: 'Operations à venir',render: (value, record) => {
          if (get(record, 'usage') === 'DB') {
            console.log('im here');
            return <span className="ui-flag-red">{value}</span>
          }else {
            return value
          }
        }}
      //{name: 'availableBalance', title: 'Solde temps réel'}
    ]} data={data}/>
  </AccoutsStyle>

)

const AccoutsStyle = styled.div`
  .ui-flag-red {
     color: firebrick;
    font-weight: bold;
  }
  
`
