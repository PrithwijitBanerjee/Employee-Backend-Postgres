import ProjHelpModel from "../../models/ProjHelp/ProjHelp.model.js";
import { getNextCode } from "../../utils/codeGenerator.js";

export const addProject = async projectData => {
    try {
        const newCode = await getNextCode(ProjHelpModel, 'code', 3);
        return await ProjHelpModel.create({ data: projectData?.data, code: newCode, tag: projectData?.tag });
    } catch (error) {
        throw new Error(error);
    }
};


export const getProjectByTag = async tag => {
   try {
     const projects = await ProjHelpModel.findAll({where: {tag}});
     return projects;
   } catch (error) {
     throw new Error(error);
   }
};