"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerConfig_1 = require("../swagger/swaggerConfig");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
mongoose_1.default.connect('mongodb://localhost:27017/my_expense_db', {});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
app.use('/api-docs', swaggerConfig_1.swaggerUi.serve, swaggerConfig_1.swaggerUi.setup(swaggerConfig_1.specs));
// Other middleware...
// Include your routes
const expenseRoutes_1 = __importDefault(require("../src/routes/expenseRoutes"));
app.use('/api', expenseRoutes_1.default);
