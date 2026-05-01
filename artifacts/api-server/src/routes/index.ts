import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import triageRouter from "./triage/index.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(triageRouter);

export default router;
