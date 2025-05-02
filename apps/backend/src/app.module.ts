import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    AuthModule,
    VendorModule,
    ProductModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SupabaseModule,
    StripeModule,
  ],
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [AuthModule, VendorModule, ProductModule, OrderModule, StripeModule],
})
export class AppModule {}
