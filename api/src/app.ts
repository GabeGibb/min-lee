import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
import handlers from "./handlers";

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({
		message: "API Up and Running",
	});
});

app.use("/api/v1", handlers);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;