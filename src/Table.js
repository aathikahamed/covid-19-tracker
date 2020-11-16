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
    },
    {
      title: "Total Recovered",
      field: "recovered",
    },
    {
      title: "Total Deaths",
      field: "deaths",
    },
    {
      title: "Today Cases",
      field: "todayCases",
    },
    {
      title: "Today Recovered",
      field: "todayRecovered",
    },
    {
      title: "Today Deaths",
      field: "todayDeaths",
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
