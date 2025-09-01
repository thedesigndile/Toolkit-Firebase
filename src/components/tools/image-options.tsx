"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface ImageOptionsProps {
  tool: string;
  options: any;
  setOptions: (options: any) => void;
}

export function ImageOptions({ tool, options, setOptions }: ImageOptionsProps) {
  const renderQualitySlider = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Quality: {options.quality}%</Label>
        <span className="text-xs text-muted-foreground">
          {options.quality > 80 ? 'High' : options.quality > 50 ? 'Medium' : 'Low'}
        </span>
      </div>
      <Slider
        value={[options.quality]}
        onValueChange={(value) => setOptions({ ...options, quality: value[0] })}
        max={100}
        min={10}
        step={5}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Smaller size</span>
        <span>Better quality</span>
      </div>
    </div>
  );

  const renderDimensionInputs = () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="width" className="text-sm font-medium">Width (px)</Label>
        <Input
          id="width"
          type="number"
          value={options.width}
          onChange={(e) => setOptions({ ...options, width: Number(e.target.value) })}
          min="1"
          max="4000"
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="height" className="text-sm font-medium">Height (px)</Label>
        <Input
          id="height"
          type="number"
          value={options.height}
          onChange={(e) => setOptions({ ...options, height: Number(e.target.value) })}
          min="1"
          max="4000"
          className="w-full"
        />
      </div>
      <div className="col-span-2 flex items-center space-x-2">
        <Switch
          id="maintain-aspect"
          checked={options.maintainAspectRatio}
          onCheckedChange={(checked) => setOptions({ ...options, maintainAspectRatio: checked })}
        />
        <Label htmlFor="maintain-aspect" className="text-sm">Maintain aspect ratio</Label>
      </div>
    </div>
  );

  const renderFormatSelect = () => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Output Format</Label>
      <Select
        value={options.format}
        onValueChange={(value) => setOptions({ ...options, format: value })}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="jpg">JPEG (smaller size)</SelectItem>
          <SelectItem value="png">PNG (lossless)</SelectItem>
          <SelectItem value="webp">WebP (modern, efficient)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const renderCropSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium">X Position</Label>
          <Input
            type="number"
            value={options.x}
            onChange={(e) => setOptions({ ...options, x: Number(e.target.value) })}
            min="0"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Y Position</Label>
          <Input
            type="number"
            value={options.y}
            onChange={(e) => setOptions({ ...options, y: Number(e.target.value) })}
            min="0"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Width</Label>
          <Input
            type="number"
            value={options.cropWidth}
            onChange={(e) => setOptions({ ...options, cropWidth: Number(e.target.value) })}
            min="1"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium">Height</Label>
          <Input
            type="number"
            value={options.cropHeight}
            onChange={(e) => setOptions({ ...options, cropHeight: Number(e.target.value) })}
            min="1"
            className="w-full"
          />
        </div>
      </div>
      <div className="text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOptions({ ...options, x: 0, y: 0, cropWidth: 100, cropHeight: 100 })}
        >
          Reset Crop
        </Button>
      </div>
    </div>
  );

  const renderRotationOptions = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {[90, 180, 270, -90].map(angle => (
          <Button
            key={angle}
            variant={options.angle === angle ? "default" : "outline"}
            size="sm"
            onClick={() => setOptions({ ...options, angle })}
            className="text-xs"
          >
            {angle > 0 ? `${angle}°` : `${Math.abs(angle)}° CCW`}
          </Button>
        ))}
      </div>
      <div className="space-y-2">
        <Label className="text-sm font-medium">Custom Angle: {options.customAngle}°</Label>
        <Slider
          value={[options.customAngle]}
          onValueChange={(value) => setOptions({ ...options, customAngle: value[0], angle: value[0] })}
          max={360}
          min={-360}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );

  const renderEnhancementControls = () => (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Brightness: {options.brightness}%</Label>
        </div>
        <Slider
          value={[options.brightness]}
          onValueChange={(value) => setOptions({ ...options, brightness: value[0] })}
          max={200}
          min={50}
          step={5}
          className="w-full"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Contrast: {options.contrast}%</Label>
        </div>
        <Slider
          value={[options.contrast]}
          onValueChange={(value) => setOptions({ ...options, contrast: value[0] })}
          max={200}
          min={50}
          step={5}
          className="w-full"
        />
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Saturation: {options.saturation}%</Label>
        </div>
        <Slider
          value={[options.saturation]}
          onValueChange={(value) => setOptions({ ...options, saturation: value[0] })}
          max={200}
          min={0}
          step={5}
          className="w-full"
        />
      </div>
      <div className="text-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOptions({ 
            ...options, 
            brightness: 100, 
            contrast: 100, 
            saturation: 100 
          })}
        >
          Reset to Default
        </Button>
      </div>
    </div>
  );

  const getTitle = () => {
    switch (tool) {
      case 'Compress Image':
      case 'Image Compressor':
        return 'Compression Settings';
      case 'Resize Image':
      case 'Image Resizer':
        return 'Resize Settings';
      case 'Convert Image':
      case 'Image Converter':
        return 'Format Conversion';
      case 'Crop Image':
        return 'Crop Settings';
      case 'Rotate Image':
        return 'Rotation Settings';
      case 'Photo Editor':
        return 'Enhancement Settings';
      default:
        return 'Image Settings';
    }
  };

  const renderContent = () => {
    switch (tool) {
      case 'Compress Image':
      case 'Image Compressor':
        return (
          <>
            {renderQualitySlider()}
            <div className="mt-4">
              {renderFormatSelect()}
            </div>
          </>
        );
      case 'Resize Image':
      case 'Image Resizer':
        return renderDimensionInputs();
      case 'Convert Image':
      case 'Image Converter':
        return (
          <>
            {renderFormatSelect()}
            {(options.format === 'jpg' || options.format === 'webp') && (
              <div className="mt-4">
                {renderQualitySlider()}
              </div>
            )}
          </>
        );
      case 'Crop Image':
        return renderCropSettings();
      case 'Rotate Image':
        return renderRotationOptions();
      case 'Photo Editor':
        return renderEnhancementControls();
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