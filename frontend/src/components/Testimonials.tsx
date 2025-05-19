import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'David Chen',
    role: 'donor',
    quote: 'Donating my kidney was one of the most fulfilling experiences of my life. The Aarogyam team guided me through every step with compassion and professionalism.',
    image: 'https://images.pexels.com/photos/5490276/pexels-photo-5490276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Emily Rodriguez',
    role: 'recipient',
    quote: 'After three years on the waiting list, Aarogyam found me a liver donor in just two months. I\'ve been given a second chance at life and I\'m making every day count.',
    image: 'https://images.pexels.com/photos/6234600/pexels-photo-6234600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    role: 'donor',
    quote: 'The thought that part of me is helping someone else live a fuller life is incredible. Aarogyam made the process straightforward and meaningful.',
    image: 'https://images.pexels.com/photos/5093964/pexels-photo-5093964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    name: 'Sophia Williams',
    role: 'recipient',
    quote: 'My new kidney has given me freedom from dialysis and the ability to travel and enjoy life again. I\'m forever grateful to my donor and the Aarogyam platform.',
    image: 'https://images.pexels.com/photos/4004173/pexels-photo-4004173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 2 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 2 ? 0 : prevIndex + 1
    );
  };

  return (
    <section id="stories" className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Hear from the donors and recipients whose lives have been changed through Aarogyam
          </p>
        </div>
        
        <div className="relative">
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-xl shadow-xl p-8 flex-1 transform transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{testimonial.name}</h3>
                    <p className={`text-sm ${testimonial.role === 'donor' ? 'text-primary-600' : 'text-secondary-600'} font-medium`}>
                      {testimonial.role === 'donor' ? 'Organ Donor' : 'Organ Recipient'}
                    </p>
                  </div>
                </div>
                
                <blockquote className="text-gray-600 italic mb-6">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className={`w-12 h-1 rounded ${testimonial.role === 'donor' ? 'bg-primary-500' : 'bg-secondary-500'}`}></div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-10">
            <button 
              onClick={handlePrev}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full mr-4 transition-colors"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={handleNext}
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;