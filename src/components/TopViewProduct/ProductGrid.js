import React from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';


const CustomPagination = () => {

    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
        <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
    )
}

const ProductGrid = (props) => {
    return (
        <DataGrid
            sx={{
                border: 'none',
                '.MuiDataGrid-iconSeparator': { width: 0 },
                '.MuiDataGrid-footerContainer': { justifyContent: 'center', borderTop: 'none' },
                '.MuiDataGrid-columnHeaderTitle ': { fontWeight: 'bold', fontSize: 'medium' },
                '.MuiDataGrid-cell': { borderBottom: 'none' },
                '.MuiDataGrid-cell:focus,.MuiDataGrid-cell:focus-within': { outline: 'none' },
                '.MuiDataGrid-row:hover': { backgroundColor: 'transparent' }
            }}
            autoHeight
            rowHeight={45}
            disableColumnMenu
            disableSelectionOnClick
            pagination
            pageSize={8}

            components={{
                Pagination: CustomPagination,
            }}
            rows={props.data}
            columns={
                [
                    { field: "id", headerName: "product ID", headerAlign: "center", minWidth: 120, align: "center", sortable: false, valueFormatter: (id) => { return `product${id.value}`; } },
                    { field: "title", headerName: "Product Title", minWidth: 150, flex: 1, headerAlign: "center", sortable: false },
                    { field: "price", headerName: "Price", headerAlign: "center", align: "center", sortable: false },
                    { field: "views", headerName: "Views", headerAlign: "center", align: "center", sortable: false }
                ]}
        />
    )
}

export default ProductGrid;