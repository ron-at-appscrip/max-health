import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Card, CardContent } from '../components/ui/card';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('demo@maxhealth.ae');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    console.log('Login button clicked!');
    console.log('Email:', email);
    console.log('Password:', password);
    
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials
      if (email === 'admin@maxhealth.ae' && password === 'admin123') {
        console.log('Admin login successful!');
        navigate('/admin');
      } else if (email === 'demo@maxhealth.ae' && password === 'password123') {
        console.log('Broker login successful!');
        navigate('/dashboard');
      } else {
        console.log('Invalid credentials');
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password');
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  const isFormValid = email && password;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - MaxHealth Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <img 
          src="/maxlife login image.png" 
          alt="MaxLife Login Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/maxhealth logo.png" 
                alt="MaxHealth Logo" 
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome to MaxHealth</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="rememberMe" 
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="rememberMe" className="text-sm font-normal">
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                {/* Login Button */}
                <Button
                  type="button"
                  className="w-full"
                  disabled={!isFormValid || isLoading}
                  onClick={handleLogin}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                {/* Get Started CTA */}
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Don't have an account?
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGetStarted}
                    className="w-full group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p className="mb-2">
              MaxHealth Broker Portal
            </p>
            <p className="mb-2">
              Dubai Insurance Company
            </p>
            <div className="space-x-4">
              <a href="#" className="hover:text-foreground">Terms & Conditions</a>
              <span>•</span>
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
            </div>
            <p className="mt-2">© MaxHealth / Dubai Insurance, 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
