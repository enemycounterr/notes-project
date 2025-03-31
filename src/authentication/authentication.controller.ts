import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards, Req, Res } from '@nestjs/common';
import  {AuthenticationService}  from './authentication.service';
import { RegisterDTO } from './dto/register.dto';
import { LogInDto } from './dto/logIn.dto';
import { log } from 'console';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post("/register")
  create(@Body() register: RegisterDTO) {
    console.log(register);
    return this.authenticationService.register(register);
  }

 
  @Get()
  @UseGuards(JwtAuthenticationGuard)
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = '';
    return user;
  }

  @Post("/auth")
  auth(@Body() logIn: LogInDto) {
    console.log(logIn);
    const { email, password } = logIn;
    return this.authenticationService.getAuthenticatedUser(email, password);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('/log-in')
  @ApiOperation({ summary: 'Log in and get JWT token' }) // Description of the operation
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully and JWT token set in cookie.',
    schema: {
      example: {
        email: 'first@email.com',
        password: '123', // Password should not be returned
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials.',
  })
  async logIn(@Req() request: RequestWithUser, @Res() response: Response ) {
    const user = request.user;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id!);
    response.setHeader('Set-Cookie', cookie);
    user.password = '';
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  // @Get()
  // findAll() {
  //   return this.authenticationService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authenticationService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthenticationDto: UpdateAuthenticationDto) {
  //   return this.authenticationService.update(+id, updateAuthenticationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authenticationService.remove(+id);
  // }
}
