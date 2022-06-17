const {getInventory, getStoreOrder, deleteStoreOrder, placeStoreOrder} = require("../lib/store");

const orderPayload = {
    "id": Math.floor(Math.random() * 100),
    "petId": 0,
    "quantity": 0,
    "shipDate": "2022-06-16T17:44:01.000+0000",
    "status": "placed",
    "complete": true
}

describe("Store", () => {
    describe("get order route", ()=> {
        describe("given the order doesn't exist", ()=>{
            it("should return a 404 if not found", async ()=>{
                await deleteStoreOrder(orderPayload.id);

                const response = await getStoreOrder(orderPayload.id);
                expect(response.statusCode).toBe(404);
            })

            it("should return a 400 for invalid id", async ()=>{
                const orderId = "%";
                const response = await getStoreOrder(orderId);
                expect(response.statusCode).toBe(400);
            })
        })
    })
})
