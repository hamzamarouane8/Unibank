import React from 'react'
import {Button} from 'semantic-ui-react'


export default class extends React.Component {
  state={
    activeIndex:0,
    data:this.props.data
  }
  constructor(props){
    super(props);
  }
  handleActive(index) {
    this.setState({ activeIndex: index });
  }
  render(){

    return (<Button.Group floated='left'>
      {this.state.data != null && this.state.data.map((item,index)=>{
          return <Button key ={index} type ="button" onClick={() => {
            this.handleActive(index);
            this.props.setFieldValue(this.props.name, item.value)
          }} active={index===this.state.activeIndex?true:false}>{item.label}</Button>
        }
      )}

    </Button.Group>)
  }
}
