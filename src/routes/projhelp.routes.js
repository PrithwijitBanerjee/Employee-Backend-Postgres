import express from "express";
import ProjHelpController from "../controllers/ProjHelp/index.controller.js";

const ProjHelpRouter = express.Router({
    caseSensitive: true,
});

ProjHelpRouter

        .post("/add", ProjHelpController.addProjectHelp)

        .get("/get/:tag", ProjHelpController.getProjectHelpByTag);

export default ProjHelpRouter;