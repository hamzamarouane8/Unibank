import React from 'react';
import {connect} from 'react-redux'
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Image} from 'semantic-ui-react'
import {logoutAction} from "../../app/store/actions";
import styled from 'react-emotion'
import * as storage from "../../app/storage";

const assets = {
  logout: require('../../assets/img/ic_logout.svg'),
  notifications: require('../../assets/img/ic_notification.svg'),
  ahmed: require('../../assets/img/a.jpg'),
  abdellah: require('../../assets/img/a.png'),
  logo: require('../../assets/img/logo.png'),

}

export default connect()(({dispatch}) => {
  var user =storage.get('session_user')

  return(
    <Design>
      <Navbar light expand="md">
        <NavbarBrand href="/"><img alt="" width={40} src={assets.logo}/> <span>UNI</span>BANK</NavbarBrand>
        <NavbarToggler />
        <Collapse  navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="#" className="user">
                <span className="ui-hello">Hello,</span> <span className="ui-username">John{user.fullName}</span>
                <Image src={assets.abdellah} avatar />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#"><img src={assets.notifications} alt="" width={20} /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={() => dispatch(logoutAction()) }>
                Logout <img src={assets.logout} width={20} alt="" />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </Design>
  )
})

const Design = styled('div')`
  .navbar {
    background: #FFF;
    padding: 12px 60px 12px 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    z-index: 100;
  }

  .navbar-nav .nav-item {
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9em;
    
    .nav-link {
      height: 36px;
    }
    
    img {    
      margin-left: 5px;
    }
  }
  
  .navbar .user {
  img {    
    width:25px;
    height:25px;
    }
    .ui-hello {
      color: #CCC;
      margin-right: 5px;
    }
  ]
  
`
