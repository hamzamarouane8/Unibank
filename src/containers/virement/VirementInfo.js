import React from 'react'
import map from "lodash/map";
import Zone from '../../component/zone/index'
import styled from "react-emotion";

export default ({title, fields,data}) => (
  <Design>
  <div className="ui-info-zone">
    <span className="ui-info-zone title">{title}</span>
    {map(fields, (field, label) => {
      return <Zone key={label} label={field.name} data={data[field.label]} />
    })}
  </div>
  </Design>
)
const Design = styled('div')`
  .ui-info-zone{
      margin-bottom:100px;
      .row{
            margin:10px;
      }
      .title{
      font-weight: 600;
    font-size: 1.1em;
    color : #b5b2bf;
      }
      .ui-zone-label{
        font-size: 0.9em;
    color : #53515b;
      }
      .ui-zone-data{
          color : #d1cfd7;
      }
  }
`
