import UserService from '../services/userService.js';

class UserController {
    async signUp(req, res) {
        try {
            const { email, password, firstName, lastName } = req.body;
            const user = await UserService.signUp(email, password, firstName, lastName);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserService.signIn(email, password);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new UserController();