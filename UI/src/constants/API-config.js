/* "test" environment for testing API and
* "build" environment after integrated with back-end code
* */

/*const ENV = "test";*/
import ServerEndpoint from "./Server-endpoint";

const ENV = "build";

const API = (ENV === "test") ?
{
    CONNECTION_ENDPOINT: '',
    GET_ORDERS: '',
    GET_SHIPMENT_STATUS_LIST: ''
}
:
{
    CONNECTION_ENDPOINT: ServerEndpoint + '/notify',
    GET_ORDERS: ServerEndpoint + '/',
    GET_SHIPMENT_STATUS_LIST: ServerEndpoint + '/'
};

export default API;