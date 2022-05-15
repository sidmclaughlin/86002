import { Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { PublicRoute } from 'src/authentication/decorators/public-route.decorator';
import { LoginGuard } from 'src/authentication/guards/login.guard';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthenticationController {
  @Post('login')
  @PublicRoute()
  @UseGuards(LoginGuard)
  @HttpCode(200)
  login(@Req() request: Request) {
    return request.user;
  }

  @Get('profile')
  getProfile(@Req() request: Request) {
    return request.user;
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Req() request: Request) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }
}
