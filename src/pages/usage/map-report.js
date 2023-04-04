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
                    initialCenter={{ lat: -1.3099100330162774, lng: 36.81332409381867 }}
                >
                    <Marker position={{ lat: -1.3099100330162774, lng: 36.81332409381867 }} />
                </Map>
        </LayoutApp>
     
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDWSzH6aeauzcooBSACFxw_PjsBNMHIzLY'
})(MapReportContainer);
