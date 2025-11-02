import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/dbConfig.js";

const ProjHelpModel = sequelize.define('ProjHelp', {
    code: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    data: {
        type: DataTypes.STRING(50),
        allowNull: false,
        
    },
    tag: {
        type: DataTypes.CHAR(2),
        allowNull: false
    }
}, {
    tableName: 'projhelp', // we are explicitly tell sequelize the table name ....
    timestamps: true,
});

export default ProjHelpModel;