import React from 'react'
import styled from 'react-emotion'

export default ({title, description, children}) => {
  return (
    <Design className="container-fluid">
      <div className="ui-header">
        <h1>{title}</h1>
        <div className="page-description">{description}</div>
      </div>
      <main>
        {children}
      </main>
    </Design>
  )
}


const Design = styled('div')`

  padding: 0 50px;

  .ui-header {
    tewt-align: left;
    
    h1 {
      color: #922c88;
      font-size: 1.5em;
      margin: 0 0 5px 0;
    }
    
    .page-description {
      color: #999;
      font-size: 0.9em;
    }
    
    margin-bottom: 30px;
  }
  .ui-child-header{
    margin-top:50px;
    margin-bottom:20px;
        .ui-child-title{
            display: inline-block;   
            color: #999;
            font-size: 0.9em;
            margin: 0 40px 5px 0;
       
           
        }
         
  }
  
`
