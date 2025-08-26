
"use client";

import { useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    let charPool = lowercaseChars;
    if (includeUppercase) charPool += uppercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    if (charPool.length === 0) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "You must select at least one character type.",
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
  }, [length, includeUppercase, includeNumbers, includeSymbols, toast]);

  const copyToClipboard = useCallback(() => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    toast({
        title: "Copied!",
        description: "Password copied to clipboard.",
    });
  }, [generatedPassword, toast]);

  // Generate a password on initial render
  useState(generatePassword);

  return (
    <Card>
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
              <RefreshCw className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy to clipboard" disabled={!generatedPassword}>
              <Copy className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
            <div className='flex justify-between items-center'>
                <Label htmlFor="length">Password Length</Label>
                <span className="text-lg font-bold w-12 text-center">{length}</span>
            </div>
            <Slider
                id="length"
                min={8}
                max={64}
                step={1}
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
            />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
                <Checkbox id="uppercase" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(!!checked)} />
                <Label htmlFor="uppercase">Include Uppercase (A-Z)</Label>
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
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={generatePassword}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Password
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
