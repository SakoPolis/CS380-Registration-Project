
// controllers/userController.js

import UserService from "../services/userService.js";

class UserController {

    async signUp(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const user = await UserService.signUp(email, password);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const session = await UserService.signIn(email, password);
            res.status(200).json(session);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
