import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class OrderService {
  constructor(private readonly stripeService: StripeService) {}

  async createOrder(orderData: any): Promise<any> {
    // Create a payment intent using Stripe
    const paymentIntent = await this.stripeService.createPaymentIntent(orderData.total, 'usd');

    // Save the order to the database (this is a placeholder, replace with actual implementation)
    const order = {
      ...orderData,
      paymentIntentId: paymentIntent.id,
    };

    return order;
  }
}
