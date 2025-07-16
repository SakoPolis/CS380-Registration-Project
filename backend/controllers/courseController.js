
// controllers/courseController.js

import BaseController from "../services/baseController.js";
import * as courseService from "../services/courseService.js";

class CourseController extends BaseController {
    constructor() {
        super(courseService);
    }
}

export default new CourseController();