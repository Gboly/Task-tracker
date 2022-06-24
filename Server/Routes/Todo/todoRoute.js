import {Router} from "express"
import { home, getFormInput, updateCompleted, deleteOne, clearCompleted, refactor } from "../../Controllers/Todo/todoControllers.js"

const router = Router();

router.get("/home", home)

router.post("/getFormInput", getFormInput)

router.patch("/updateCompleted", updateCompleted)

router.delete("/delete", deleteOne)

router.delete("/clearCompleted", clearCompleted)

router.put("/refactor", refactor)


export default router;