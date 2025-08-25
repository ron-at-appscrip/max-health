import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import BrokerLayout from '../components/layout/BrokerLayout';

interface FormData {
  claimHandlingBy: string;
  productLine: string;
  reference: string;
  clientName: string;
  clientEmail: string;
  clientLocation: string;
  accountHandlingPersonName: string;
  accountHandlingPersonEmail: string;
  accountHandlingPersonMobile: string;
  policyStartDate: string;
  premiumFrequency: string;
  currentInsurer: string;
  currency: string;
  quotationFor: string;
  policyHolderType: string;
  targetPremium: string;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

const CreateNewCasePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    claimHandlingBy: '',
    productLine: '',
    reference: '',
    clientName: '',
    clientEmail: '',
    clientLocation: '',
    accountHandlingPersonName: '',
    accountHandlingPersonEmail: '',
    accountHandlingPersonMobile: '',
    policyStartDate: '',
    premiumFrequency: '',
    currentInsurer: '',
    currency: 'AED',
    quotationFor: '',
    policyHolderType: '',
    targetPremium: '0',
  });

  const [uploadedFiles, setUploadedFiles] = useState<{
    census: UploadedFile | null;
    tob: UploadedFile | null;
    claimsReport: UploadedFile | null;
  }>({
    census: null,
    tob: null,
    claimsReport: null,
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const steps = [
    { id: 1, label: 'Client & Plan Information', active: true },
    { id: 2, label: 'Preview Census', active: false },
    { id: 3, label: 'Assign Plan', active: false },
    { id: 4, label: 'Assign Variations', active: false },
  ];

  const claimHandlingOptions = ['MEDNET', 'NextCare', 'Other'];
  const productLineOptions = ['MAXMED', 'Individual', 'SME', 'Group'];
  const referenceOptions = ['Direct', 'Agency', 'Referral', 'Other'];
  const locationOptions = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah', 'UAE-wide'];
  const premiumFrequencyOptions = ['Annually', 'Semi-Annually', 'Quarterly', 'Monthly'];
  const currentInsurerOptions = ['DIC', 'Oman Insurance', 'AXA', 'MetLife', 'Other'];
  const quotationForOptions = ['Individual', 'SME', 'Group', 'Renewal'];
  const policyHolderTypeOptions = ['Individual', 'Corporate', 'Micro Group', 'SME'];

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'clientEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'accountHandlingPersonEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'accountHandlingPersonMobile':
        if (value && !/^05\d{8}$/.test(value)) {
          return 'Please enter a valid UAE mobile number (05XXXXXXXX)';
        }
        break;
      case 'policyStartDate':
        if (value) {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            return 'Policy start date cannot be in the past';
          }
        }
        break;
      case 'targetPremium':
        if (value && isNaN(Number(value))) {
          return 'Please enter a valid number';
        }
        break;
    }
    return '';
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    const error = validateField(name, formData[name]);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFileUpload = (type: 'census' | 'tob' | 'claimsReport', file: File) => {
    const uploadedFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
    };

    setUploadedFiles(prev => ({ ...prev, [type]: uploadedFile }));
  };

  const handleFileDrop = (type: 'census' | 'tob' | 'claimsReport', e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(type, file);
    }
  };

  const removeFile = (type: 'census' | 'tob' | 'claimsReport') => {
    setUploadedFiles(prev => ({ ...prev, [type]: null }));
    if (fileInputRefs.current[type]) {
      fileInputRefs.current[type]!.value = '';
    }
  };

  const removeAllFiles = () => {
    setUploadedFiles({
      census: null,
      tob: null,
      claimsReport: null,
    });
    Object.values(fileInputRefs.current).forEach(ref => {
      if (ref) ref.value = '';
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    // Required fields validation
    const requiredFields: (keyof FormData)[] = [
      'claimHandlingBy', 'productLine', 'reference', 'clientName', 'clientEmail',
      'clientLocation', 'accountHandlingPersonName', 'accountHandlingPersonMobile',
      'policyStartDate', 'premiumFrequency', 'currentInsurer', 'quotationFor', 'policyHolderType'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      } else {
        const fieldError = validateField(field, formData[field]);
        if (fieldError) {
          newErrors[field] = fieldError;
          isValid = false;
        }
      }
    });

    // File validation
    if (!uploadedFiles.census) {
      isValid = false;
    }
    if (!uploadedFiles.tob) {
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <BrokerLayout
      title="Create New Case"
      description={`Step ${currentStep}: ${steps[currentStep - 1]?.label}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>Dashboard</li>
            <li>/</li>
            <li>Active Case</li>
            <li>/</li>
            <li className="text-gray-900 font-medium">New Case</li>
          </ol>
        </nav>

        {/* Disclaimer */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Individual and Micro-group is only available in MedNet
            </p>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {step.id}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            {/* Census File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Drop or Select Census File</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    uploadedFiles.census ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDrop={(e) => handleFileDrop('census', e)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {uploadedFiles.census ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-8 w-8 text-green-600 mr-3" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{uploadedFiles.census.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(uploadedFiles.census.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile('census')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Drop your census file here, or</p>
                      <input
                        ref={(el) => fileInputRefs.current['census'] = el}
                        type="file"
                        accept=".xlsx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload('census', file);
                        }}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => fileInputRefs.current['census']?.click()}
                      >
                        Browse Files
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">Only .xlsx files are allowed</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Client & Plan Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Client & Plan Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Claim Handling By */}
                  <div>
                    <Label htmlFor="claimHandlingBy" className="text-sm font-medium">
                      Claim Handling By <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.claimHandlingBy}
                      onValueChange={(value) => handleInputChange('claimHandlingBy', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select claim handling" />
                      </SelectTrigger>
                      <SelectContent>
                        {claimHandlingOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.claimHandlingBy && (
                      <p className="text-red-500 text-xs mt-1">{errors.claimHandlingBy}</p>
                    )}
                  </div>

                  {/* Product Line */}
                  <div>
                    <Label htmlFor="productLine" className="text-sm font-medium">
                      Product Line <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.productLine}
                      onValueChange={(value) => handleInputChange('productLine', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select product line" />
                      </SelectTrigger>
                      <SelectContent>
                        {productLineOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.productLine && (
                      <p className="text-red-500 text-xs mt-1">{errors.productLine}</p>
                    )}
                  </div>

                  {/* Reference */}
                  <div>
                    <Label htmlFor="reference" className="text-sm font-medium">
                      Reference <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.reference}
                      onValueChange={(value) => handleInputChange('reference', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select reference" />
                      </SelectTrigger>
                      <SelectContent>
                        {referenceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.reference && (
                      <p className="text-red-500 text-xs mt-1">{errors.reference}</p>
                    )}
                  </div>

                  {/* Client Name */}
                  <div>
                    <Label htmlFor="clientName" className="text-sm font-medium">
                      Client Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => handleInputChange('clientName', e.target.value)}
                      onBlur={() => handleBlur('clientName')}
                      className="mt-1"
                      placeholder="Enter client name"
                    />
                    {errors.clientName && (
                      <p className="text-red-500 text-xs mt-1">{errors.clientName}</p>
                    )}
                  </div>

                  {/* Client Email */}
                  <div>
                    <Label htmlFor="clientEmail" className="text-sm font-medium">
                      Client Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                      onBlur={() => handleBlur('clientEmail')}
                      className="mt-1"
                      placeholder="Enter client email"
                    />
                    {errors.clientEmail && (
                      <p className="text-red-500 text-xs mt-1">{errors.clientEmail}</p>
                    )}
                  </div>

                  {/* Client Location */}
                  <div>
                    <Label htmlFor="clientLocation" className="text-sm font-medium">
                      Client Location <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.clientLocation}
                      onValueChange={(value) => handleInputChange('clientLocation', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.clientLocation && (
                      <p className="text-red-500 text-xs mt-1">{errors.clientLocation}</p>
                    )}
                  </div>

                  {/* Account Handling Person Name */}
                  <div>
                    <Label htmlFor="accountHandlingPersonName" className="text-sm font-medium">
                      Account Handling Person Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountHandlingPersonName"
                      value={formData.accountHandlingPersonName}
                      onChange={(e) => handleInputChange('accountHandlingPersonName', e.target.value)}
                      onBlur={() => handleBlur('accountHandlingPersonName')}
                      className="mt-1"
                      placeholder="Enter person name"
                    />
                    {errors.accountHandlingPersonName && (
                      <p className="text-red-500 text-xs mt-1">{errors.accountHandlingPersonName}</p>
                    )}
                  </div>

                  {/* Account Handling Person Email */}
                  <div>
                    <Label htmlFor="accountHandlingPersonEmail" className="text-sm font-medium">
                      Account Handling Person Email
                    </Label>
                    <Input
                      id="accountHandlingPersonEmail"
                      type="email"
                      value={formData.accountHandlingPersonEmail}
                      onChange={(e) => handleInputChange('accountHandlingPersonEmail', e.target.value)}
                      onBlur={() => handleBlur('accountHandlingPersonEmail')}
                      className="mt-1"
                      placeholder="Enter email address"
                    />
                    {errors.accountHandlingPersonEmail && (
                      <p className="text-red-500 text-xs mt-1">{errors.accountHandlingPersonEmail}</p>
                    )}
                  </div>

                  {/* Account Handling Person Mobile */}
                  <div>
                    <Label htmlFor="accountHandlingPersonMobile" className="text-sm font-medium">
                      Account Handling Person Mobile <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="accountHandlingPersonMobile"
                      value={formData.accountHandlingPersonMobile}
                      onChange={(e) => handleInputChange('accountHandlingPersonMobile', e.target.value)}
                      onBlur={() => handleBlur('accountHandlingPersonMobile')}
                      className="mt-1"
                      placeholder="05XXXXXXXX"
                    />
                    {errors.accountHandlingPersonMobile && (
                      <p className="text-red-500 text-xs mt-1">{errors.accountHandlingPersonMobile}</p>
                    )}
                  </div>

                  {/* Policy Start Date */}
                  <div>
                    <Label htmlFor="policyStartDate" className="text-sm font-medium">
                      Policy Start Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="policyStartDate"
                      type="date"
                      value={formData.policyStartDate}
                      onChange={(e) => handleInputChange('policyStartDate', e.target.value)}
                      onBlur={() => handleBlur('policyStartDate')}
                      className="mt-1"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.policyStartDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.policyStartDate}</p>
                    )}
                  </div>

                  {/* Premium Frequency */}
                  <div>
                    <Label htmlFor="premiumFrequency" className="text-sm font-medium">
                      Premium Frequency <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.premiumFrequency}
                      onValueChange={(value) => handleInputChange('premiumFrequency', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {premiumFrequencyOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.premiumFrequency && (
                      <p className="text-red-500 text-xs mt-1">{errors.premiumFrequency}</p>
                    )}
                  </div>

                  {/* Current Insurer */}
                  <div>
                    <Label htmlFor="currentInsurer" className="text-sm font-medium">
                      Current Insurer <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.currentInsurer}
                      onValueChange={(value) => handleInputChange('currentInsurer', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select insurer" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentInsurerOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.currentInsurer && (
                      <p className="text-red-500 text-xs mt-1">{errors.currentInsurer}</p>
                    )}
                  </div>

                  {/* Currency */}
                  <div>
                    <Label htmlFor="currency" className="text-sm font-medium">
                      Currency
                    </Label>
                    <Input
                      id="currency"
                      value={formData.currency}
                      disabled
                      className="mt-1 bg-gray-50"
                    />
                  </div>

                  {/* Quotation For */}
                  <div>
                    <Label htmlFor="quotationFor" className="text-sm font-medium">
                      Quotation For <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.quotationFor}
                      onValueChange={(value) => handleInputChange('quotationFor', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select quotation type" />
                      </SelectTrigger>
                      <SelectContent>
                        {quotationForOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.quotationFor && (
                      <p className="text-red-500 text-xs mt-1">{errors.quotationFor}</p>
                    )}
                  </div>

                  {/* Policy Holder Type */}
                  <div>
                    <Label htmlFor="policyHolderType" className="text-sm font-medium">
                      Policy Holder Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.policyHolderType}
                      onValueChange={(value) => handleInputChange('policyHolderType', value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select holder type" />
                      </SelectTrigger>
                      <SelectContent>
                        {policyHolderTypeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.policyHolderType && (
                      <p className="text-red-500 text-xs mt-1">{errors.policyHolderType}</p>
                    )}
                  </div>

                  {/* Target Premium */}
                  <div>
                    <Label htmlFor="targetPremium" className="text-sm font-medium">
                      Target Premium
                    </Label>
                    <Input
                      id="targetPremium"
                      type="number"
                      value={formData.targetPremium}
                      onChange={(e) => handleInputChange('targetPremium', e.target.value)}
                      onBlur={() => handleBlur('targetPremium')}
                      className="mt-1"
                      placeholder="0"
                    />
                    {errors.targetPremium && (
                      <p className="text-red-500 text-xs mt-1">{errors.targetPremium}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Document Uploads */}
          <div className="space-y-6">
            {/* Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* TOB Upload */}
                <div>
                  <Label className="text-sm font-medium">
                    Upload Current TOB <span className="text-red-500">*</span>
                  </Label>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-4 text-center ${
                      uploadedFiles.tob ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDrop={(e) => handleFileDrop('tob', e)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {uploadedFiles.tob ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-6 w-6 text-green-600 mr-2" />
                          <div className="text-left">
                            <p className="font-medium text-sm text-gray-900">{uploadedFiles.tob.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(uploadedFiles.tob.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile('tob')}
                          className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm mb-2">Drop TOB file here, or</p>
                        <input
                          ref={(el) => fileInputRefs.current['tob'] = el}
                          type="file"
                          accept=".pdf,.xlsx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload('tob', file);
                          }}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRefs.current['tob']?.click()}
                        >
                          Browse Files
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Claims Report Upload */}
                <div>
                  <Label className="text-sm font-medium">
                    Upload Claims Report
                  </Label>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-4 text-center ${
                      uploadedFiles.claimsReport ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDrop={(e) => handleFileDrop('claimsReport', e)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {uploadedFiles.claimsReport ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-6 w-6 text-green-600 mr-2" />
                          <div className="text-left">
                            <p className="font-medium text-sm text-gray-900">{uploadedFiles.claimsReport.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(uploadedFiles.claimsReport.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile('claimsReport')}
                          className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm mb-2">Drop claims report here, or</p>
                        <input
                          ref={(el) => fileInputRefs.current['claimsReport'] = el}
                          type="file"
                          accept=".pdf,.xlsx"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload('claimsReport', file);
                          }}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRefs.current['claimsReport']?.click()}
                        >
                          Browse Files
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Remove All Files Button */}
                {(uploadedFiles.census || uploadedFiles.tob || uploadedFiles.claimsReport) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removeAllFiles}
                    className="w-full text-red-600 hover:text-red-700"
                  >
                    Remove All Files
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-5">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === 4}
          >
            {currentStep === 4 ? 'Submit' : 'Next'}
          </Button>
                 </div>
       </div>
     </BrokerLayout>
   );
 };

export default CreateNewCasePage;
