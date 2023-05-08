import express from 'express';
import { createUser, getUserByUsername } from '../database/users';
import {random, authentication} from '../helpers/index'

export const login = async (req: express.Request, res: express.Response) => {
    try{
        const { username, password } = req.body;

        if(!username || !password){
           return res.status(400).json({message: 'wrong username or password'})
        }

        const user = await getUserByUsername(username).select('+authentication.salt +authentication.password');

        if(!user){
            return res.status(400).json({message: 'user not found'});
        }

        const expectedHash = authentication(user.authentication.salt, password) 

        if(user.authentication.password !== expectedHash) {
            return res.status(403).json({message: 'wrong password'})
        }

        const salt = random()
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        await user.save();

        res.cookie('DOMAIN-AUTH', user.authentication.sessionToken, {domain: 'localhost', path:'/'})
        
        return res.status(200).json({message: 'Login successful'}).end();
    }   catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const {name, username, email, password} = req.body;

        if(!name || !username || !email || !password){
            return res.sendStatus(400)
        }

        const existingUser = await getUserByUsername(username)

        if(existingUser) {
            return res.sendStatus(400)
        }

        const salt = random()
        const user = await createUser({
            name,
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();

    }catch (error) {
     console.log(error);
     return res.sendStatus(500);
    }
}