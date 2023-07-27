const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { Enums } = require('../utils/common');
const AppError = require('../utils/errors/app-error');


function validateCreateRequest(req, res, next) {
    error_explaination = [];

    if(!req.body.task_title){
        error_explaination.push('Task title not found in the oncoming request in the correct form');
    }
    if(!req.body.task_description){
        error_explaination.push('Task description not found in the oncoming request in the correct form');
    }
    if(req.body.id){
        error_explaination.push('User cannot define the id of the task');
    }
    if(req.body.flag && !(req.body.flag in Enums.FLAG_TYPES)){
        error_explaination.push('Invalid flag value in the oncoming request');
    }
    if(error_explaination.length > 0){
        ErrorResponse.message = 'Something went wrong while creating the task';
        ErrorResponse.error = new AppError(error_explaination, StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req,res,next){
    const allowedFields = ['task_title', 'task_description','flag'];
    let error_explaination = [];
    if(req.body.flag && !(req.body.flag in Enums.FLAG_TYPES)){
        error_explaination.push('Invalid flag value in the oncoming request');
    }
    if(req.body.id){
        error_explaination.push('User cannot define the id of the task');
    }
    const extraFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));
    if(extraFields.length > 0){
        error_explaination.push(`Invalid fields found in the oncoming request: ${extraFields.join(', ')}`);
    }
    if(error_explaination.length > 0){
        ErrorResponse.message = 'Something went wrong while creating the task';
        ErrorResponse.error = new AppError(error_explaination, StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}