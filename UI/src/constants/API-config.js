/* "test" environment for testing API and
* "build" environment after integrated with back-end code
* */

import ServerEndpoint from "./Server-endpoint";

const ENV = "build";

const API = (ENV === "test") ?
{
    CONNECTION_ENDPOINT: '/',
    GET_ORDERS: '/test-data/get-order-list.json',
    GET_ORDER: '/test-data/get-order.json',
    GET_SHIPMENT_STATUS_LIST: '/test-data/get-status-list.json',
    POST_UPDATE_ORDER_STATUS: '/'
}
:
{
    CONNECTION_ENDPOINT: ServerEndpoint + '/notify',
    GET_ORDERS: ServerEndpoint + '/api/Notification/GetOrdersPerUser',
    GET_ORDER: ServerEndpoint + '/api/Notification/GetOrderDetails',
    GET_SHIPMENT_STATUS_LIST: ServerEndpoint + '/api/Notification/GetAllShipmentStatus',
    POST_UPDATE_ORDER_STATUS: ServerEndpoint + '/api/Notification/UpdateShipmentStatus'
};

export default API;