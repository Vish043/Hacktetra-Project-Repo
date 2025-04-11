
import React from 'react';
import { Shield, AlertTriangle, Phone, BrainCircuit, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

const tips = [
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Verify the Caller",
    content: "Always request verification when receiving calls from banks, government agencies, or businesses. Call them back on their official number, not the one that called you.",
    link: "#"
  },
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    title: "Be Alert to Urgency",
    content: "Scammers often create a false sense of urgency. Take your time and don't rush important decisions involving sensitive information or payments.",
    link: "#"
  },
  {
    icon: <BrainCircuit className="h-5 w-5" />,
    title: "Trust Your Instincts",
    content: "If something feels off about a call - unusual background noise, awkward speech patterns, or strange requests - trust your gut and hang up.",
    link: "#"
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Protect Personal Data",
    content: "Never share sensitive information like passwords, PINs, or verification codes over the phone, even if the caller claims to be from a trusted organization.",
    link: "#"
  }
];

const TipsSection: React.FC = () => {
  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
          <Shield className="mr-2 text-sentinel-600" />
          Voice Scam Prevention Tips
        </h3>
        <p className="text-gray-600 text-sm">
          Protect yourself from voice phishing and AI-generated scam calls by following these important guidelines.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {tips.map((tip, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="hover:no-underline py-4">
              <div className="flex items-center text-left">
                <div className="bg-sentinel-100 p-2 rounded-full mr-3 text-sentinel-600">
                  {tip.icon}
                </div>
                <span className="font-medium">{tip.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="pl-12">
                <p className="text-gray-600 mb-2">{tip.content}</p>
                <a 
                  href={tip.link} 
                  className="text-sentinel-600 text-sm font-medium hover:text-sentinel-700 inline-flex items-center"
                >
                  Learn more <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      
      <div className="mt-6 bg-sentinel-50 p-4 rounded-lg border border-sentinel-100">
        <h4 className="font-medium mb-2 text-sentinel-700">Remember</h4>
        <p className="text-sm text-gray-600">
          Legitimate organizations will never pressure you for immediate action or request sensitive information over the phone. When in doubt, hang up and call back on an official number.
        </p>
      </div>
    </div>
  );
};

export default TipsSection;
