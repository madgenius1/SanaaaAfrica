// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';

// // Initialize Stripe - ensure you have STRIPE_SECRET_KEY in .env.local
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
//   apiVersion: '2025-09-30.clover',
// });

// export async function POST(request: NextRequest) {
//   try {
//     const { items, customerInfo } = await request.json();

//     if (!items || items.length === 0) {
//       return NextResponse.json(
//         { error: 'No items in cart' },
//         { status: 400 }
//       );
//     }

//     // Create Stripe line items
//     const lineItems = items.map((item: any) => ({
//       price_data: {
//         currency: item.product.currency?.toLowerCase() || 'usd',
//         product_data: {
//           name: item.product.title,
//           description: item.product.shortDescription,
//           images: [item.product.images[0]?.url],
//           metadata: {
//             productId: item.product.id,
//             artisan: item.product.artisan?.name || 'Unknown',
//           },
//         },
//         unit_amount: Math.round(item.product.price * 100), // Convert to cents
//       },
//       quantity: item.quantity,
//     }));

//     // Add shipping if applicable
//     const subtotal = items.reduce(
//       (sum: number, item: any) => sum + item.product.price * item.quantity,
//       0
//     );
    
//     if (subtotal < 100) {
//       lineItems.push({
//         price_data: {
//           currency: 'usd',
//           product_data: {
//             name: 'Shipping',
//             description: 'Standard international shipping',
//           },
//           unit_amount: 1500, // $15.00 in cents
//         },
//         quantity: 1,
//       });
//     }

//     // Create Stripe Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/checkout`,
//       customer_email: customerInfo.email,
//       shipping_address_collection: {
//         allowed_countries: ['KE', 'UG', 'TZ', 'RW', 'US', 'GB', 'DE', 'FR', 'CA', 'AU'],
//       },
//       metadata: {
//         customerName: customerInfo.name,
//         customerPhone: customerInfo.phone,
//         customerAddress: customerInfo.address,
//         customerCity: customerInfo.city,
//         customerCountry: customerInfo.country,
//       },
//     });

//     return NextResponse.json({ 
//       sessionId: session.id, 
//       url: session.url 
//     });
//   } catch (error: any) {
//     console.error('Stripe checkout error:', error);
//     return NextResponse.json(
//       { error: error.message || 'Failed to create checkout session' },
//       { status: 500 }
//     );
//   }
// }