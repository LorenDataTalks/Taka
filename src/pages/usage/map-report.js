import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import LayoutApp from '../../components/layout-app';
import { DeleteToken } from '../../services/token.service';

class MapReportContainer extends Component {
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    };

    return (
        <LayoutApp>
            <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{ lat: 37.7749, lng: -122.4194 }}
                >
                    <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
                </Map>
        </LayoutApp>
     
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_API_KEY_GOES_HERE'
})(MapReportContainer);
