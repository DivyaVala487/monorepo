import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRowSelectionModel,
  GridSortDirection,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface ReusableDataGridProps {
  rows?: GridRowsProp;
  columns: GridColDef[];
  initialPageSize?: number;
  pageSizeOptions?: number[];
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  sortingOrder?: GridSortDirection[];
  loading?: boolean;
  autoHeight?: boolean;
  pagination?: true;
  onRowSelectionModelChange?: (selectionModel: GridRowSelectionModel) => void;
}

const ReusableDataGrid: React.FC<ReusableDataGridProps> = ({
  rows,
  columns,
  initialPageSize = 5,
  pageSizeOptions = [5, 10, 20],
  checkboxSelection = false,
  disableRowSelectionOnClick = false,
  sortingOrder = ["asc", "desc"],
  loading = false,
  autoHeight = true,
  pagination = true,
  onRowSelectionModelChange,
  ...restProps
}) => {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: initialPageSize,
    page: 0,
  });

  const handlePaginationModelChange = (newModel: any) => {
    setPaginationModel(newModel);
  };

  return (
    <Box sx={{ marginLeft:"20px", width: "95%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // getRowHeight={() => 100}
        initialState={{
          pagination: {
            paginationModel: { pageSize: initialPageSize },
          },
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick={disableRowSelectionOnClick}
        sortingOrder={sortingOrder}
        loading={loading}
        autoHeight={autoHeight}
        pagination={pagination}
        onRowSelectionModelChange={onRowSelectionModelChange}
        {...restProps}
      />
    </Box>
  );
};

export default ReusableDataGrid;
