import payload from 'payload';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const seed = async () => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
      mongoURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/sanaa',
      local: true,
    });

    console.log('🌱 Starting seed...');

    // Create admin user
    const adminEmail = 'admin@sanaa.com';
    const existingAdmin = await payload.find({
      collection: 'users',
      where: { email: { equals: adminEmail } },
    });

    if (existingAdmin.docs.length === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: adminEmail,
          password: 'password123', // CHANGE THIS IN PRODUCTION
          name: 'Admin User',
        },
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create sample artisans
    const artisan1 = await payload.create({
      collection: 'artisans',
      data: {
        name: 'Grace Mwangi',
        slug: 'grace-mwangi',
        location: 'Nairobi, Kenya',
        bio: 'Master beadwork artisan with over 20 years of experience creating traditional Maasai jewelry.',
        story: '<p>Grace learned the art of beadwork from her grandmother in rural Kenya. Today, she employs 15 women in her cooperative, preserving traditional techniques while creating contemporary designs.</p>',
        featured: true,
      },
    });

    const artisan2 = await payload.create({
      collection: 'artisans',
      data: {
        name: 'Samuel Ochieng',
        slug: 'samuel-ochieng',
        location: 'Kisumu, Kenya',
        bio: 'Third-generation woodcarver specializing in East African wildlife sculptures and ceremonial masks.',
        story: '<p>Samuel comes from a long line of woodcarvers. His intricate animal carvings have been featured in galleries across Africa and Europe.</p>',
        featured: true,
      },
    });

    console.log('✅ Artisans created');

    // Create collections
    const collection1 = await payload.create({
      collection: 'collections',
      data: {
        title: 'Maasai Heritage',
        slug: 'maasai-heritage',
        description: 'Traditional Maasai beadwork and jewelry, each piece a vibrant celebration of culture.',
      },
    });

    const collection2 = await payload.create({
      collection: 'collections',
      data: {
        title: 'Contemporary Africa',
        slug: 'contemporary-africa',
        description: 'Modern interpretations of traditional crafts, bridging heritage and contemporary design.',
      },
    });

    console.log('✅ Collections created');

    // Create sample products
    await payload.create({
      collection: 'products',
      data: {
        title: 'Maasai Beaded Necklace',
        slug: 'maasai-beaded-necklace',
        price_cents: 4500,
        currency: 'USD',
        description: 'Handcrafted traditional Maasai beaded necklace featuring vibrant geometric patterns. Each bead is carefully selected and strung by hand.',
        backstory: '<p>This necklace represents the rich heritage of the Maasai people. The colors and patterns tell stories of bravery, unity, and celebration. Grace meticulously crafts each piece, ensuring every bead aligns perfectly to create the iconic circular collar.</p><p>The red beads symbolize warrior strength, while the blue represents the sky and energy. White beads signify purity and health.</p>',
        materials: 'Glass beads, leather cord, brass findings',
        dimensions: '18" diameter, adjustable',
        stock: 5,
        sku: 'MBN-001',
        artisan: artisan1.id,
        collections: [collection1.id],
        featured: true,
        public: true,
        seoTitle: 'Handmade Maasai Beaded Necklace - Traditional Kenyan Jewelry',
        seoDescription: 'Authentic Maasai beaded necklace handcrafted by Grace Mwangi in Kenya. Traditional geometric patterns in vibrant colors. Fair trade certified.',
      },
    });

    await payload.create({
      collection: 'products',
      data: {
        title: 'Kikuyu Woven Basket',
        slug: 'kikuyu-woven-basket',
        price_cents: 6800,
        currency: 'USD',
        description: 'Traditional Kikuyu basket woven from sisal and natural dyes. Perfect for storage or as a striking wall decoration.',
        backstory: '<p>Basket weaving is an ancient Kikuyu tradition passed down through generations of women. This particular design features the iconic zigzag pattern that represents the journey of life - with its ups and downs, twists and turns.</p><p>The natural sisal is hand-dyed using bark, roots, and leaves, creating earth-toned hues that will never fade.</p>',
        materials: 'Sisal fiber, natural plant dyes',
        dimensions: '14" diameter x 10" height',
        stock: 3,
        sku: 'KWB-002',
        artisan: artisan1.id,
        collections: [collection2.id],
        featured: true,
        public: true,
      },
    });

    await payload.create({
      collection: 'products',
      data: {
        title: 'Hand-Carved Elephant Sculpture',
        slug: 'hand-carved-elephant-sculpture',
        price_cents: 12500,
        currency: 'USD',
        description: 'Exquisite hand-carved elephant sculpture from sustainably sourced African hardwood. A masterpiece of traditional woodcarving.',
        backstory: '<p>Samuel spent three weeks carving this majestic elephant from a single piece of mpingo (African blackwood). Every detail - from the wrinkled trunk to the intelligent eyes - is rendered with incredible precision.</p><p>In East African culture, the elephant symbolizes wisdom, strength, and good fortune. This sculpture captures the gentle power of these magnificent creatures.</p>',
        materials: 'Mpingo wood (African blackwood), beeswax finish',
        dimensions: '12" height x 14" length x 6" width',
        stock: 1,
        sku: 'HCE-003',
        artisan: artisan2.id,
        collections: [collection2.id],
        featured: true,
        public: true,
      },
    });

    console.log('✅ Products created');

    // Create testimonials
    await payload.create({
      collection: 'testimonials',
      data: {
        name: 'Sarah Mitchell',
        relation: 'Interior Designer, NYC',
        quote: 'The craftsmanship is absolutely stunning. Each piece I\'ve purchased has become a conversation starter in my designs. Knowing I\'m supporting artisans makes it even more special.',
      },
    });

    await payload.create({
      collection: 'testimonials',
      data: {
        name: 'David Chen',
        relation: 'Collector',
        quote: 'Sanaa African Curios connects you directly with the artists and their stories. The quality is museum-grade, and the fair trade practices are transparent and ethical.',
      },
    });

    console.log('✅ Testimonials created');

    // Create settings
    await payload.updateGlobal({
      slug: 'settings',
      data: {
        siteName: 'Sanaa African Curios',
        defaultCurrency: 'USD',
        socialHandles: {
          instagram: '@sanaaafricancurios',
          facebook: 'sanaaafricancurios',
          twitter: '@sanaa_curios',
        },
        heroContent: {
          headline: 'Handcrafted African Treasures',
          subheadline: 'Every piece tells a story. Every purchase changes a life.',
          ctaText: 'Explore Collection',
        },
        featuredCollections: [collection1.id, collection2.id],
      },
    });

    console.log('✅ Settings configured');
    console.log('\n🎉 Seed completed successfully!');
    console.log('\nLogin credentials:');
    console.log('Email: admin@sanaa.com');
    console.log('Password: password123');
    console.log('\n⚠️  IMPORTANT: Change the admin password in production!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seed();