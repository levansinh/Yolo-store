import {
  verifyTokenWithAdmin,
  verifyToken,
} from "../middlewares/verifyToken.js";
import user from "./user.js";
import auth from "./auth.js";
import product from "./product.js";
import category from "./category.js";

function router(app) {
  app.use("/v1/api/user", user); // note check login Admin
  app.use("/v1/api/auth", auth);
  app.use("/v1/api/product", product);
  app.use("/v1/api/category", category);
}

export default router;
 