
// controllers/userController.js

import BaseError from "../errors/baseError";
import UserService from '../services/userService.js';
import BaseController from "./baseController.js";
import userService from "../services/userService.js";

class UserController extends BaseController {
    constructor() {
        super(userService);
    }
}

export default new UserController();