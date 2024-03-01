import { Request, Response, Router } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.sendFile('./client/index.html', { root: __dirname + "../../" });
})

export default router;