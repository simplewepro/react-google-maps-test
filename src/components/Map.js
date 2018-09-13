import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle,
  DirectionsRenderer
} from "react-google-maps";
import { Loader } from "semantic-ui-react";

class Map extends React.Component {
  state = {
    directios: null
  };

  componentDidMount() {
    const google = window.google;
    // const DirectionsService = new google.maps.DirectionsService();
    // const PlacesService = new google.maps.places.PlacesService();
    // DirectionsService.route(
    //   {
    //     origin: new google.maps.LatLng(-33.397, 148.644),
    //     destination: new google.maps.LatLng(-33.46, 148.1),
    //     travelMode: google.maps.TravelMode.DRIVING
    //   },
    //   (result, status) => {
    //     if (status === google.maps.DirectionsStatus.OK) {
    //       this.setState({
    //         directions: result
    //       });
    //     } else {
    //       console.error(`error fetching directions ${result}`);
    //     }
    //   }
    // );

    console.log(this.map);

    // PlacesService.nearbySearch(
    //   {
    //     location: this.props.defaultCenter,
    //     radius: 1000,
    //     type: ["store"]
    //   },
    //   (results, status) => {
    //     console.log(results, status);
    //     if (status === google.maps.places.PlacesServiceStatus.OK) {
    //       console.log(results);
    //     }
    //   }
    // );
  }

  render() {
    const { markers, defaultCenter: center } = this.props;

    const { directions } = this.state;

    const circleOptions = {
      fillOpacity: 0.0,
      strokeWeight: 1,
      clickable: false
    };

    return (
      <GoogleMap
        defaultZoom={16}
        center={center}
        defaultOptions={{ disableDefaultUI: true }}
        ref={map => (this.map = map)}
      >
        {markers.map((marker, key) => (
          <Marker
            key={key}
            position={{ ...marker }}
            // animation={}
          />
        ))}
        {directions && <DirectionsRenderer directions={directions} />}
        <Circle
          center={center}
          defaultRadius={500}
          visible
          options={{ ...circleOptions, zIndex: 10 }}
        />
        <Circle
          center={center}
          defaultRadius={1000}
          visible
          options={circleOptions}
        />
      </GoogleMap>
    );
  }
}

const withMapProps = withProps({
  googleMapURL:
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyALNrA8KO-HSlVIIDfnHqaw1WNaqmYD2Pc&v=3.exp&libraries=geometry,drawing,places",
  loadingElement: <Loader active />,
  containerElement: <div style={{ height: `100%` }} />,
  mapElement: <div style={{ height: `100%` }} />,
  defaultCenter: {
    lat: -34.423337969195984,
    lng: 150.86290614571863
  },
  markers: [
    {
      lat: -34.423337969195984,
      lng: 150.86290614571863
    }
  ]
});

const enchance = compose(
  withMapProps,
  withScriptjs,
  withGoogleMap
);

export default enchance(Map);
