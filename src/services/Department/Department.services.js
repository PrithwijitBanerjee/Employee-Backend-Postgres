import DepartmentModel from "../../models/Department/Department.model.js";
import { getNextCode } from "../../utils/codeGenerator.js";
import ProjHelpModel from "../../models/ProjHelp/ProjHelp.model.js";

export const addDepartment = async departmentData => {
    try {
        // console.log("departmentData: ", departmentData);

        const newCode = await getNextCode(DepartmentModel, "DeptCode", 3);
        return await DepartmentModel.create({
            DeptCode: newCode,
            DeptName: departmentData?.DeptName,
            DeptStat: departmentData?.DeptStat,
        });
    } catch (error) {
        // console.log("error: ", error);
        throw new Error(error);
    }
};

export const fetchEntireDepartments = async () => {
    try {
        const departments = await DepartmentModel.findAll({
            include: {
                model: ProjHelpModel,
                as: "status",
                attributes: ["code", "data"],
            },
            order: [['createdAt', 'DESC']] // Optional: chronological order
        });
        return departments;
    } catch (error) {
        throw new Error(error);
    }
};

export const fetchActiveDepartments = async () => {
    try {
        const departments = await DepartmentModel.findAll({
            where: {
                DeptStat: "001",
            },
            include: {
                model: ProjHelpModel,
                as: "status",
                attributes: ["code", "data"],
            },
            order: [['createdAt', 'DESC']] // Optional: chronological order
        });
        return departments;
    } catch (error) {
        throw new Error(error);
    }
};


export const deleteDepartment = async DeptCode => {
    try {
        const department = await DepartmentModel.destroy({
            where: {
                DeptCode,
            },
            force: true,
        });
        return department;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateDepartmentByCode = async (DeptCode, DeptData) => {
    try {
        return await DepartmentModel.update({
            ...DeptData,
        }, {
            where: {
                DeptCode,
            }
        });
    } catch (error) {
        throw new Error(error);
    }
};

export const findDepartementByCode = async DeptCode => {
    try {
        return await DepartmentModel.findByPk(DeptCode);
    } catch (error) {
        throw new Error(error);
    }
}