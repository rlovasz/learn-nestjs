import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import RegisterDto from './dto/register.dto';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import ResponseUserDto from '../users/dto/responseUser.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('authentication')
@ApiTags('Authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  @ApiOperation({ summary: 'Sign up with a new user' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const responseUser: ResponseUserDto = {
      id: request.user.id,
      email: request.user.email,
      name: request.user.name,
      address: request.user.address,
    };
    const cookie = this.authenticationService.getCookieWithJwtToken(
      responseUser.id,
    );
    response.setHeader('Set-Cookie', cookie);
    return response.send(responseUser);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const responseUser: ResponseUserDto = {
      id: request.user.id,
      email: request.user.email,
      name: request.user.name,
      address: request.user.address,
    };
    return responseUser;
  }
}
