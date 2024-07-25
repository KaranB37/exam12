import md5 from "md5";
import UserModel from "../models/User.js";

export const registerUser = async (req, res) => {
    try{
        let { email, password, firstName, lastName } = req.body
        const user = await UserModel.create({
            email,
            password: md5(password),
            firstName,
            lastName,
        })
        if (user){
            return res.status(201).json({message: `User ${firstName} created successfully`, user})
        }
    }
    catch(err){
        return res.status(500).json({err, message: "Internal Server Error"})
    }
}
