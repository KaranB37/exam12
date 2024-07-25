import md5 from "md5";
import UserModel from "../models/User.js";

export const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({where: {email, password: md5(password)}})
        if (user){
            return res.status(200).json({user})
        }else{
            return res.status(401).json({message: "User Unauthorized!!!"});
        }
    }catch(err){
        return res.status(500).json({err})
    }
}