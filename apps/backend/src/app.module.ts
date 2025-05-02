import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { VendorModule } from './vendor/vendor.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, VendorModule, ProductModule, OrderModule],
})
export class AppModule {}
