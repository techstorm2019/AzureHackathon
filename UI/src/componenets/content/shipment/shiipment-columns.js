const ShipmentColumns = [
    {
        headerClassName: 'data-table header',
        Header: "Order ID",
        accessor: "OrderNo",
        width: 150
    },
    {
        headerClassName: 'data-table header',
        Header: "Customer",
        accessor: "Customer"
    },
    {
        headerClassName: 'data-table header',
        Header: "Order details",
        accessor: "OrderDetails"
    },
    {
        headerClassName: 'data-table header',
        Header: "Order status",
        accessor: "ShipmentStaus"
    },
    {
        headerClassName: 'data-table header',
        Header: "Is delay",
        accessor: "IsDelay"
    }
];

export default ShipmentColumns;