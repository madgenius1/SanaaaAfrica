export default function ImpactStats() {
  const stats = [
    { value: '200+', label: 'Artisans Supported' },
    { value: '15', label: 'Communities Reached' },
    { value: '10K+', label: 'Products Crafted' },
    { value: '100%', label: 'Fair Trade' },
  ];

  return (
    <section className="bg-sage text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-heading-1 text-center mb-4 font-serif">
          Our Impact
        </h2>
        <p className="text-center text-xl mb-12 max-w-2xl mx-auto text-ivory/90">
          Every purchase directly supports Kenyan artisans and their families, 
          preserving traditional crafts for future generations.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-5xl md:text-6xl font-bold mb-2 font-serif">
                {stat.value}
              </div>
              <div className="text-lg text-ivory/90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}