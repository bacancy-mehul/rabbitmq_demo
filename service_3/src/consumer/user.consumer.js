import Register from "../models/register.model";

export const registerUser = async (userData) => {
  try {
    let { name, email, _id } = userData;
    let user = { student_name: name, student_email: email, student_id: _id };
    await Register.create(user);
  } catch (error) {
    console.error(error);
  }
};
