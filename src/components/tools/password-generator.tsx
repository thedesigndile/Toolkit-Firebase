
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
  const [numberOfNumbers, setNumberOfNumbers] = useState(4);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const { toast } = useToast();

  const generatePassword = useCallback(() => {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (!includeUppercase && !includeNumbers && !includeSymbols) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'You must select at least one character type.',
      });
      setGeneratedPassword('');
      return;
    }
    
    if(includeNumbers && numberOfNumbers > length) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Number of digits cannot exceed password length.',
      });
      return;
    }

    let passwordChars: string[] = [];
    
    // 1. Add guaranteed numbers
    if (includeNumbers) {
        for (let i = 0; i < numberOfNumbers; i++) {
            const randomIndex = Math.floor(Math.random() * numberChars.length);
            passwordChars.push(numberChars[randomIndex]);
        }
    }
    
    // 2. Build the pool for the remaining characters
    let remainingCharPool = lowercaseChars;
    if (includeUppercase) remainingCharPool += uppercaseChars;
    if (includeSymbols) remainingCharPool += symbolChars;
    // If numbers are also an option for the remainder, add them.
    if(includeNumbers) remainingCharPool += numberChars;

    // 3. Fill the rest of the password length
    const remainingLength = length - passwordChars.length;
    for (let i = 0; i < remainingLength; i++) {
        const randomIndex = Math.floor(Math.random() * remainingCharPool.length);
        passwordChars.push(remainingCharPool[randomIndex]);
    }

    // 4. Shuffle the array to ensure random character placement
    for (let i = passwordChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
    }

    setGeneratedPassword(passwordChars.join(''));

  }, [length, includeUppercase, includeNumbers, includeSymbols, numberOfNumbers, toast]);

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
                <Label htmlFor="length-input">Password Length</Label>
                <Input
                    id="length-input"
                    type="number"
                    min={8}
                    max={64}
                    value={length}
                    onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                            setLength(Math.max(8, Math.min(64, val)));
                        }
                    }}
                    className="w-20 text-center"
                />
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
                <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(!!checked)} />
                <Label htmlFor="symbols">Include Symbols (!@#...)</Label>
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="flex items-center space-x-2">
                <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(!!checked)} />
                <Label htmlFor="numbers">Include Numbers (0-9)</Label>
            </div>
            {includeNumbers && (
              <div className="flex items-center gap-2">
                <Label htmlFor="numberOfNumbers" className="whitespace-nowrap">Number of digits</Label>
                <Input
                    id="numberOfNumbers"
                    type="number"
                    min={0}
                    max={length}
                    value={numberOfNumbers}
                    onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                            setNumberOfNumbers(Math.max(0, Math.min(length, val)));
                        }
                    }}
                    className="h-9 w-20"
                />
              </div>
            )}
        </div>


        <div className="mt-4 text-center">
            <Button size="lg" onClick={generatePassword}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate Password
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
