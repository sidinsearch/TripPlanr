import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="mb-8">
              <div className="text-6xl font-bold text-red-500 mb-4">⚠️</div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Something Went Wrong</h1>
            <p className="text-white/70 text-lg mb-4 max-w-md mx-auto">
              We encountered an error while processing your request.
            </p>
            
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-md mb-8 max-w-md mx-auto overflow-auto text-left">
              <p className="text-red-300 text-sm font-mono">
                {this.state.error?.message || 'Unknown error'}
              </p>
            </div>
            
            <Link to="/">
              <Button className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;