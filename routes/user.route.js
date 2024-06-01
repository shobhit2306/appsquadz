import { Router } from "express";
import userDomain from "../controller/user.controller.js";
import APPSQUADZ from "../helpers/message.helper.js";

const userRouter = Router(),
  {
    register,
    authByPhoneNo,
    profile,
  } = userDomain,
  {
    ROUTES: {
      USER_ENDPOINTS: {
        REGISTER,
        AUTH_EMAIL,
        PROFILE,

      },
    },
  } = APPSQUADZ;

userRouter.post(REGISTER, register);
userRouter.post(AUTH_EMAIL, authByPhoneNo);
userRouter.get(PROFILE, profile);

export default userRouter;
