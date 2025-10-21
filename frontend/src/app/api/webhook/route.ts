import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent succeeded:', paymentIntent.id);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log('Payment failed:', failedPayment.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout completed:', session.id);
  console.log('Customer email:', session.customer_email);
  console.log('Payment status:', session.payment_status);
  console.log('Amount total:', session.amount_total);

  // TODO: Implement order fulfillment logic
  // 1. Save order to database (Payload CMS or your DB)
  // 2. Send confirmation email to customer
  // 3. Notify admin/artisans
  // 4. Update inventory

  // Example: Send email notification (placeholder)
  if (session.customer_email) {
    await sendOrderConfirmationEmail({
      email: session.customer_email,
      sessionId: session.id,
      amount: (session.amount_total || 0) / 100,
      currency: session.currency || 'usd',
    });
  }

  return { success: true };
}

async function sendOrderConfirmationEmail(orderData: {
  email: string;
  sessionId: string;
  amount: number;
  currency: string;
}) {
  // TODO: Implement email sending with SendGrid, Mailgun, or similar
  // For now, just log it
  console.log('Sending confirmation email to:', orderData.email);
  console.log('Order details:', orderData);

  /* Example with SendGrid:
  
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: orderData.email,
    from: 'orders@sanaa-curios.com',
    subject: 'Order Confirmation - Sanaa African Curios',
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order #${orderData.sessionId} has been confirmed.</p>
      <p>Total: ${orderData.currency.toUpperCase()} ${orderData.amount.toFixed(2)}</p>
      <p>We'll send you another email when your items ship.</p>
    `,
  };

  await sgMail.send(msg);
  */

  return { sent: true };
}