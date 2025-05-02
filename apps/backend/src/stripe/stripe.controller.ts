import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-customer')
  async createCustomer(@Body() body, @Res() res) {
    const { email } = body;
    try {
      const customer = await this.stripeService.createCustomer(email);
      return res.status(HttpStatus.CREATED).json(customer);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body, @Res() res) {
    const { amount, currency } = body;
    try {
      const paymentIntent = await this.stripeService.createPaymentIntent(amount, currency);
      return res.status(HttpStatus.CREATED).json(paymentIntent);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }

  @Post('webhook')
  async webhook(@Req() req, @Res() res) {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = this.stripeService.constructEvent(req.rawBody, sig);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
    }

    try {
      await this.stripeService.handleWebhook(event);
      return res.status(HttpStatus.OK).json({ received: true });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}
