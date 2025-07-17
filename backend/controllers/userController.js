
// controllers/userController.js

import baseController from "./baseController.js";
import userService from "../services/userService.js";

class userController extends baseController {
    constructor() {
        super(userService);
    }
}

export default new userController();