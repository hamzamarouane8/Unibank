import React, {Component} from 'react'
import {GoogleMap, withGoogleMap} from "react-google-maps"
import Mark from './marker'
import Button from '../button'
import withScriptjs from 'react-google-maps/lib//withScriptjs';
import Search from '../search'
import styled from "styled-components";
const refs = {map: undefined}
var predefinedLocations = [];

class Map extends Component {

constructor(props) {
    super(props);
    this.state = {
      activeMarker: null,
      googleMap:null,
      center:null,
      markers:null
    }
}

componentDidMount() {
  predefinedLocations= this.props.markers
}

handleToggleOpen = (marker) => {
    this.setState({
      activeMarker: marker
    });
}
handleToggleClose = () => {
    this.setState({
      activeMarker: null
    });
}
onMapMounted(ref){
    refs.map = ref
}

calcDistance(p1, p2) {
  return (window.google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
}

fetchPlaces(){
  let list = [];
  const google = window.google;
  const bounds = refs.map.getBounds();
 // var centerlat = (bounds.la.j + bounds.la.l)/2
  //var centerlng = (bounds.ea.j + bounds.ea.l)/2
  var centerlat = (bounds.ma.j + bounds.ma.l)/2
  var centerlng = (bounds.fa.j + bounds.fa.l)/2
  var lat = centerlat;
  var lng = centerlng;
  var p1, p2;
  predefinedLocations.forEach(function(obj) {
    p1 = new google.maps.LatLng(obj.latitude, obj.longitude);
    p2 = new google.maps.LatLng(lat, lng);
    var distance = (window.google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
    obj.distance = distance< 4 ? distance : '' ;
  });
  list = predefinedLocations.filter((elt) => elt.distance !== '')
  this.setState({
    markers: list
  });
}

  render() {
    const {distance,zoom,defaultCenter} = this.props
    return (
    <ButtonStyle>
      <GoogleMap
        defaultZoom={zoom}
        defaultCenter={defaultCenter}
        ref={this.onMapMounted}
        onBoundsChanged={this.fetchPlaces.bind(this)}>
        <Search />
        <Button nameIcon="filter" id="ui-filter" icon="icon"/>
        {(this.state.markers || []).map((item, i) => {
          //if(item.distance<distance){
          return (
            <Mark key={i} position={{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}}
                  open={this.state.activeMarker === item}
                  onClick={() => this.handleToggleOpen(item)}
                  closeInfo={()=>this.handleToggleClose()}
                  >
              {this.props.infoWindow(item)}
            </Mark>
          )}
        //}
        )}
      </GoogleMap>
  </ButtonStyle>
    );
  }
}
export default withScriptjs(withGoogleMap(Map));

const ButtonStyle = styled.div`
  .ui.button {
     position: absolute ;
   margin :20px
bottom:0  }
  
`
