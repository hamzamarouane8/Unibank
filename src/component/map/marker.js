import React from 'react'
import {InfoWindow, Marker} from "react-google-maps"

export default ({position, onClick, open,children ,closeInfo,onClickInfoWindow}) => (
  <Marker position={position} onClick={onClick}>
    {open 
     && <InfoWindow onCloseClick={closeInfo}>
      <div onClick={onClickInfoWindow}>
      {children}
      </div>
    </InfoWindow>
    }
  </Marker>
)

