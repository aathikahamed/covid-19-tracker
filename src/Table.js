import React from "react";
import MaterialTable from "material-table";

const Table = ({ countries }) => {
  const columns = [
    {
      title: "Country",
      field: "country",
    },
    {
      title: "Cases",
      field: "cases",
      align: "left",
    },
  ];
  return (
    <MaterialTable
      title="Coronavirus Cases"
      data={countries}
      columns={columns}
      options={{
        paging: true,
        pageSize: 10, // make initial page size
        emptyRowsWhenPaging: true, //to make page size fix in case of less data rows
        pageSizeOptions: [6, 12, 20, 50], // rows selection options
      }}
    />
  );
};

export default Table;
