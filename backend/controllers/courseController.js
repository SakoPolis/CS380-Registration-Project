
// controllers/courseController.js

import BaseController from "./baseController.js";
import courseService  from "../services/courseService.js";

class CourseController extends BaseController {
    constructor() {
        super(courseService);
    }
}

export default new CourseController();
