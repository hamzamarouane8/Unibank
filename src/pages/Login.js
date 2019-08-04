import React from 'react';
import {connect} from 'react-redux'
import {Col, Row} from 'reactstrap'
import styled from 'styled-components'
import LoginForm from '../component/LoginForm';
import {loadListGeo, loginAction, loginOAuth2} from "../app/store/actions";
import queryString from 'query-string'
import * as storage from '../app/storage'

const initialState = {
  user: storage.get('session_user'),
  authenticated: false
}
const assets = {
  main: require('../assets/img/background-1.png'),
  logo: require('../assets/img/image.png'),
  map: require('../assets/img/map.png'),
}
const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapActive: false,
      data: null,
      markers: []
    }
    this.onClick = this.displayMap.bind(this);
  }

  componentDidMount() {
    let params = queryString.parse(this.props.location.search)
    if (Object.getOwnPropertyNames(params).length !== 0) {
      const user = {
        token: params.token
      }
      storage.set('session_user', user);
      this.props.dispatch(loginOAuth2()).then(() => this.props.history.push('/'))
    }

  }

  displayMap() {
    this.props.dispatch(loadListGeo()).then((data) => {
      this.setState({markers: data.payload.dabs, mapActive: true})
    })
  }

  render() {
    return (
      <LoginStyle>
        <Container-fluid>
          <Row>
            <Col>
              <div className="ui-form">
                <img style={{width: '40px'}} src={assets.logo} className="ui-logo mb-5"/> <span
                style={{fontSize: '18px'}}>UNIBANK</span>
                <div className='form-content'>
                  <LoginForm
                    onSubmit={(form) => this.props.dispatch(loginAction(form)).then(() => this.props.history.push('/'))}/>
                    <div>to login use these credentials login :"user001" password :"user001"F</div>
                </div>
                <div className="mt-3 text-muted signature">
                  <small>
                    &copy; 2018 Unibank , @Hamza Marouane
                  </small>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <div className='bloc-login__info' style={{backgroundImage: `url(${assets.main})`}}>
                <div className='bloc-login__content'>
                  <h1><span>Welcome to </span>UNIBANK</h1>
                  <p>Log-in to access your account</p>
                </div>
              </div>

            </Col>
          </Row>
        </Container-fluid>
      </LoginStyle>
    )
  }
}

const mapState2Props = (state) => ({session: state.session})
export default connect(mapState2Props)(Login);
const LoginStyle = styled.div`

  background-color: #fff;

  .signature {
      position: absolute;
      bottom:20px;
  }

  .bloc-login__info{
      position: relative;
      background-repeat:no-repeat;
      background-size:cover;
      background-postion: center;
      height: 680px;
  }

  .bloc-login__content {
      position: absolute;
      top:35%;
      left: 16%;
      color: #FFF;
     h1 {
     span{
           font-weight: 400;

     }
         font-size: 60px;
      font-weight: 700;
     }
     p {
       font-size: 26px;
       color: #4732a5;
     }
  }

  .ui-logo {
      margin-top: 30px;
      width: 60%;
  }
 
  .form-content {
      margin-top: 160px;
  }
  
  @media (min-width: 768px) {
    
    .ui-button{
    cursor: pointer;
    vertical-align: middle;

    }
    .ui-form {
        background-color: #fff;
        padding-left: 30px;
        padding-right:30px
    }
   .col .img{
  float:right
  margin-right:10px
  margin-top:10px;
  width:40px;
  height:40px;
  padding:7px;
      background: #000;
      border-radius: 30px;
      border: 2px solid #000;
      transition: all 0.8s;
      svg {
        transition: all 0.8s;
          fill: #fff;
      }
    .ui-logo {
      width: 75%;
    }
   
  }
`
