import React from "react";
import MaterialTable from "material-table";

const Table = ({ countries }) => {
  const columns = [
    {
      title: "Country",
      field: "country",
    },
    {
      title: "Total Cases",
      field: "cases",
      render: (country) => country.cases.toLocaleString(),
    },
    {
      title: "Today Cases",
      field: "todayCases",
      render: (country) => country.todayCases.toLocaleString(),
    },
    {
      title: "Total Recovered",
      field: "recovered",
      render: (country) => country.recovered.toLocaleString(),
    },

    {
      title: "Today Recovered",
      field: "todayRecovered",
      render: (country) => country.todayRecovered.toLocaleString(),
    },
    {
      title: "Total Deaths",
      field: "deaths",
      render: (country) => country.deaths.toLocaleString(),
    },

    {
      title: "Today Deaths",
      field: "todayDeaths",
      render: (country) => country.todayDeaths.toLocaleString(),
    },
  ];
  return (
    <MaterialTable
      className="material__table"
      title="Coronavirus Data"
      data={countries}
      columns={columns}
      options={{
        paging: true,
        pageSize: 10, // make initial page size
        emptyRowsWhenPaging: true, //to make page size fix in case of less data rows
        pageSizeOptions: [10, 20, 30, 50, 100], // rows selection options
        headerStyle: {
          backgroundColor: "#eee",
          fontWeight: "bold",
        },
      }}
    />
  );
};

export default Table;
