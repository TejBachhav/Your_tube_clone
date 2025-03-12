import users from "../Models/Auth.js";

export const getUserEmail = async (userId) => {
  try {
    // Find the user by ID and only select the email field
    const user = await users.findById(userId, "email");
    return user ? user.email : null;
  } catch (error) {
    console.error("Error fetching user email:", error);
    throw error;
  }
};
