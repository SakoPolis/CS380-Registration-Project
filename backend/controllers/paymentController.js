
// controllers/PaymentController.js

import BaseController  from "./baseController.js";
import paymentService  from "../services/paymentService.js";

class PaymentController extends BaseController {
    constructor() {
        super(paymentService);
    }
}

export default new PaymentController();
