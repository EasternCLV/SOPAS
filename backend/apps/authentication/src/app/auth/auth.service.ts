import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcryptjs"
import { ERRORS_DICTIONARY } from '@backend/shared';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user){
            throw new BadRequestException({
                message: ERRORS_DICTIONARY.USER_NOT_FOUND,
                details: 'User Not Found!!',
            }) 
        }
        if (await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }else{
            throw new BadRequestException({
                message: ERRORS_DICTIONARY.WRONG_CREDENTIALS,
                details: 'Wrong credentials!!',
            })
        }
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        const payload = { email: user.email, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload, {

                secret: process.env.SECRET_KEY,
                expiresIn: '1h',
            }),
        };
    }
}
