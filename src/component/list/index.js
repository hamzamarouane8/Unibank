import React from 'react'
import {List} from 'semantic-ui-react'
import map from "lodash/map";

export default ({fields, data}) => (
  <List>
    {map(fields, (field, label) => {
      return (
        <List.Item key={label}>
          <List.Header  >{field.name}</List.Header>
          {data[label]}
        </List.Item>
      )
    })}
  </List>
)
