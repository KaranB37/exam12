import {sequelize} from "../server.js";
import { DataTypes } from "sequelize";

const UserModel = sequelize.define("User", {
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default UserModel;