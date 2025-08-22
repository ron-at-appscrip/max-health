import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

// Validation schema
const registerSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  countryCode: z.string().min(1, 'Country code is required'),
  mobileNumber: z.string().min(1, 'Mobile number is required'),
  companyName: z.string().min(1, 'Company name is required'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  insuranceAuthNumber: z.string().min(1, 'Insurance authorization number is required'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      countryCode: '+971', // Default to UAE
    },
  });

  const watchedFields = watch();
  const isFormValid = isValid && Object.values(watchedFields).every(value => value);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock submission - replace with actual API call
      console.log('Registration submitted:', data);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // Navigate back to login page
    navigate('/login');
  };

  if (isSubmitted) {
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

        {/* Right Panel - Success Message */}
        <div className="flex-1 flex items-center justify-center p-8 bg-background">
          <div className="w-full max-w-md text-center">
            <div className="mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Registration Submitted!</h1>
              <p className="text-muted-foreground">
                Thank you for your interest in joining MaxHealth Broker Portal.
              </p>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">What happens next?</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Your request has been sent to our admin team for review</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>We'll review your submission within 48 hours</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <p>Upon approval, you'll receive login credentials via email</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleBackToLogin} variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

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

      {/* Right Panel - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/maxhealth logo.png" 
                alt="MaxHealth Logo" 
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold mb-2">Join MaxHealth</h1>
            <p className="text-muted-foreground">Complete your broker registration</p>
          </div>

          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Select onValueChange={(value) => setValue('title', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mr.">Mr.</SelectItem>
                      <SelectItem value="Mrs.">Mrs.</SelectItem>
                      <SelectItem value="Ms.">Ms.</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title.message}</p>
                  )}
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="First name"
                      {...register('firstName')}
                      className={errors.firstName ? 'border-destructive' : ''}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      placeholder="Middle name"
                      {...register('middleName')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      placeholder="Last name"
                      {...register('lastName')}
                      className={errors.lastName ? 'border-destructive' : ''}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number *</Label>
                  <div className="flex gap-2">
                    <div className="w-24">
                      <Select onValueChange={(value) => setValue('countryCode', value)} defaultValue="+971">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+971">+971</SelectItem>
                          <SelectItem value="+966">+966</SelectItem>
                          <SelectItem value="+965">+965</SelectItem>
                          <SelectItem value="+973">+973</SelectItem>
                          <SelectItem value="+974">+974</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      id="mobileNumber"
                      placeholder="Mobile number"
                      {...register('mobileNumber')}
                      className={errors.mobileNumber ? 'border-destructive' : ''}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-sm text-destructive">{errors.mobileNumber.message}</p>
                  )}
                </div>

                {/* Company Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      placeholder="Company name"
                      {...register('companyName')}
                      className={errors.companyName ? 'border-destructive' : ''}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-destructive">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      placeholder="Department"
                      {...register('department')}
                      className={errors.department ? 'border-destructive' : ''}
                    />
                    {errors.department && (
                      <p className="text-sm text-destructive">{errors.department.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position *</Label>
                  <Input
                    id="position"
                    placeholder="Your position"
                    {...register('position')}
                    className={errors.position ? 'border-destructive' : ''}
                  />
                  {errors.position && (
                    <p className="text-sm text-destructive">{errors.position.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceAuthNumber">Insurance Authorization Registration Number *</Label>
                  <Input
                    id="insuranceAuthNumber"
                    placeholder="Enter your authorization number"
                    {...register('insuranceAuthNumber')}
                    className={errors.insuranceAuthNumber ? 'border-destructive' : ''}
                  />
                  {errors.insuranceAuthNumber && (
                    <p className="text-sm text-destructive">{errors.insuranceAuthNumber.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isFormValid || isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit Request'
                  )}
                </Button>

                {/* Back to Login */}
                <div className="text-center pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBackToLogin}
                    className="w-full"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p className="mb-2">MaxHealth Broker Portal</p>
            <p className="mb-2">Dubai Insurance Company</p>
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

export default RegisterPage;
