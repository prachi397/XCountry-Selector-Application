import React, { useEffect, useState } from "react";

const Location = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedCountry, selectedState);
    }
  }, [selectedState]);

  //fetch countries data
  async function fetchCountries() {
    try {
      const url = "https://crio-location-selector.onrender.com/countries";
      const resp = await fetch(url);
      const result = await resp.json();
      setCountries(result);
    } catch (err) {
      console.log("Error in fetching countries:", err);
    }
  }

  //fetch states based on selected country
  async function fetchStates(countryName) {
    try {
      const url = `https://crio-location-selector.onrender.com/country=${countryName}/states`;
      const resp = await fetch(url);
      const result = await resp.json();
      setStates(result);
    } catch (err) {
      console.log("Error in fetching states:", err);
    }
  }
  //fetch states based on selected country
  async function fetchCities(countryName, stateName) {
    try {
      const url = `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`;
      const resp = await fetch(url);
      const result = await resp.json();
      setCities(result);
    } catch (err) {
      console.log("Error in fetching cities:", err);
    }
  }

  function handleCountryChange(e) {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
  }
  function handleStateChange(e) {
    setSelectedState(e.target.value);
    setSelectedCity("");
  }
  function handleCityChange(e) {
    setSelectedCity(e.target.value);
  }

  return (
    <div>
      <h1>Select Location</h1>
      <div>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="" disabled>
            Select Country
          </option>
          {countries.map((ele, idx) => (
            <option key={idx}>{ele}</option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={handleStateChange}
          disabled={!selectedCountry}
        >
          <option value="" disabled>
            Select State
          </option>
          {states.map((ele, idx) => (
            <option key={idx}>{ele}</option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          disabled={!selectedState}
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((ele, idx) => (
            <option key={idx}>{ele}</option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <h2>
          You selected <span style={{ fontSize: "2rem" }}>{selectedCity}</span>,{" "}
          <span style={{ color: "gray" }}>
            {" "}
            {selectedState},{selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );
};
export default Location;
