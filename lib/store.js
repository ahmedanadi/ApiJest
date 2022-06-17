const request = require("supertest");
const baseUrl = "https://petstore.swagger.io/"


async function getStoreOrder(productId){
    const response = await request(baseUrl).get(`v2/store/order/${productId}`);
    return response;
}

async function placeStoreOrder(orderPayload){
    const response = await request(baseUrl).post(`v2/store/order`).send(orderPayload);
    console.log(response.status)
    return response;
}

async function deleteStoreOrder(productId){
    const response = await request(baseUrl).delete(`v2/store/order/${productId}`);
    return response;
}

async function getInventory(){
    const response = await request(baseUrl).get(`v2/store/inventory`);
    return response;
}

module.exports = {getStoreOrder, getInventory, deleteStoreOrder, placeStoreOrder}