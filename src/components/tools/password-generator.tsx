
"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import zxcvbn from 'zxcvbn';
import { cn } from '@/lib/utils';

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charPool = '';
    if (includeLowercase) charPool += lowercaseChars;
    if (includeUppercase) charPool += uppercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (!charPool) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must select at least one character type.',
      });
      setGeneratedPassword('');
      return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }
    setGeneratedPassword(password);
    const strengthResult = zxcvbn(password);
    setPasswordStrength(strengthResult.score);

  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, toast]);

  const copyToClipboard = useCallback(() => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    toast({
        title: "Copied!",
        description: "Password copied to clipboard.",
    });
  }, [generatedPassword, toast]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return 'Weak';
      case 2:
        return 'Medium';
      case 3:
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  const strengthColorClass = () => {
    switch (passwordStrength) {
        case 0:
        case 1:
            return "bg-red-500";
        case 2:
            return "bg-yellow-500";
        case 3:
        case 4:
            return "bg-green-500";
        default:
            return "bg-muted";
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4 mx-auto">
            <KeyRound className="h-10 w-10 icon-gradient" />
        </div>
        <CardTitle className="text-2xl font-bold">
            Generate a secure password
        </CardTitle>
        <p className="text-muted-foreground mt-1 text-md">Create strong and random passwords to keep your accounts secure.</p>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="relative">
          <Input
            readOnly
            value={generatedPassword}
            className="pr-20 text-lg font-mono h-12 text-center"
            placeholder="Click 'Generate' to create a password"
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2 flex gap-1">
            <Button variant="ghost" size="icon" onClick={generatePassword} title="Generate new password">
              <RefreshCw className="h-5 w-5 icon-gradient" strokeWidth={1.5} />
            </Button>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy to clipboard" disabled={!generatedPassword}>
              <Copy className="h-5 w-5 icon-gradient" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
        
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden flex">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={cn("h-full w-1/4 transition-colors", passwordStrength >= i + 1 ? strengthColorClass() : 'bg-muted')} />
            ))}
        </div>
         <p className="text-sm text-center text-muted-foreground -mt-4">
            Strength: <span className="font-semibold">{getStrengthText()}</span>
        </p>
        
        <div className="space-y-4 pt-4">
            <div className='flex justify-between items-center'>
                <Label htmlFor="length-slider">Password Length</Label>
                <span className="font-semibold text-lg">{length}</span>
            </div>
            <Slider
                id="length-slider"
                min={8}
                max={64}
                step={1}
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
            />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
                <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(!!checked)} />
                <Label htmlFor="uppercase">Include Uppercase (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="lowercase" checked={includeLowercase} onCheckedChange={(checked) => setIncludeLowercase(!!checked)} />
                <Label htmlFor="lowercase">Include Lowercase (a-z)</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(!!checked)} />
                <Label htmlFor="numbers">Include Numbers (0-9)</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(!!checked)} />
                <Label htmlFor="symbols">Include Symbols (!@#...)</Label>
            </div>
        </div>

        <div className="mt-4 text-center">
            <Button size="lg" onClick={generatePassword}>
                <RefreshCw className="mr-2 h-4 w-4 icon-gradient" strokeWidth={1.5} />
                Generate Password
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
