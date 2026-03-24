import authenticateToken from "./authenticate-token";
import verifyBody from "./verify-body";

const globalMiddlewares = {
  authToken: authenticateToken,
  verifyBody: verifyBody,
};

export default globalMiddlewares;
