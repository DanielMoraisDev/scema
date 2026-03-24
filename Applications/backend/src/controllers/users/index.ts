import loginUser from "./login";
import refreshToken from "./refreshToken";
import registerUser from "./register";
import updateCommon from "./updateCommon";
import updatePassword from "./updatePassword";

const usersController = {
  register: registerUser,
  login: loginUser,
  refreshToken: refreshToken,
  updateCommon: updateCommon,
  updatePassword: updatePassword,
};

export default usersController;
