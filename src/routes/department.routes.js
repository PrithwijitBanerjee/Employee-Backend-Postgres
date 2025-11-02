import express from "express";
import DepartmentController from "../controllers/Department/index.controller.js";
const DeptRouter = express.Router({
    caseSensitive: true,
});

DeptRouter

        .post("/add", DepartmentController.addNewDepartment)

        .get("/get", DepartmentController.getAllDepartments)

        .get("/getAllActiveDepartments", DepartmentController.getAllActiveDepartments)

        .delete("/delete/:code", DepartmentController.deleteDepartment)

        .all("/update/:code", DepartmentController.updateDepartment);


export default DeptRouter;