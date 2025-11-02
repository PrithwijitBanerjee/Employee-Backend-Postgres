import { addNewDepartment, deleteDepartment, getAllActiveDepartments, getAllDepartments, updateDepartment } from "./Department.controller.js";

const DepartmentController = {
    addNewDepartment,
    getAllDepartments,
    getAllActiveDepartments,
    deleteDepartment,
    updateDepartment,
};

export default DepartmentController;