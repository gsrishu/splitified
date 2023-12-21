"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Get all expenses
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/expenses', (req, res) => {
    // Controller logic...
    res.send('Get all expenses');
});
exports.default = router;
