import { Circle, Popup } from "react-leaflet";
import React from "react";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 900,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
  active: {
    hex: "#fb4443",
    multiplier: 1000,
  },
  tests: {
    hex: "#00c700",
    multiplier: 550,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country, index) => (
    <Circle
      key={index}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) *
        (casesTypeColors[casesType].multiplier - 500)
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
              backgroundPosition: "center",
            }}
          ></div>
          <div className="info-country">{country.country}</div>
          <div className="info-cases">
            Cases: {country.cases.toLocaleString()}
          </div>
          <div className="info-recovered">
            Recovered: {country.recovered.toLocaleString()}
          </div>
          <div className="info-deaths">
            Deaths: {country.deaths.toLocaleString()}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const prettyPrintStat = (stat) => {
  return stat ? stat.toLocaleString() : 0;
};
