import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body, @Res() res) {
    const { email, password } = body;
    try {
      const result = await this.authService.login(email, password);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    try {
      await this.authService.logout();
      return res.status(HttpStatus.OK).json({ message: 'Logged out successfully' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
