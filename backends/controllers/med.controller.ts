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
    ) {
        mongooseService;
    }

    // show list
    //   getmyList (email
    
}

export const todoController = new TodoController(medService, authService);