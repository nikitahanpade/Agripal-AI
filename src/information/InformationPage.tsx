
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, CalendarDays, FlaskConical, Sprout,
  Droplets, Bug, TrendingUp, Landmark, Tractor,
  CheckCircle2, Lightbulb
} from 'lucide-react';

const guides = {
  'crop-calendar': {
    title: 'Crop Calendar',
    subtitle: 'Plan your farming activities according to the season.',
    icon: CalendarDays,
    intro: 'A crop calendar helps farmers decide when to prepare the soil, sow seeds, manage crops and harvest produce.',
    sections: [
      { title: 'Kharif Season (June–October)', items: ['Rice', 'Maize', 'Soybean', 'Cotton', 'Groundnut'] },
      { title: 'Rabi Season (October–March)', items: ['Wheat', 'Gram', 'Mustard', 'Jowar', 'Peas'] },
      { title: 'Summer Season (March–June)', items: ['Watermelon', 'Muskmelon', 'Cucumber', 'Green Gram'] }
    ],
    tips: ['Check local rainfall before sowing.', 'Choose crop varieties suitable for your region.', 'Follow recommended sowing dates from local agriculture experts.']
  },
  'soil-health': {
    title: 'Soil Health Guide',
    subtitle: 'Understand your soil and improve its fertility.',
    icon: FlaskConical,
    intro: 'Healthy soil provides essential nutrients, water and support for plant growth. Soil testing helps farmers understand their soil condition.',
    sections: [
      { title: 'Common Soil Types', items: ['Black Soil', 'Red Soil', 'Alluvial Soil', 'Laterite Soil', 'Sandy Soil'] },
      { title: 'Important Soil Parameters', items: ['Soil pH', 'Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'Organic Carbon'] }
    ],
    tips: ['Get your soil tested periodically.', 'Add organic matter when recommended.', 'Avoid excessive fertilizer application.']
  },
  'fertilizer-guide': {
    title: 'Fertilizer Guide',
    subtitle: 'Learn about nutrients and responsible fertilizer use.',
    icon: Sprout,
    intro: 'Fertilizers provide nutrients required for plant growth. Their selection and quantity should depend on soil test results and crop requirements.',
    sections: [
      { title: 'Primary Nutrients', items: ['Nitrogen – supports leaf growth', 'Phosphorus – supports root development', 'Potassium – supports plant health'] },
      { title: 'Organic Nutrient Sources', items: ['Farmyard Manure', 'Compost', 'Vermicompost', 'Green Manure'] }
    ],
    tips: ['Use fertilizer according to soil test recommendations.', 'Apply the correct dose at the recommended growth stage.', 'Do not mix fertilizers without checking compatibility.']
  },
  irrigation: {
    title: 'Irrigation Guide',
    subtitle: 'Manage water efficiently for better crop growth.',
    icon: Droplets,
    intro: 'Proper irrigation supplies crops with the water they need while reducing water wastage.',
    sections: [
      { title: 'Irrigation Methods', items: ['Drip Irrigation', 'Sprinkler Irrigation', 'Furrow Irrigation', 'Surface Irrigation'] },
      { title: 'Water Management', items: ['Check soil moisture', 'Water according to crop stage', 'Maintain irrigation equipment'] }
    ],
    tips: ['Prefer efficient irrigation systems where suitable.', 'Avoid waterlogging around plant roots.', 'Adjust irrigation according to rainfall and soil moisture.']
  },
  'pest-disease': {
    title: 'Pest & Disease Guide',
    subtitle: 'Recognize crop problems and take timely action.',
    icon: Bug,
    intro: 'Pests and plant diseases can reduce crop quality and yield. Early identification helps farmers choose suitable control methods.',
    sections: [
      { title: 'Common Warning Signs', items: ['Yellowing leaves', 'Spots on leaves', 'Holes in leaves', 'Wilting plants', 'Damaged stems or fruits'] },
      { title: 'Prevention Methods', items: ['Field monitoring', 'Crop rotation', 'Healthy seeds', 'Proper field sanitation'] }
    ],
    tips: ['Inspect crops regularly.', 'Take clear photos of affected plants for identification.', 'Consult an agriculture expert before using pesticides.']
  },
  market: {
    title: 'Market Information',
    subtitle: 'Understand agricultural markets and selling practices.',
    icon: TrendingUp,
    intro: 'Market information helps farmers compare prices, understand demand and make informed decisions about selling their produce.',
    sections: [
      { title: 'Important Market Terms', items: ['Minimum Support Price (MSP)', 'Market Yard', 'Wholesale Price', 'Retail Price', 'e-NAM'] },
      { title: 'Before Selling', items: ['Check local mandi prices', 'Grade and clean produce', 'Compare nearby market rates', 'Understand transport costs'] }
    ],
    tips: ['Compare prices across markets.', 'Check official market information before selling.', 'Keep records of production and selling expenses.']
  },
  'government-schemes': {
    title: 'Government Schemes',
    subtitle: 'Explore support and benefits available to farmers.',
    icon: Landmark,
    intro: 'Government agriculture schemes may provide financial assistance, insurance, irrigation support and other services to eligible farmers.',
    sections: [
      { title: 'Popular Agriculture Schemes', items: ['PM-KISAN', 'Pradhan Mantri Fasal Bima Yojana', 'PM Krishi Sinchai Yojana', 'Soil Health Card Scheme', 'Kisan Credit Card'] },
      { title: 'Documents Often Required', items: ['Identity Proof', 'Land Records', 'Bank Account Details', 'Relevant Application Documents'] }
    ],
    tips: ['Check current eligibility and application dates.', 'Use official government portals for applications.', 'Never share OTPs or banking passwords with unknown persons.']
  },
  'modern-farming': {
    title: 'Modern Farming Tips',
    subtitle: 'Discover useful technology and improved farming practices.',
    icon: Tractor,
    intro: 'Modern farming combines practical agricultural knowledge with technology to improve productivity and resource management.',
    sections: [
      { title: 'Modern Agriculture Technologies', items: ['Drip Irrigation', 'Soil Testing', 'Farm Mechanization', 'Weather Monitoring', 'Drone-based Crop Monitoring'] },
      { title: 'Sustainable Farming Practices', items: ['Crop Rotation', 'Integrated Pest Management', 'Composting', 'Water Conservation'] }
    ],
    tips: ['Adopt technologies suitable for your farm size.', 'Compare costs and benefits before investing.', 'Learn from local agricultural experts and demonstrations.']
  }
};

const InformationPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const guide = topic ? guides[topic as keyof typeof guides] : undefined;

  if (!guide) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Information Not Found</h1>
        <Link to="/" className="text-green-600 mt-5 inline-block">Back to Home</Link>
      </div>
    );
  }

  const Icon = guide.icon;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-green-700 font-semibold mb-8 hover:underline">
        <ArrowLeft size={19} /> Back to Home
      </Link>

      <section className="bg-gradient-to-r from-green-700 to-emerald-600 rounded-3xl p-8 md:p-12 text-white mb-10">
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
          <Icon size={34} />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{guide.title}</h1>
        <p className="text-green-50 text-lg max-w-2xl">{guide.subtitle}</p>
      </section>

      <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-green-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-600 leading-8">{guide.intro}</p>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-10">
        {guide.sections.map((section) => (
          <div key={section.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-5">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="text-green-600 shrink-0 mt-1" size={19} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-green-50 rounded-2xl p-6 md:p-8 border border-green-100">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 mb-6">
          <Lightbulb className="text-green-600" /> Helpful Farming Tips
        </h2>
        <div className="space-y-4">
          {guide.tips.map((tip) => (
            <div key={tip} className="flex items-start gap-3 text-gray-700">
              <CheckCircle2 className="text-green-600 shrink-0 mt-1" size={20} />
              <p className="leading-7">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center mt-10">
        <Link to="/" className="inline-flex items-center gap-2 bg-green-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-green-700 transition">
          <ArrowLeft size={18} /> Explore More Guides
        </Link>
      </div>
    </main>
  );
};

export default InformationPage;
