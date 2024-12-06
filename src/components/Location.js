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
    fetchStates(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    fetchCities(selectedCountry, selectedState);
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

  return (
    <div>
      <h1>Select Location</h1>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="" disabled>
          Select Country
        </option>
        {countries.map((ele, idx) => (
          <option key={idx}>{ele}</option>
        ))}
      </select>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
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
        onChange={(e) => setSelectedCity(e.target.value)}
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
  );
};
export default Location;
