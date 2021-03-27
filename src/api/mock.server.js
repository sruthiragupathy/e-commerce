import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

import { femaleProducts } from "../Database";

faker.seed(123);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },
    models: {
      product: Model,
      cart: Model,
      wishlist: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 3000;
      this.resource("products");
      this.resource("carts");
      this.resource("wishlists");
    },

    seeds(server) {
      femaleProducts.forEach((item) => {
        server.create("product", {
          ...item
        });
      });

      [femaleProducts[0]].forEach((item) => {
        server.create("wishlist", {
          ...item
        });
      });

      [femaleProducts[0]].forEach((item) => {
        server.create("cart", {
          ...item
        });
      });
    }
  });
}
