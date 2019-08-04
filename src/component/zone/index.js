import styled from "styled-components";
import React from "react";
import {Col, Row} from 'reactstrap'

export default ({label,data}) => {
  return(
    <InputStyle>
      <Row>
        <Col sm="3"><span className="ui-zone-label">{label}:</span></Col>
        <Col sm="9"><span className="ui-zone-data">{data}</span></Col>
      </Row>
    </InputStyle>


  )}

const InputStyle = styled('div')`
      .ui-zone-label{
      font-weight: 800;
    font-size: 1.2dem;
      }
`

