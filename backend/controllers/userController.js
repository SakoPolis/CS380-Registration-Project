
// controllers/userController.js

import BaseController from "./baseController.js";
import userService from "../services/userService.js";

class UserController extends BaseController {
    constructor() {
        super(userService);
    }
}

export default new UserController();