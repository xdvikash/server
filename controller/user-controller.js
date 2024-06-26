import User from '../model/user.js';
import bcyrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../model/model.js';

dotenv.config();

export const signupUser = async (request, response) => {
    try{
        //const salt = await bcyrpt.genSalt();
        const hashedPassword = await bcyrpt.hash(request.body.password,10);
        const user = {username: request.body.username,name: request.body.name,password: hashedPassword}
        const newUser = new User(user);
        await newUser.save();
        return response.status(200).json({message: 'SignUp Successfully!!'})
    } catch (error) {
        return response.status(500).json({message: 'error while signup the user!!!'})
    }
}

export const loginUser = async(request, response) => {
    let user = await User.findOne({username: request.body.username});
    if (!user) {
        return response.status(400).json({message: 'Username does not exist'});
    }
    try {
        let match = await bcyrpt.compare(request.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'});
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({token: refreshToken});
            await newToken.save();
            return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username});
        }else {
           return response.status(400).json({message: 'passowrd does not exist'});
        }
    } catch (error) {
        return response.status(500).json({message: 'Error While login in user..!!!'})
    }
}