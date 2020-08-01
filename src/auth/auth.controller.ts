import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredencialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.singUp(authCredencialsDto);
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredencialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredencialsDto);
    }

}