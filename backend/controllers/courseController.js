
// controllers/courseController.js

import baseController from "./baseController.js";
import courseService  from "../services/courseService.js";

class courseController extends baseController {
    constructor() {
        super(courseService);
    }
}

export default new courseController();
