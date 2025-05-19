import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '../types';

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What is organ donation?',
    answer: 'Organ donation is the process of surgically removing an organ or tissue from one person (the donor) and placing it into another person (the recipient). Transplanted organs can save or significantly improve the quality of life for recipients.',
    category: 'general'
  },
  {
    id: 2,
    question: 'Who can become an organ donor?',
    answer: 'Most people can be organ donors. Age or medical history shouldn\'t prevent you from registering as a donor. Medical professionals evaluate suitability at the time of donation. Each potential donor is assessed on individual medical criteria.',
    category: 'donor'
  },
  {
    id: 3,
    question: 'How does the matching process work?',
    answer: 'Matching is based on multiple factors including blood type, tissue type, organ size, medical urgency, waiting time, and geographical location. Our advanced algorithm considers all these factors to find the most compatible matches.',
    category: 'general'
  },
  {
    id: 4,
    question: 'How long is the waiting period for recipients?',
    answer: 'Waiting times vary depending on organ type, compatibility, urgency, and availability. Through our platform, we aim to reduce traditional waiting times by connecting directly with compatible donors. Some recipients have found matches in as little as a few months.',
    category: 'recipient'
  },
  {
    id: 5,
    question: 'Are there any costs involved in organ donation?',
    answer: 'Donors incur no costs for organ donation. All medical expenses related to the donation process are covered by the recipient\'s insurance. Our platform is free for donors to register and use.',
    category: 'donor'
  },
  {
    id: 6,
    question: 'How does Aarogyam ensure safety and compliance?',
    answer: 'Aarogyam adheres to all national and international organ donation regulations. We work with licensed medical facilities, verify all medical information, and ensure ethical practices throughout the donation process.',
    category: 'general'
  }
];

const FAQItem: React.FC<{ faq: FAQ }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
        {isOpen ? 
          <ChevronUp className="h-5 w-5 text-primary-500" /> : 
          <ChevronDown className="h-5 w-5 text-gray-400" />
        }
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-600 animate-fade-in">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'donor' | 'recipient'>('all');
  
  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);
  
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about organ donation and our platform
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-gray-100 rounded-full">
            <button 
              className={`px-4 py-2 rounded-full ${activeCategory === 'all' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600'}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeCategory === 'general' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600'}`}
              onClick={() => setActiveCategory('general')}
            >
              General
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeCategory === 'donor' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600'}`}
              onClick={() => setActiveCategory('donor')}
            >
              For Donors
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeCategory === 'recipient' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600'}`}
              onClick={() => setActiveCategory('recipient')}
            >
              For Recipients
            </button>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              {filteredFaqs.map(faq => (
                <FAQItem key={faq.id} faq={faq} />
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Still have questions about organ donation or our platform?
            </p>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-medium transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;