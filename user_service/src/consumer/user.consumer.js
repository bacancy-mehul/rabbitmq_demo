import User from "../models/user.model";

export const deleteUser = async (userData) => {
  try {
    let { _id } = userData;
    console.log(_id);
    await User.findByIdAndDelete(_id);
  } catch (error) {
    console.error(error);
  }
};

