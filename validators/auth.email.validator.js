import validator from "../configuration/validation.config.js";
import APPSQUADZ from "../helpers/message.helper.js";

const { check } = validator,
  {
    VALIDATIONS: {
      PHONE_INVD,
      PHONE_REQ,
      PASSWORD_REQ
    },
  } = APPSQUADZ;

  const phoneNo = check("phoneNo")
  .not()
  .isEmpty()
  .withMessage(PHONE_REQ)
  .custom((value) =>
    /^([0-9]){10}$/.test(
      value
    )
  )
  .withMessage(PHONE_INVD),
  password = check("password").not().isEmpty().withMessage(PASSWORD_REQ),
  authByEmailValidator = {
    phoneNo,
    password
  };

export default authByEmailValidator;
