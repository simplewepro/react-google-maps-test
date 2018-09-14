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
    directios: null,
    center: this.props.defaultCenter
  };

  componentDidMount() {
    const google = window.google;
    const PlacesService = new google.maps.places.PlacesService(
      this.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    );

    PlacesService.nearbySearch(
      {
        location: this.props.defaultCenter,
        radius: 1000,
        type: ["school"]
      },
      (results, status) => this.setResult("schools", results, status)
    );

    PlacesService.nearbySearch(
      {
        location: this.props.defaultCenter,
        radius: 2000,
        type: ["hospital"]
      },
      (results, status) => this.setResult("hospital", results, status)
    );
  }

  setResult = (name, result, status) => {
    if (status === window.google.maps.DirectionsStatus.OK) {
      this.setState({
        [name]: result
      });
    } else {
      console.error(`error fetching ${name} ${result}`);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const google = window.google;
    if (this.state.schools) {
      if (
        prevState.schools !== this.state.schools ||
        prevState.center !== this.state.center
      ) {
        console.log("yey schools");
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route(
          {
            origin: this.state.center,
            destination: this.state.schools[0].geometry.location,
            travelMode: google.maps.TravelMode.DRIVING
          },
          (result, status) =>
            this.setResult("school_directions", result, status)
        );
      }
    }

    if (this.state.hospital) {
      if (
        prevState.hospital !== this.state.hospital ||
        prevState.center !== this.state.center
      ) {
        console.log("yey hospitals");
        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route(
          {
            origin: this.state.center,
            destination: this.state.hospital[0].geometry.location,
            travelMode: google.maps.TravelMode.DRIVING
          },
          (result, status) =>
            this.setResult("hospital_directions", result, status)
        );
      }
    }
  }

  handleMapClick = e => {
    this.map.panTo(e.latLng);
    this.setState({
      center: e.latLng
    });
  };

  render() {
    const { markers } = this.props;
    const { school_directions, hospital_directions, center } = this.state;
    const circleOptions = {
      fillOpacity: 0.0,
      strokeWeight: 1,
      clickable: false
    };

    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={center}
        defaultOptions={{ disableDefaultUI: true }}
        onClick={this.handleMapClick}
        clickableIcons
        ref={map => (this.map = map)}
      >
        {markers.map((marker, key) => (
          <Marker
            key={key}
            position={{ ...marker }}
            // animation={}
          />
        ))}

        {school_directions && (
          <DirectionsRenderer
            directions={school_directions}
            options={{ preserveViewport: true }}
          />
        )}

        {hospital_directions && (
          <DirectionsRenderer
            directions={hospital_directions}
            options={{ preserveViewport: true }}
          />
        )}

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
