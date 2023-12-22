import express from 'express';
const userRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operations related to User
 * paths:
 *   /api/user:
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
 */
userRouter.get("/login",(req,res)=>{

    res.send("Login successfull")
})
export default userRouter;