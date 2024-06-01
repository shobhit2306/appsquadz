import validator from "../configuration/validation.config.js";
import bcrypt from "bcrypt";
import helpers from "../helpers/index.helper.js";
import userService from "../services/user.service.js";
import responseHelper from "../helpers/response.helper.js";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
import registerValidator from "../validators/register.validator.js";
import authByEmailValidator from "../validators/auth.email.validator.js";
import APPSQUADZ from "../helpers/message.helper.js";
import __dirname from "../configuration/dir.config.js";
import moment from "moment";

const {
    generateToken,
  } = helpers,
  { validationThrowsError } = validator,
  { send200, send403, send400, send401, send404 } = responseHelper,
  {
    createUser,
    retrieveUserByPhoneNo,
    updateUser,
    retrieveUser,
  } = userService,
  { verifyToken: jwtAuthGuard } = jwtMiddleware,
  {
    MESSAGES: {
      VLD_ERR,
      USER_REG_SUCCESS,
      USER_NOT_FOUND_ERR,
      LOGIN_SUCCESS,
      NUMBER_ALR_RGSTD,
      USER_INVD_PWD_ERR,
      USER_PROFILE,
    }
  } = APPSQUADZ

const register = [
    registerValidator.name,
    registerValidator.phoneNo,
    registerValidator.email,
    registerValidator.password,
    async (req, res) => {
      const errors = validationThrowsError(req);
      if (errors.length)
        send400(res, { status: false, message: VLD_ERR, data: errors });
      else {
        const {
          body: {
            password,
            phoneNo,
          }
        } = req;
        let user = null;
        const existingUser = await retrieveUserByPhoneNo(phoneNo);
            if (existingUser) {
              send403(res, {
                status: false,
                message: "Error",
                data: [{ msg: NUMBER_ALR_RGSTD }],
              });         
            }else {
              const userObj = {
                ...req.body,
                password: await bcrypt.hash(password, await bcrypt.genSalt(10))
              };
              const created = await createUser(userObj);
              user = await updateUser(
                { _id: created._id },
                {
                  loginToken: generateToken(created),
                  loginTime: moment().utc().toDate(),
                }
              );
            }
 
              send200(res, {
                status: true,
                message: USER_REG_SUCCESS,
                data: user,
              });
          
        
      }
    },
  ],
  authByPhoneNo = [
    authByEmailValidator.phoneNo,
    authByEmailValidator.password,
  
    async (req, res) => {
      const errors = validationThrowsError(req);
      if (errors.length)
        send400(res, { status: false, message: VLD_ERR, data: errors });
      else {
        const {
          body: { phoneNo, password }
        } = req;

        let user = null;
        const existingUser = await retrieveUserByPhoneNo(phoneNo);

        if (!existingUser) {
          send404(res, {
            status: false,
            message: "Error",
            data: [{ msg: USER_NOT_FOUND_ERR }],
          });
        } else {
          const {
            password: existingPassword,
            _id: existingUserId
          } = existingUser;

              if (!(await bcrypt.compare(password, existingPassword)))
                send401(res, {
                  status: false,
                  message: "Error",
                  data: [{ msg: USER_INVD_PWD_ERR }],
                });
              else {
                  user = await updateUser(
                    { _id: existingUserId },
                    {
                      loginToken: generateToken(existingUser),
                      loginTime: moment().utc().toDate(),
                    }
                  );
                  user.password = undefined;
                  send200(res, {
                    status: true,
                    message: LOGIN_SUCCESS,
                    data: user,
                  }); 
              }
        }
      }
    },
  ],
  profile = [
    jwtAuthGuard,
    async (req, res) => {
      const {
          user: { _id },
        } = req,
        profile = await retrieveUser({ _id });
      profile.loginToken = profile.password = undefined;
      send200(res, { status: true, message: USER_PROFILE, data: profile });
    },
  ],
  userDomain = {
    register,
    authByPhoneNo,
    profile,
  };

export default userDomain;
