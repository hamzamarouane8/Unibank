import React from 'react'
import {Segment} from 'semantic-ui-react'
import get from "lodash/get";


export default ({title, titleInfoWin, headers, content, ...props}) => {
  return (
    <div>
      {headers.map((header, index) => {
        const value = get(content, header.name)
        if(!value ==''){
        return (
          <Segment vertical>{header.title} {value}</Segment>
        )}
      })}

    </div>

  )
}
