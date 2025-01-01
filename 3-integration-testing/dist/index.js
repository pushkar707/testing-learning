"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const sumPostType = zod_1.default.object({
    a: zod_1.default.number(),
    b: zod_1.default.number(),
    operation: zod_1.default.enum(['ADD', 'MUL'])
});
exports.app.post('/sum', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedBody = sumPostType.safeParse(req.body);
    if (!parsedBody.success)
        return res.status(411).json({ message: 'Incorrect input types' });
    const { a, b, operation } = parsedBody.data;
    let answer = 0;
    if (operation === client_1.Operation.ADD)
        answer = a + b;
    else if (operation === client_1.Operation.MUL)
        answer = a * b;
    const response = yield db_1.prismaClient.request.create({
        data: {
            a,
            b,
            result: answer,
            operation
        }
    });
    return res.json({ answer, id: response.id });
}));
