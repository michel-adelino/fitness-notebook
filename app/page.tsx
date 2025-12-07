import Link from 'next/link';
import { Button } from './components/ui/Button';
import { Dumbbell, Palette, FileText, ShoppingCart, Sparkles, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Fitness Notebook</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/builder">
                <Button variant="ghost">Builder</Button>
              </Link>
              <Link href="/builder">
                <Button variant="primary">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Create Your Perfect
            <span className="text-blue-600"> Fitness Notebook</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Design a custom workout notebook tailored to your fitness goals. 
            Drag, drop, and personalize every detail.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/builder">
              <Button variant="primary" size="lg">
                Start Building
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need to Track Your Fitness Journey
        </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Drag & Drop Builder</h3>
            <p className="text-gray-600">
              Easily add and rearrange exercises with our intuitive drag-and-drop interface. 
              No design skills required.
            </p>
          </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Palette className="w-6 h-6 text-green-600" />
              </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fully Customizable</h3>
            <p className="text-gray-600">
              Choose colors, templates, and add personal touches like your name, initials, 
              and motivational quotes.
            </p>
          </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">PDF Generation</h3>
            <p className="text-gray-600">
              Generate print-ready PDFs instantly. Perfect for printing at home or sending 
              to professional printers.
            </p>
          </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Preview</h3>
            <p className="text-gray-600">
              See your notebook design in real-time as you make changes. 
              Preview exactly how it will look when printed.
            </p>
          </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <Dumbbell className="w-6 h-6 text-red-600" />
              </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Exercise Library</h3>
            <p className="text-gray-600">
              Access a comprehensive library of exercises or create your own custom exercises 
              to match your workout routine.
            </p>
          </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl flex items-center justify-center mb-4 shadow-sm">
                <ShoppingCart className="w-6 h-6 text-indigo-600" />
              </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Checkout</h3>
            <p className="text-gray-600">
              Simple and secure checkout process. Get your custom notebook delivered 
              to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Custom Notebook?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Start building your personalized fitness notebook today. It only takes a few minutes!
          </p>
          <Link href="/builder">
            <Button variant="secondary" size="lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Fitness Notebook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
