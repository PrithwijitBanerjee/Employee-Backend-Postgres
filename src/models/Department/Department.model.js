import { DataTypes } from 'sequelize';
import ProjHelpModel from '../ProjHelp/ProjHelp.model.js';
import { sequelize } from '../../../config/dbConfig.js';

const DepartmentModel = sequelize.define('Department', {
    DeptCode: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    DeptName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    DeptStat: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        references: {
            model: ProjHelpModel,
            key: 'code',
        }
    }
}, {
    tableName: 'department',
    timestamps: true
});

DepartmentModel.belongsTo(ProjHelpModel, {
    foreignKey: 'DeptStat',
    targetKey: 'code',
    as: 'status'
});

export default DepartmentModel;