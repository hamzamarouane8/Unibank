import React, {Fragment} from 'react'
import styled from 'react-emotion'
import {NavLink} from 'react-router-dom'
import {Container, Nav, NavItem} from 'reactstrap'
import Navbar from './elements/Navbar'
import isString from 'lodash/isString'

import IcDashboard from '../component/images/Dashboard'
import IcTransfer from '../component/images/Transfer'
import IcWallet from '../component/images/Wallet'
import IcBeneficiaire from '../component/images/beneficiaire'
import IcCheque from '../component/images/Cheque'

const navItems = [
  { text: 'Dashboard', path: '/', icon: IcDashboard },
  { text: 'Virements', path: '/virement', icon: IcTransfer},
  { text: 'Comptes', path: '/comptes', icon: IcWallet },
  { text: 'Bénéficiaire', path: '/beneficiaires', icon: IcBeneficiaire },
  { text: 'Chequier', path: '/chequier', icon: IcCheque }

]

export default ({children}) =>
  (<Fragment>
    <Navbar/>
    <Container fluid className="mt-5">
      <LayoutDesign>
        <div className="layout-sidebar">
          <Nav vertical>
            {navItems.map((item,index) => (
              <NavItem key={index}>
                <NavLink to={item.path} exact>
                  <div className="sidebar-item__content">
                  <div className="img">
                    { isString(item.icon) ? <img alt="" src={item.icon}/> : <item.icon />}
                  </div>
                  <span>{item.text}</span>
                  </div>
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
        <div className="layout-main">
          {children}
        </div>
      </LayoutDesign>
    </Container>
  </Fragment>
)

const LayoutDesign = styled('div')`
  .layout-sidebar {
    background: #FFF;
    ul li  {
      margin-bottom: 38px;
      
      span {
        display: block;
        font-size: 11px;
        color: #999;
         font-weight: 600;
      }
      
      .img {
        width: 43px;
        height: 43px;
        display: inline-block;
        padding-top: 8px;
        margin-bottom: 2px;
        
        img,svg {
          width: 25px;
          height: 25px;
        } 
               
      }
      .sidebar-item__content {
            position:relative;

      }
      .active .sidebar-item__content:after {
          content:"";
          position: absolute;
          top:0;
          right:0;
          margin-right: -10px;
          border: 2px solid #922c88;
          height: 66px;
      }
            
      .active .img {        
        background: #922c88;
        border-radius: 30px;
        svg {
          fill: #FFF;
        }
      }
    }
    
    padding: 130px 10px;
    text-align: center;
    position: fixed;
    top: 0px;
    left: 0;
    width: 100px;
    bottom: 0;
  }
  
  .layout-main {
    margin: auto;
    width: 90%;
  }
  
  
   @media (min-width: 1024px) {
    
   .layout-sidebar{
          display: block!important;
  }
   
  }
  .layout-sidebar{
           display: none ;
  }
`
