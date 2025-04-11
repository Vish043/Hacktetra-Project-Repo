
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, VoicemailIcon, Brain, Users, Phone, HelpCircle, ArrowRight } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const learnTopics = [
  {
    icon: <VoicemailIcon className="h-10 w-10 text-sentinel-500" />,
    title: "Voice Cloning",
    description: "Voice cloning technology can create a synthetic version of someone's voice with just a small audio sample. Scammers use this to impersonate family members, colleagues, or authority figures.",
    warning: "Be suspicious if a familiar voice asks for money, passwords, or personal information over the phone."
  },
  {
    icon: <Brain className="h-10 w-10 text-sentinel-500" />,
    title: "Deepfake Audio",
    description: "Advanced AI can generate realistic conversations that never happened, complete with natural-sounding speech patterns and emotional cues.",
    warning: "Listen for unnatural pauses, odd responses to questions, or inconsistent background noise."
  },
  {
    icon: <Users className="h-10 w-10 text-sentinel-500" />,
    title: "Social Engineering",
    description: "AI voices are often combined with personal information gathered from social media to create convincing scam scenarios tailored to the victim.",
    warning: "Verify unusual requests by contacting the person directly through a known, trusted channel."
  },
  {
    icon: <Phone className="h-10 w-10 text-sentinel-500" />,
    title: "Vishing (Voice Phishing)",
    description: "Voice phishing attacks use psychological manipulation to create urgency and fear, pushing victims to act quickly without verifying the caller's identity.",
    warning: "Take your time. Legitimate organizations will never pressure you to make immediate financial decisions."
  }
];

const faqs = [
  {
    question: "How accurate is Voice Sentinel Shield at detecting AI voices?",
    answer: "Our technology can detect most AI-generated voices with approximately 85-95% accuracy, depending on the quality of the recording and the sophistication of the AI used. We continually update our detection models to keep pace with advancing AI voice synthesis technologies."
  },
  {
    question: "Can scammers bypass voice detection technology?",
    answer: "As with any security technology, sophisticated attackers may find ways to evade detection. This is why we recommend using our tool as one part of your security approach, alongside common-sense verification practices like calling back on official numbers."
  },
  {
    question: "What information should I never provide over the phone?",
    answer: "Never share passwords, one-time verification codes, full credit card numbers (including CVV), Social Security numbers, or account login credentials over the phone—even if the caller sounds exactly like someone you know and trust."
  },
  {
    question: "How do I report a voice scam attempt?",
    answer: "Report voice scams to your local law enforcement, the FBI's Internet Crime Complaint Center (IC3), the FTC, and to the organization being impersonated. Save any recordings of the call if possible."
  },
  {
    question: "What makes AI voices detectable?",
    answer: "AI-generated voices often have subtle anomalies in breathing patterns, consistent volume levels, unnatural transitions between phonemes, and other artifacts that sophisticated detection algorithms can identify. Human speech has natural variations that are difficult for AI to perfectly replicate."
  }
];

const Learn = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Navigation */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-sentinel-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">Voice Sentinel Shield</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-600 hover:text-sentinel-600">Home</Link></li>
              <li><Link to="/upload" className="text-gray-600 hover:text-sentinel-600">Analyze</Link></li>
              <li><Link to="/learn" className="text-gray-600 hover:text-sentinel-600 font-medium">Learn</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 flex-grow">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-sentinel-100 rounded-full">
              <BookOpen className="h-8 w-8 text-sentinel-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Learn About Voice Scams</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Understanding how voice scams work is your first line of defense against sophisticated attacks.
          </p>
        </div>
        
        {/* Scam Types */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center">Common Voice Scam Techniques</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {learnTopics.map((topic, index) => (
              <Card key={index} className="border-t-4 border-t-sentinel-500">
                <CardHeader>
                  <div className="flex items-center">
                    <div className="mr-4">
                      {topic.icon}
                    </div>
                    <CardTitle>{topic.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{topic.description}</p>
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-3">
                    <div className="flex">
                      <HelpCircle className="h-5 w-5 text-orange-600 mr-2 flex-shrink-0" />
                      <p className="text-sm text-orange-700">{topic.warning}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* How to Protect Yourself */}
        <div className="mb-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">How to Protect Yourself</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-xl font-semibold">Essential Safety Practices</h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex">
                  <div className="bg-sentinel-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="font-bold text-sentinel-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Verify Independently</h4>
                    <p className="text-gray-600 text-sm">Always call back on a known, official number when receiving calls claiming to be from financial institutions or government agencies.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-sentinel-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="font-bold text-sentinel-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Establish Verification</h4>
                    <p className="text-gray-600 text-sm">Create personal security questions with family members to verify identity during suspicious calls.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-sentinel-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="font-bold text-sentinel-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Be Skeptical of Urgency</h4>
                    <p className="text-gray-600 text-sm">Scammers create false urgency. Take time to verify before taking action, especially regarding financial matters.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-sentinel-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="font-bold text-sentinel-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Use Technology</h4>
                    <p className="text-gray-600 text-sm">Utilize tools like Voice Sentinel Shield to analyze suspicious voice messages or recordings.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-sentinel-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="font-bold text-sentinel-600">5</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Limit Personal Info</h4>
                    <p className="text-gray-600 text-sm">Reduce the amount of personal information you share online that could be used to make scams more convincing.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="bg-sentinel-100 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <span className="font-bold text-sentinel-600">6</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Educate Family</h4>
                    <p className="text-gray-600 text-sm">Share information about voice scams with vulnerable family members, especially older adults.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/upload">
                  <Button className="bg-sentinel-600 hover:bg-sentinel-700">
                    Analyze a Suspicious Voice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ShieldCheck className="h-6 w-6 text-sentinel-600 mr-2" />
              <span className="font-medium text-gray-700">Voice Sentinel Shield</span>
            </div>
            
            <div className="text-sm text-gray-500">
              &copy; 2025 Voice Sentinel Shield. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Learn;
