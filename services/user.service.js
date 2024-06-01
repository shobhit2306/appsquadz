import userModel from "../models/user.model.js";
import commonHelper from "../helpers/db.common.helper.js";

const {
  createOne,
  retrieveOne,
  updateOne,
  upsertOne,
  updateMany,
  retrieveById,
  retrieveMany,
  deleteOne,
  modUpsertOne,
  deleteMany,
} = commonHelper;

const createUser = async (data) => {
    return await createOne(userModel, { ...data });
  },
  retrieveUserByPhoneNo = async (phoneNo) => {
    return await retrieveOne(userModel, { phoneNo });
  },
  retrieveUserById = async (userId) => {
    return await retrieveById(userModel, userId);
  },
  deleteUserById = async (userId) => {
    return await deleteOne(userModel, { _id: userId });
  },
  deleteMultipleUsers = async (data) => {
    return await deleteMany(userModel, { _id: { $in: [...data] } });
  },
  retrieveUsers = async (filter, sort) => {
    return await retrieveMany(userModel, { ...filter }, { ...sort }, undefined);
  },
  retrieveUser = async (filter) => {
    return await retrieveOne(userModel, { ...filter });
  },
  updateUser = async (filter, data) => {
    return await updateOne(userModel, { ...filter }, { ...data });
  },
  upsertUser = async (filter, data) => {
    return await upsertOne(userModel, { ...filter }, { ...data });
  },
  modUpsertUser = async (filter, data) => {
    return await modUpsertOne(userModel, { ...filter }, { ...data });
  },
  suspendMultipleUsers = async (filter, data) => {
    return await updateMany(userModel, { ...filter }, { ...data });
  },
  userService = {
    createUser,
    retrieveUserByPhoneNo,
    retrieveUser,
    modUpsertUser,
    updateUser,
    upsertUser,
    retrieveUserById,
    retrieveUsers,
    deleteUserById,
    deleteMultipleUsers,
    suspendMultipleUsers,
  };

export default userService;
