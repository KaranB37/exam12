import {sequelize} from "../server.js";
import { DataTypes } from "sequelize";

const SubjectModel = sequelize.define("Subject", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true,
    },
    subjectName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    subjectCode:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    termWork:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:20
    },
    oral:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:25
    },
    practical:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:25
    },
    theory:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:80
    },
    semester:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default SubjectModel;