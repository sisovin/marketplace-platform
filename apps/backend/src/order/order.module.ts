import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SupabaseModule } from '../supabase/supabase.module';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [SupabaseModule, StripeModule],
  providers: [OrderService],
  controllers: [OrderController],
  imports: [StripeModule],
})
export class OrderModule {}
