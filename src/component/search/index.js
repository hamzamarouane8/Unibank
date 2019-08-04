import React from 'react'
import {Grid, Search} from 'semantic-ui-react'
import styled from "styled-components";

export default () => {
  return (
    <SearchStyle>
      <Grid.Column width={6}>
        <Search/>
      </Grid.Column>
    </SearchStyle>
  )

}
const SearchStyle = styled.div`
  .ui.search{
  position: absolute ;
    top:0;
    left:50%;
    margin-top:20px
    }
`

