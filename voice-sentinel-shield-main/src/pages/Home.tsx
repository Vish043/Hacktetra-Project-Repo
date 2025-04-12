import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Upload,
  ShieldCheck,
  AlertTriangle,
  FileAudio,
  BookOpen,
} from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Header / Navigation */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-sentinel-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">
              Voice Sentinel Shield
            </h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-sentinel-600 font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="text-gray-600 hover:text-sentinel-600"
                >
                  Analyze
                </Link>
              </li>
              <li>
                <Link
                  to="/learn"
                  className="text-gray-600 hover:text-sentinel-600"
                >
                  Learn
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sentinel-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Detect AI Voice Scams{" "}
                <span className="text-sentinel-600">Instantly</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Our advanced technology helps you identify AI-generated voice
                content and protect yourself from sophisticated voice scams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/upload">
                  <Button
                    size="lg"
                    className="bg-sentinel-600 hover:bg-sentinel-700"
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Voice
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-sentinel-300 text-sentinel-600 hover:bg-sentinel-50"
                  >
                    <Mic className="mr-2 h-5 w-5" />
                    Record Voice
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-sentinel-300 to-sentinel-600 opacity-30 blur"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between mb-4">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Voice Sentinel Shield
                    </div>
                  </div>
                  <div className="flex items-center justify-center bg-gray-50 rounded p-5 mb-4">
                    <div className="flex flex-col items-center">
                      <div className="h-24 w-24 rounded-full bg-sentinel-100 flex items-center justify-center mb-4">
                        <ShieldCheck className="h-12 w-12 text-sentinel-600" />
                      </div>
                      <div className="flex space-x-2 items-center text-sm font-medium text-gray-600">
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                        <span>AI Detection Active</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-100 h-4 rounded w-full"></div>
                    <div className="bg-gray-100 h-4 rounded w-3/4"></div>
                    <div className="bg-gray-100 h-4 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Use Voice Sentinel Shield?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="bg-sentinel-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <AlertTriangle className="h-7 w-7 text-sentinel-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Detect AI Voices</h3>
              <p className="text-gray-600">
                Our advanced algorithms can detect AI-generated voices with high
                accuracy, helping you avoid sophisticated scams.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="bg-sentinel-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <FileAudio className="h-7 w-7 text-sentinel-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Analyze Any Audio</h3>
              <p className="text-gray-600">
                Upload suspicious voice messages or record directly to quickly
                check if the voice is authentic or AI-generated.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <div className="bg-sentinel-100 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-sentinel-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Stay Informed</h3>
              <p className="text-gray-600">
                Get educational resources and stay updated on the latest voice
                scam techniques to protect yourself and your loved ones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sentinel-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to Protect Yourself from Voice Scams?
          </h2>
          <Link to="/upload">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-sentinel-600 hover:bg-gray-100"
            >
              Try Voice Analysis Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ShieldCheck className="h-6 w-6 text-sentinel-600 mr-2" />
              <span className="font-medium text-gray-700">
                Voice Sentinel Shield
              </span>
            </div>

            <div className="text-sm text-gray-500">
              2025 Voice Sentinel Shield.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
