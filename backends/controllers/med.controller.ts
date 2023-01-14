import Joi from 'joi';
import { NextApiRequest, NextApiResponse } from 'next';
import mongooseService from '../services/mongoose.service';
import { medService, MedService } from '../services/med.service';
import { medType } from '../types/med.type';
import { AuthService, authService } from '../services/auth.service';

const AddMedValidation = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    expiryDate: Joi.string(),
});
let medList: medType[] = [];
class TodoController {
    constructor(
        private medService: MedService,
        private authService: AuthService
    ) 
    {
        mongooseService;
    }

    addMedicine = async (req: NextApiRequest, res: NextApiResponse) => {
        // { title , desc , date}
        const token = req.headers.authorization;

        if (token) {
            const verified = (await this.authService.verifyToken(token))!;
            const { error, value } = AddMedValidation.validate(req.body);
            const updatedValue = { email: verified.email, ...value };
            if (verified) {
                if (error)
                    return res.status(400).json({ message: error.message });
                const medList = await this.medService.addMed(updatedValue);
                res.json(medList);
            } else {
                res.json({
                    message: 'Invalid Token!!!',
                });
            }
        } else {
            res.json({
                message: 'No Token Found!!!',
            });
        }
    };
}

    // show list
    //   getmyList (email
    


export const todoController = new TodoController(medService, authService);