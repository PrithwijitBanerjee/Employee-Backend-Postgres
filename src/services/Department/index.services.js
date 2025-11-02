import { addDepartment, deleteDepartment, fetchActiveDepartments, fetchEntireDepartments, findDepartementByCode, updateDepartmentByCode } from "./Department.services.js";

const DepartmentServices = {
    addDepartment,
    fetchEntireDepartments,
    deleteDepartment,
    fetchActiveDepartments,
    updateDepartmentByCode,
    findDepartementByCode,
};

export default DepartmentServices;