import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import {Table} from "semantic-ui-react/dist/commonjs/collections/Table/Table";
import get from "lodash/get";

export default ({data}) => {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 33.5731104, lng: -7.589843400000063 }}
    >
      {
        data.map((item, i) => (
          <Marker key={i} position={{ lat: parseFloat(item.address.longitude), lng: parseFloat(item.address.latitude) }} />
      ))
      }
    </GoogleMap>
  )

}
