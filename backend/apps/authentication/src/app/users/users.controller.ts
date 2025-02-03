import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
      ) {}
    
      @Post('register')
      async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
      }
    
      @Post('login')
      async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
      }
    
      @UseGuards(JwtAuthGuard)
      @Get('profile')
      async getProfile(@Req() req) {
        return req.user;
      }
    
      @UseGuards(JwtAuthGuard)
      @Patch('profile')
      async updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
        const user = req.user;
        await this.usersService.update(user.id, updateUserDto);
        return this.usersService.findOneByEmail(user.email);
      }
    
      @UseGuards(JwtAuthGuard)
      @Delete('profile')
      async deleteProfile(@Req() req) {
        const user = req.user;
        await this.usersService.remove(user.id);
      }
}
