import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Card } from "@material-ui/core";
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
import Container from "@material-ui/core/Container";
import covid_svg from "./covid-svg.svg";
import Footer from "./Footer.js";
import recoveredImage from "./images/recovered.png";
import casesImage from "./images/cases.png";
import criticalImage from "./images/critical.png";
import deathsImage from "./images/deaths.png";
import feverImage from "./images/fever.png";
import testImage from "./images/test.png";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.80746, lng: -10.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [currentCountry, setCurrentCountry] = useState("all");

  useEffect(() => {
    fetchWorldWideData();
  }, []);

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
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
          setCurrentCountry(data.country);
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
        setMapCenter({ lat: 20.80746, lng: -10.4796 });
        setMapZoom(3);
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
    <>
      <Container maxWidth="lg">
        <div className="heading">
          <img className="logo__image" src={covid_svg} alt="O" />
        </div>
        <FormControl className="app__dropdown" fullWidth={true}>
          <Autocomplete
            onChange={onCountryChange}
            options={countries}
            getOptionLabel={(country) => country.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Country"
                variant="outlined"
              />
            )}
          />
        </FormControl>

        <div className="app__stats">
          <InfoBox
            isRed
            isActive={casesType === "cases"}
            onClick={() => setCasesType("cases")}
            title="Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
            icon={casesImage}
          />
          <InfoBox
            isActive={casesType === "recovered"}
            onClick={() => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={countryInfo.recovered}
            icon={recoveredImage}
          />
          <InfoBox
            isRed
            isActive={casesType === "deaths"}
            onClick={() => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={countryInfo.deaths}
            icon={deathsImage}
          />

          <InfoBox
            isRed
            isActive={casesType === "active"}
            onClick={() => setCasesType("active")}
            title="Active Cases"
            cases={prettyPrintStat(countryInfo.active)}
            icon={feverImage}
          />
          <InfoBox
            isRed
            isActive={casesType === "critical"}
            onClick={() => setCasesType("critical")}
            title="Critical cases"
            cases={prettyPrintStat(countryInfo.critical)}
            icon={criticalImage}
          />
          <InfoBox
            isActive={casesType === "tests"}
            onClick={() => setCasesType("tests")}
            title="Tests Taken"
            cases={prettyPrintStat(countryInfo.tests)}
            icon={testImage}
          />
        </div>

        {(casesType === "cases" ||
          casesType === "deaths" ||
          casesType === "recovered") && (
          <Card className="app__graph">
            <LineGraph country={currentCountry} casesType={casesType} />
          </Card>
        )}
        <Map
          className="app__map"
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />

        <Table countries={tableData} />
      </Container>
      <Footer />
    </>
  );
}

export default App;
