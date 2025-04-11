
import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, X, RefreshCw } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock data for scam alerts
const mockAlerts = [
  {
    id: 1,
    title: "IRS Impersonation Calls",
    description: "Scammers claiming to be IRS agents demanding immediate tax payments.",
    severity: "high",
    date: "2025-04-09"
  },
  {
    id: 2,
    title: "Banking Security Alert Scam",
    description: "AI-generated voices claiming to be from your bank's security department.",
    severity: "critical",
    date: "2025-04-10"
  },
  {
    id: 3,
    title: "Tech Support Voice Phishing",
    description: "Callers impersonating tech support from well-known companies.",
    severity: "medium",
    date: "2025-04-08"
  },
  {
    id: 4,
    title: "Utility Company Threats",
    description: "Scammers threatening to shut off utilities without immediate payment.",
    severity: "high",
    date: "2025-04-07"
  }
];

const ScamAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [isLoading, setIsLoading] = useState(false);
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);
  
  const refreshAlerts = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Reset dismissed alerts
      setDismissedAlerts([]);
    }, 1500);
  };
  
  const dismissAlert = (id: number) => {
    setDismissedAlerts([...dismissedAlerts, id]);
  };
  
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const visibleAlerts = alerts.filter(alert => !dismissedAlerts.includes(alert.id));

  return (
    <Card className="w-full max-w-md">
      <div className="bg-sentinel-600 p-4 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-white">
            <Bell className="mr-2 h-5 w-5" />
            <h3 className="font-bold">Recent Scam Alerts</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshAlerts}
            disabled={isLoading}
            className="text-white hover:bg-sentinel-700"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-xs">{isLoading ? 'Updating...' : 'Refresh'}</span>
          </Button>
        </div>
      </div>
      
      <CardContent className="p-0">
        {visibleAlerts.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <p>No active scam alerts at this time</p>
            <Button variant="ghost" size="sm" onClick={refreshAlerts} className="mt-2">
              Check for new alerts
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
            {visibleAlerts.map((alert, index) => (
              <div key={alert.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <div className="flex items-center mb-1">
                        <h4 className="font-medium text-gray-900 mr-2">{alert.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${getSeverityStyles(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{alert.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Reported: {formatDate(alert.date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="p-3 bg-gray-50 rounded-b-lg">
          <a href="#" className="text-xs text-center block text-sentinel-600 hover:text-sentinel-700">
            View all recent scam reports
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScamAlerts;
