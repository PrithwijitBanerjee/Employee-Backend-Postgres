import express from "express";
import { errorResponseHandler, successResponseHandler } from "./src/utils/response.js";
import AllStatusCodes from "./src/utils/allStatusCodes.js";
import CreateError from "http-errors";
import config from "./config/config.js";
import RootRouter from "./src/routes/index.routes.js";
import Cors from "cors";

const app = express();

app.use(Cors({
    origin: "*",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** ... Basic Landing Page ... **/
app.get("/", (_, res) => {
    successResponseHandler(res, {
        status: AllStatusCodes.OK,
        message: "Welcome to rest api ....",
    });
});

app.use(config.app.apiUrl, RootRouter);

/** ... Handle Route Not Found Error ... **/
app.use((req, res, next) => {
    next(CreateError(AllStatusCodes.NotFound, `This route does not exist!!!`));
});

/** ... Handle Error handling middleware ... **/
app.use((error, req, res, next) => {
    if (res.headersSent) {
        next(error); // Delegate to express default error handling middleware ...
    } else {
        errorResponseHandler(res, {
            status: error?.status,
            message: error?.message,
        })
    }
});

export default app;