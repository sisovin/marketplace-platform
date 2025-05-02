import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(private readonly jwtService: JwtService) {
    this.supabase = new SupabaseClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
  }

  async login(email: string, password: string): Promise<any> {
    const { user, error } = await this.supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  }
}
