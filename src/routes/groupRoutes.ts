import express from 'express';
const groupRouter = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Group
 *     description: Operations related to Group
 * paths:
 *   /api/group:
 *     get:
 *       summary: Get all the Group
 *       description: Retrieve a list of all group
 *       tags:
 *         - Group
 *       responses:
 *         '200':
 *           description: Successful response
 *           content:
 *             application/json:
 *               example:
 *                 message: Group retrieved successfully
 */
groupRouter.get('/group',(req,res) => {
    res.send("group created")
})
export default groupRouter