"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw } from "lucide-react";

interface UtilityOptionsProps {
  tool: string;
  options: Record<string, any>;
  setOptions: (options: Record<string, any>) => void;
  textInput?: string;
  setTextInput?: (text: string) => void;
  result?: string | number | object | null;
}

export function UtilityOptions({ tool, options, setOptions, textInput, setTextInput, result }: UtilityOptionsProps) {
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Could show a toast here
    });
  };

  const renderPasswordGenerator = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Password Length: {options.length}</Label>
          <Badge variant="outline">{getPasswordStrength()}</Badge>
        </div>
        <Slider
          value={[options.length]}
          onValueChange={(value) => setOptions({ ...options, length: value[0] })}
          max={50}
          min={4}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Short</span>
          <span>Very Long</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <Label className="text-sm font-medium">Character Types</Label>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(options.characterTypes || {
            lowercase: true,
            uppercase: true,
            numbers: true,
            symbols: false,
            similar: false,
            ambiguous: false
          }).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={value as boolean}
                onCheckedChange={(checked) => setOptions({
                  ...options,
                  characterTypes: { ...options.characterTypes, [key]: checked }
                })}
              />
              <Label htmlFor={key} className="text-sm capitalize">
                {key === 'similar' ? 'Exclude similar (i, l, 1, o, 0)' : 
                 key === 'ambiguous' ? 'Exclude ambiguous' : key}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <Label className="text-sm font-medium">Generated Password</Label>
          <div className="flex items-center space-x-2">
            <Input value={result as string} readOnly className="font-mono" />
            <Button
              size="icon"
              variant="outline"
              onClick={() => copyToClipboard(result as string)}
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Strength: {getPasswordStrength()} • Click to copy
          </div>
        </div>
      )}
    </div>
  );

  const getPasswordStrength = () => {
    const length = options.length || 12;
    const types = options.characterTypes || {};
    const typeCount = Object.values(types).filter(Boolean).length;
    
    if (length >= 16 && typeCount >= 3) return 'Very Strong';
    if (length >= 12 && typeCount >= 3) return 'Strong';
    if (length >= 8 && typeCount >= 2) return 'Medium';
    return 'Weak';
  };

  const renderQRGenerator = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="qr-text" className="text-sm font-medium">Text or URL</Label>
        <Textarea
          id="qr-text"
          value={textInput || ''}
          onChange={(e) => setTextInput?.(e.target.value)}
          placeholder="Enter text, URL, or data for QR code"
          className="min-h-[100px] resize-none"
        />
        <div className="text-xs text-muted-foreground">
          {(textInput || '').length} characters
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Size: {options.size}px</Label>
        </div>
        <Slider
          value={[options.size]}
          onValueChange={(value) => setOptions({ ...options, size: value[0] })}
          max={500}
          min={100}
          step={10}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Error Correction Level</Label>
        <Select
          value={options.errorCorrection || 'M'}
          onValueChange={(value) => setOptions({ ...options, errorCorrection: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="L">Low (7%)</SelectItem>
            <SelectItem value="M">Medium (15%)</SelectItem>
            <SelectItem value="Q">Quartile (25%)</SelectItem>
            <SelectItem value="H">High (30%)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Foreground Color</Label>
          <Input
            type="color"
            value={options.foregroundColor || '#000000'}
            onChange={(e) => setOptions({ ...options, foregroundColor: e.target.value })}
            className="w-full h-10"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Background Color</Label>
          <Input
            type="color"
            value={options.backgroundColor || '#ffffff'}
            onChange={(e) => setOptions({ ...options, backgroundColor: e.target.value })}
            className="w-full h-10"
          />
        </div>
      </div>
    </div>
  );

  const renderTextConverter = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="text-input" className="text-sm font-medium">Text to Convert</Label>
        <Textarea
          id="text-input"
          value={textInput || ''}
          onChange={(e) => setTextInput?.(e.target.value)}
          placeholder="Enter text to convert case"
          className="min-h-[120px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Conversion Type</Label>
        <Select
          value={options.operation}
          onValueChange={(value) => setOptions({ ...options, operation: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uppercase">UPPERCASE</SelectItem>
            <SelectItem value="lowercase">lowercase</SelectItem>
            <SelectItem value="title">Title Case</SelectItem>
            <SelectItem value="sentence">Sentence case</SelectItem>
            <SelectItem value="camel">camelCase</SelectItem>
            <SelectItem value="pascal">PascalCase</SelectItem>
            <SelectItem value="snake">snake_case</SelectItem>
            <SelectItem value="kebab">kebab-case</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Result</Label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(result as string)}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
          <Textarea
            value={result as string}
            readOnly
            className="min-h-[120px] resize-none bg-muted"
          />
        </div>
      )}
    </div>
  );

  const renderWordCounter = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="text-analysis" className="text-sm font-medium">Text to Analyze</Label>
        <Textarea
          id="text-analysis"
          value={textInput || ''}
          onChange={(e) => setTextInput?.(e.target.value)}
          placeholder="Enter text to analyze"
          className="min-h-[150px] resize-none"
        />
      </div>

      {textInput && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
          {result && Object.entries(result as Record<string, number>).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-primary">{value}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <Label className="text-sm font-medium">Analysis Options</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reading-time"
              checked={options.showReadingTime}
              onCheckedChange={(checked) => setOptions({ ...options, showReadingTime: checked })}
            />
            <Label htmlFor="reading-time" className="text-sm">
              Show estimated reading time
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="keyword-density"
              checked={options.showKeywordDensity}
              onCheckedChange={(checked) => setOptions({ ...options, showKeywordDensity: checked })}
            />
            <Label htmlFor="keyword-density" className="text-sm">
              Calculate keyword density
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBase64Tool = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="base64-input" className="text-sm font-medium">
          Text to {options.mode === 'encode' ? 'Encode' : 'Decode'}
        </Label>
        <Textarea
          id="base64-input"
          value={textInput || ''}
          onChange={(e) => setTextInput?.(e.target.value)}
          placeholder={`Enter text to ${options.mode === 'encode' ? 'encode to Base64' : 'decode from Base64'}`}
          className="min-h-[120px] resize-none font-mono text-sm"
        />
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Button
          variant={options.mode === 'encode' ? 'default' : 'outline'}
          onClick={() => setOptions({ ...options, mode: 'encode' })}
        >
          Encode
        </Button>
        <RefreshCw className="h-4 w-4 text-muted-foreground" />
        <Button
          variant={options.mode === 'decode' ? 'default' : 'outline'}
          onClick={() => setOptions({ ...options, mode: 'decode' })}
        >
          Decode
        </Button>
      </div>

      {result && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Result</Label>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyToClipboard(result as string)}
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
          <Textarea
            value={result as string}
            readOnly
            className="min-h-[120px] resize-none bg-muted font-mono text-sm"
          />
        </div>
      )}
    </div>
  );

  const getTitle = () => {
    switch (tool) {
      case 'Password Generator':
        return 'Password Settings';
      case 'QR Code Generator':
        return 'QR Code Options';
      case 'Text Case Converter':
        return 'Text Conversion';
      case 'Character & Word Counter':
        return 'Text Analysis';
      case 'Base64 Encoder/Decoder':
        return 'Base64 Tools';
      case 'URL Encoder/Decoder':
        return 'URL Processing';
      case 'Markdown <-> HTML':
        return 'Markdown Conversion';
      default:
        return 'Tool Options';
    }
  };

  const renderContent = () => {
    switch (tool) {
      case 'Password Generator':
        return renderPasswordGenerator();
      case 'QR Code Generator':
        return renderQRGenerator();
      case 'Text Case Converter':
        return renderTextConverter();
      case 'Character & Word Counter':
        return renderWordCounter();
      case 'Base64 Encoder/Decoder':
        return renderBase64Tool();
      default:
        return null;
    }
  };

  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold text-center mb-6">{getTitle()}</h3>
        {renderContent()}
      </CardContent>
    </Card>
  );
}