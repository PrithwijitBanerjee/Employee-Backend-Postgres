import express from "express";
import ProjHelpRouter from "./projhelp.routes.js";
import DeptRouter from "./department.routes.js";

const RootRouter = express.Router({
    caseSensitive: true,
});

RootRouter

        /** ... All Project Help related routes ... **/
        .use("/projhelp", ProjHelpRouter)

        /** ... All Department related routes ... **/
        .use("/department", DeptRouter);



export default RootRouter;