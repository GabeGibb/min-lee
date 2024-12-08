import express from "express";

const router = express.Router();

// Define your routes
router.get("/", (_, res) => {
	res.json({
		message: "API",
	});
});

// Create a parent router with a prefix
const parentRouter = express.Router(); // TODO: this should probably to files at an individual level
parentRouter.use("/test", router);

export default parentRouter;
