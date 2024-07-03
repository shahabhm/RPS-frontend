import React, {useEffect, useState} from "react";
import GoogleMapReact from 'google-map-react';
import {GeoAltFill} from 'react-bootstrap-icons';
import {postRequest} from "../requests";

const AnyReactComponent = ({name}) => <div><GeoAltFill style={{zoom: "200%", color: "red"}}/><p
    style={{color: "white"}}>{name}</p></div>;

export default function SimpleMap() {
    const [locations, setLocations] = useState([]);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [searchVal, setSearchVal] = useState("");

    useEffect(() => {
        postRequest('get_hospitals').then(json => {
            console.log('locations: ', json);
            setLocations(json);
            setFilteredLocations(json)
        }).catch(error => console.error(error));
    }, []);

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
                >
                    {filteredLocations.map(location => <AnyReactComponent
                            lat={location.lat}
                            lng={location.lng}
                            name={location.name}
                        />
                    )}
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
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
}
