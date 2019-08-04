import React from 'react'
import get from 'lodash/get'
import {Table} from 'semantic-ui-react'

export default ({headers, data, condition}) => (
  <Table celled striped>
    <Table.Header>
      <Table.Row>
        {headers.map((header, index) => (
          <Table.HeaderCell key={index}>{header.title}</Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {data.map((record, index) => (
        <Table.Row key={record.id || index}>
          {headers.map((header, index) => {
            const value = get(record, header.name)
            return (
              <Table.Cell key={index} className={condition}>
                {header.render ? header.render(value, record) : value}
              </Table.Cell>
            )
          })}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
