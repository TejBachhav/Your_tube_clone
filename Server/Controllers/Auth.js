// import dotenv from "dotenv";
// dotenv.config();
// import User from "../Models/Auth.js";
// // import jwt from "jsonwebtoken";

// export const login = async (req, res) => {
//   const { email } = req.body;
//   console.log("Login attempt for email:", email);
  
//   try {
//     const existingUser = await User.findOne({ email });
//     console.log("Found existing user:", existingUser);
    
//     if (!existingUser) {
//       try {
//         const newUser = await User.create({ email });
//         console.log("Created new user:", newUser);
//         const token = jwt.sign(
//           { email: newUser.email, id: newUser._id },
//           process.env.JWT_SECRET,
//           { expiresIn: "1h" }
//         );
//         return res.status(200).json({ result: newUser, token });
//       } catch (error) {
//         console.error("Error creating new user:", error);
//         return res.status(500).json({ message: "Something went wrong during user creation." });
//       }
//     } else {
//       try {
//         const token = jwt.sign(
//           { email: existingUser.email, id: existingUser._id },
//           process.env.JWT_SECRET,
//           { expiresIn: "1h" }
//         );
//         return res.status(200).json({ result: existingUser, token });
//       } catch (error) {
//         console.error("Error signing token:", error);
//         return res.status(500).json({ message: "Something went wrong during token signing." });
//       }
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ message: "Something went wrong during login." });
//   }
// };


import users from "../Models/Auth.js"
import jwt from "jsonwebtoken"
export const login = async (req, res) => {
    const { email } = req.body;
    // console.log(email)
    try {
        const extinguser = await users.findOne({ email })
        if (!extinguser) {
            try {
                const newuser = await users.create({ email });
                const token = jwt.sign({
                    email: newuser.email, id: newuser._id
                }, process.env.JWT_SECERT, {
                    expiresIn: "1h"
                }
                )
                res.status(200).json({ result: newuser, token })
            } catch (error) {
                res.status(500).json({ mess: "something went wrong..." })
                return
            }

        } else {
            const token = jwt.sign({
                email: extinguser.email, id: extinguser._id
            }, process.env.JWT_SECERT, {
                expiresIn: "1h"
            }
            )
            res.status(200).json({ result: extinguser ,token})
        }
    } catch (error) {
        res.status(500).json({ mess: "something went wrong..." })
        return
    }
}