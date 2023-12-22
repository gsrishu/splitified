import express from 'express';
const userRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to User
 * paths:
 *   /api/login:
 *     get:
 *       summary: Get one user
 *       description: Retrieve a user
 *       tags:
 *         - User
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: User retrieved successfully
 *   /api/signup:
 *     post:
 *       summary: Create a new user
 *       description: Register a new user
 *       tags:
 *         - User
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: User created successfully
 */

userRouter.get("/login",(req,res)=>{

    res.send("Login successfull")
})
userRouter.post("/signup",(req,res)=>{
    res.send("signup")
})
export default userRouter;