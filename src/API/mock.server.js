import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

export default function mockServer() {
    createServer({
        serializers: {
            application: RestSerializer
        },

        models: {
            productItem: Model,
            wishListItem: Model,
            cartItem: Model
        },

        routes() {
            this.namespace = "api";
            this.timing = 1000;
            this.resource("productItem");
            this.resource("wishListItem");
            this.resource("cartItem");
        },

        seeds(server) {
            [...Array(50)].forEach((_) => {
                server.create("productItem", {
                    productId: faker.datatype.uuid(),
                    name: faker.commerce.productName(),
                    image: faker.random.image(),
                    price: faker.commerce.price(),
                    material: faker.commerce.productMaterial(),
                    brand: faker.lorem.word(),
                    inStock: faker.datatype.boolean(),
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
