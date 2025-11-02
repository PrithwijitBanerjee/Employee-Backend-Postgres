import createError from "http-errors";
import AllStatusCodes from "../../utils/allStatusCodes.js";
import projHelpSchema from "../../validation/projecthelp.validation.js";
import ProjHelpServices from "../../services/ProjHelp/index.services.js";
import { successResponseHandler } from "../../utils/response.js";

export const addProjectHelp = async (req, res, next) => {
    try {
        const { error, value } = projHelpSchema.validate(req.body);
        if (error) {
            return next(createError(AllStatusCodes.BadRequest, `Validation Error!!!, ${error?.details}`));
        }
        const addedProjectData = await ProjHelpServices.addProject(value);
        if (!addedProjectData) {
            return next(createError(AllStatusCodes.BadRequest, "Something went wrong!!! Can not add projecthelp data"));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.Created,
            message: "ProjectHelp data has been added successfully",
            payload: {
                ...addedProjectData?.dataValues,
            }
        });

    } catch (error) {
        if (err instanceof Sequelize.UniqueConstraintError) {
            return next(AllStatusCodes.Conflict, "Code already exist!!!");
        }
        next(createError(AllStatusCodes.InternalServerError, error));
    }
};

export const getProjectHelpByTag = async (req, res, next) => {
    try {
        const { tag } = req.params;
        const projects = await ProjHelpServices.getProjectByTag(tag);
        if (!projects || !projects?.length) {
            return next(createError(AllStatusCodes.NotFound, "No project data found of given tag!!!"));
        }
        successResponseHandler(res, {
            status: AllStatusCodes.OK,
            message: "ProjectHelp has been fetched successfully",
            payload: {
                projects,
            }
        });
    } catch (error) {
        next(createError(AllStatusCodes.InternalServerError, error));
    }
};