import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import alanBtn from "@alan-ai/alan-sdk-web";
import firebase from "firebase/app";
import "firebase/analytics";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.80746, lng: 20.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetchWorldWideData();
  }, []);

  useEffect(() => {
    alanBtn({
      key:
        "fc0b9fc7a78dc8355d7d8c64f238b2882e956eca572e1d8b807a3e2338fdd0dc/stage",
    });
  }, []);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyAHDDisSLTn69xriB9Rbrt_rBuSfPPHflM",
      authDomain: "aathik-covid-tracker.firebaseapp.com",
      databaseURL: "https://aathik-covid-tracker.firebaseio.com",
      projectId: "aathik-covid-tracker",
      storageBucket: "aathik-covid-tracker.appspot.com",
      messagingSenderId: "100244378656",
      appId: "1:100244378656:web:1fe01045dbdc71c6579845",
      measurementId: "G-0RJTJ6RQQM",
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.innerHTML;
    const url = `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        try {
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        } catch (error) {
          fetchWorldWideData();
        }
      });
  };
  const fetchWorldWideData = () => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        setMapCenter({ lat: 20.80746, lng: 20.4796 });
      });
  };

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Autocomplete
              onChange={onCountryChange}
              options={countries}
              getOptionLabel={(country) => country.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Country"
                  variant="outlined"
                />
              )}
            />
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coranavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={countryInfo.recovered}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={countryInfo.deaths}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Total Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="heading">Worldwide Covid-19 Cases</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
