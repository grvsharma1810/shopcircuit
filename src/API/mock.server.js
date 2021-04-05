import { createServer, Model, RestSerializer } from "miragejs";
import { dummyData } from './data'
import faker from "faker";

export default function mockServer() {
    createServer({
        serializers: {
            application: RestSerializer
        },

        models: {
            productItem: Model,
            wishlistItem: Model,
            cartItem: Model
        },

        routes() {
            this.namespace = "api";
            this.timing = 1000;
            this.get("/wishlist", (schema) => {
                return schema.wishlistItems.all();
            });
            this.post("/wishlist", (schema, request) => {
                let attrs = JSON.parse(request.requestBody);

                return schema.wishlistItems.create({
                    ...attrs,
                });
            });
            this.delete("/wishlist/:id", (schema, request) => {
                let id = request.params.id;
                return schema.wishlistItems.find(id).destroy();
            });

            this.get("/cart", (schema) => {
                return schema.cartItems.all();
            });
            this.post("/cart", (schema, request) => {
                console.log({ request });
                let attrs = JSON.parse(request.requestBody);
                return schema.cartItems.create(attrs);
            });
            this.delete("/cart/:id", (schema, request) => {
                let id = request.params.id;
                return schema.cartItems.find(id).destroy();
            });
            this.get("/product", (schema) => {
                return schema.productItems.all();
            });
        },

        seeds(server) {
            dummyData.forEach(({ name, image, inStock }) => {
                server.create("productItem", {
                    productId: faker.datatype.uuid(),
                    name: name,
                    image: image,
                    price: faker.commerce.price(),
                    material: faker.commerce.productMaterial(),
                    brand: faker.lorem.word(),
                    inStock: inStock,
                    fastDelivery: faker.datatype.boolean(),
                    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
                    offer: faker.random.arrayElement([
                        "Save 50",
                        "70% bonanza",
                        "Republic Day Sale"
                    ]),
                    idealFor: faker.random.arrayElement([
                        "Men",
                        "Women",
                        "Girl",
                        "Boy",
                        "Senior"
                    ]),
                    level: faker.random.arrayElement([
                        "beginner",
                        "amateur",
                        "intermediate",
                        "advanced",
                        "professional"
                    ]),
                    color: faker.commerce.color()
                });
            });
        }
    });
}
