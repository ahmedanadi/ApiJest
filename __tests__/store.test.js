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

        describe("given the order does exist", ()=>{
            it("should return a 200 status and the order", async ()=>{
                
                const response = await placeStoreOrder(orderPayload);
                const {statusCode, body} = await getStoreOrder(response.body.id);

                expect(statusCode).toBe(200);
                expect(body.id).toBe(response.body.id);
            })
        })
    })

    describe("create order route", () => {

        describe("given the order data is correct", ()=>{
            it("should return a 200 status and the order", async ()=>{
                
                const {statusCode, body} = await placeStoreOrder(orderPayload);

                expect(statusCode).toBe(200);
                expect(body).toEqual(orderPayload);
            })
        })

        describe("given the product data isn't correct", ()=>{
            it('should return a 400 status', async () => {
                let order =  {...orderPayload};
                order.id = '105 OR 1=1'
                const {statusCode} = await placeStoreOrder(order);
                
                expect(statusCode).toBe(400);
            });
        })
    });

    describe("delete order route", () => {

        describe("given an existing orderId", ()=>{
            it("should delete the order and 200 status", async ()=>{
                
                const response = await placeStoreOrder(orderPayload);
                expect(response.status).toBe(200);

                const {statusCode} = await deleteStoreOrder(response.body.id);

                expect(statusCode).toBe(200);
            })
        })

        describe("given a non existing orderId", ()=>{
            it('should return a 404 status', async () => {

                await deleteStoreOrder(orderPayload.id);
                const {statusCode} = await deleteStoreOrder(orderPayload.id);

                expect(statusCode).toBe(404);
            });
        })

        describe("given an invalid orderId", ()=>{
            it('should return a 400 status', async () => {

                let orderId = '%'
                const {statusCode, body} = await deleteStoreOrder(orderId);

                expect(statusCode).toBe(400);
            });
        })
    });

    describe("view inventory route", ()=>{
        it("should delete the order and return 200", async ()=>{
            
            const {status} = await getInventory();
            expect(status).toBe(200);
        })

        it("pending count updates correctly", async ()=>{
            
            //initial inventory
            const {body: before} = await getInventory();

            //place new pending order
            let order =  {...orderPayload};
            order.complete = false
            await placeStoreOrder(order);

            //assert pending count has increased
            const {body: after} = await getInventory();
            expect(before.pending < after.pending);
        })
    })
})
