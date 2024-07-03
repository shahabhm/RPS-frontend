import React, {useEffect, useState} from "react";
import GoogleMapReact from 'google-map-react';
import {GeoAltFill} from 'react-bootstrap-icons';
import {postRequest} from "../requests";

const Pinpoint = ({name, color}) => <div><GeoAltFill style={{zoom: "200%", color: color || "red"}}/><p
    style={{color: "white"}}>{name}</p></div>;

export default function SimpleMap() {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [userLocation, setUserLocation] = useState(null);

    function haversineDistance(lat1, lon1, lat2, lon2) {
        function toRad(x) {
            return x * Math.PI / 180;
        }

        const R = 6371; // km

        const x1 = lat2 - lat1;
        const dLat = toRad(x1);
        const x2 = lon2 - lon1;
        const dLon = toRad(x2)
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;
        return d;
    }

    useEffect(() => {
        postRequest('get_hospitals').then(json => {
            const sortedLocations = json.sort((a, b) => {
                return haversineDistance(userLocation.lat, userLocation.lng, a.lat, a.lng) - haversineDistance(userLocation.lat, userLocation.lng, b.lat, b.lng)
            })
            setLocations(sortedLocations);
            setFilteredLocations(sortedLocations);
        }).catch(error => console.error(error));
    }, [userLocation]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (location) {
            setUserLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            });

        });
    }, []);

    const onMapClick = (e) => {
        console.log(e)
        setUserLocation({lat: e.lat, lng: e.lng});
    }


    function handleSearchClick(event) {
        setSearchVal(event.target.value)
        const searchValue = event.target.value;
        if (searchValue === "") {
            setFilteredLocations(locations);
            return;
        }
        const filterBySearch = locations.filter((location) => {
            if (location.name.toLowerCase()
                .includes(searchValue.toLowerCase())) {
                return location;
            }
        })
        setFilteredLocations(filterBySearch);
    }


    const defaultProps = {
        center: {
            lat: 35.70,
            lng: 51.41
        },
        zoom: 11
    };

    return (
        <div>
            <div style={{height: '60vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: ""}}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                    onClick={onMapClick}
                >
                    {filteredLocations.map(location => <Pinpoint
                            lat={location.lat}
                            lng={location.lng}
                            name={location.name}
                        />
                    )}
                    <Pinpoint lat={userLocation?.lat} lng={userLocation?.lng} name={"You"} color={"green"}/>
                </GoogleMapReact>
            </div>
            <div style={{margin: '0 auto', maxWidth: '800px'}}>
                <h1 style={{textAlign: 'center', color: '#3f51b5'}}>List of Hospitals</h1>
                <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                    <input type="text" value={searchVal} onChange={handleSearchClick} placeholder="Search hospitals"
                           style={{
                               marginRight: '10px',
                               padding: '10px',
                               borderRadius: '4px',
                               border: '1px solid #ccc'
                           }}/>
                    <button style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#3f51b5',
                        color: '#fff'
                    }}>Search
                    </button>
                </div>
                <p>{userLocation?.lat}, {userLocation?.lng}</p>
                <ul className={"list-group"}>
                    {filteredLocations.map((location, index) => (
                        <li key={index} className="list-group-item d-flex align-items-center mb-3"
                            style={{borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.15)'}}>
                            <img src={location.image} alt={location.name}
                                 style={{width: '300px', height: '200px', borderRadius: '50%'}}/>
                            <div className="ml-3">
                                <h5>
                                    <a href={location.website} target={"_blank"}
                                       style={{textDecoration: 'none', color: '#3f51b5'}}>{location.name}</a>
                                </h5>
                                <a href={location.website} target={"_blank"}>وبسایت بیمارستان</a>
                                <p>فاصله: {
                                    userLocation ? haversineDistance(userLocation.lat, userLocation.lng, location.lat, location.lng).toFixed(2) : "unknown"
                                }</p>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
}
