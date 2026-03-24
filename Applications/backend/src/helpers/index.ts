import authToken from "./auth-token";
import createAccessToken from "./create-access-token";
import createRefreshToken from "./create-refresh-token";

const globalHelpers = {
  global: {
    createAccessToken: createAccessToken,
    createRefreshToken: createRefreshToken,
    authToken: authToken,
  },
};

export default globalHelpers;
