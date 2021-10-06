import React from "react";
import MaterialTable from "material-table";
import "./table.scss";

const TableComponent = props => {
  const { data, columns, title, actions, search, filtering, message } = props;
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      actions={actions}
      localization={{
        header: {
          actions: "Action",
        },
        body: {
          emptyDataSourceMessage: message === "" ? "No records to display" : message
        }
      }}
      options={{
        actionsColumnIndex: -1,
        search: search,
        filtering: filtering,
        pageSize: 20,
        emptyRowsWhenPaging: false,
        pageSizeOptions: [20, 50, 100],
        draggable: false,
        thirdSortClick: false,
        headerStyle: {
          color: "#a3a4a9",
        },
        searchFieldStyle: {
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "3px",
          padding: "0.3rem 0.5rem",
          "& MuiInputBase-root": {
            "&:hover": {
              "&:before": {
                borderBottom: "none !important",
              },
            },
          },
        },
      }}
    />
  );
};

export default TableComponent;
