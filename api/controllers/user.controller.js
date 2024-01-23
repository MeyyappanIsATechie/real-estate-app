import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test =(req,res) => {
    res.json({
        message: 'Hello World!',
    });
};

export const updateUser = async (req,res, next) => {
if(req.user.id !== req.params.id) return next(errorHandler(401, "You can only update your own account"));

try {
    if(req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        //$set: req.body wrong, since it can lead to injections in form
         $set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
         }
    }, {new: true})

    const {password, ...rest} = updatedUser._doc;

    res.status(200).json(rest);
} catch (error) {
    next(error)
}
}

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, "You can delete your account only!"));

    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token'); //clear cookie and response
        res.status(200).json('User has been deleted');

    } catch (error) {
        next(error);
    }
}