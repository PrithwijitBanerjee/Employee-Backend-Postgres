import createError from "http-errors";
import AllStatusCodes from "../../utils/allStatusCodes.js";
import departmentSchema from "../../validation/department.validation.js";
import DepartmentServices from "../../services/Department/index.services.js";
import { successResponseHandler } from "../../utils/response.js";

export const addNewDepartment = async (req, res, next) => {
    try {
        const { error, value } = departmentSchema.validate(req.body);
        if (error) {
            return next(AllStatusCodes.BadRequest, `Validation Error!!!, ${error?.details}`);
        }
        // console.log("value: ", value);

        const addedDepartment = await DepartmentServices.addDepartment(value);
        if (!addedDepartment) {
            return next(createError(AllStatusCodes.BadRequest, "Something went wrong!!! Can not add department data!!!"));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.Created,
            message: "Department has been added successfully",
            payload: {
                ...addedDepartment?.dataValues,
            },
        });
    } catch (error) {
        if (err instanceof Sequelize.UniqueConstraintError) {
            return next(AllStatusCodes.Conflict, "Department already exist!!!");
        }
        next(createError(AllStatusCodes.InternalServerError, error));
    }
};

export const getAllDepartments = async (_, res, next) => {
    try {
        const departments = await DepartmentServices.fetchEntireDepartments();
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: "Departments has been fetched successfully",
            payload: {
                departments,
            },
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error));

    }
};

export const getAllActiveDepartments = async (_, res, next) => {
    try {
        const departments = await DepartmentServices.fetchActiveDepartments();
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: "Departments has been fetched successfully",
            payload: {
                departments,
            },
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error));

    }
};

export const deleteDepartment = async (req, res, next) => {
    try {
        const { code } = req.params;
        const department = await DepartmentServices.deleteDepartment(code);
        if (!department) {
            return next(createError(AllStatusCodes.NotFound, `Deletion failed!!!, Department of given code: ${code} does not exist!!!`));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: "Departments has been deleted successfully",
            payload: {
                 department: await DepartmentServices.findDepartementByCode(code),
            },
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error));
    }
};

export const updateDepartment = async (req, res, next) => {
    try {
        if (req.method !== "PUT" && req.method !== "PATCH") {
            return next(createError(AllStatusCodes.MethodNotAllowed, `Updation failed!!! ${req.method} method not allowed!!!`));
        }
        const { code } = req.params;
        const department = await DepartmentServices.updateDepartmentByCode(code, req.body);
        //   console.log(department);
        if (!department?.[0]) {
            return next(createError(AllStatusCodes.NotFound, `Updation failed!!!, Department of given code: ${code} does not exist!!!`));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: "Departments has been updated successfully",
            payload: {
                department: await DepartmentServices.findDepartementByCode(code),
            },
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error));
    }
};