
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, Zap, Gem } from "lucide-react";

interface CompressPdfOptionsProps {
  level: string;
  setLevel: (level: string) => void;
}

export function CompressPdfOptions({ level, setLevel }: CompressPdfOptionsProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4 text-center">Compression Level</h3>
      <RadioGroup value={level} onValueChange={setLevel} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Label htmlFor="compress-low" className="cursor-pointer">
          <Card className={`p-4 border-2 ${level === 'low' ? 'border-primary' : 'border-border'}`}>
            <div className="flex items-center gap-4">
              <RadioGroupItem value="low" id="compress-low" />
              <div className="text-center flex-1">
                <Shield className="mx-auto h-8 w-8 mb-2 text-blue-500" />
                <h4 className="font-semibold">Low Compression</h4>
                <p className="text-xs text-muted-foreground">High Quality, large file size</p>
              </div>
            </div>
          </Card>
        </Label>
        <Label htmlFor="compress-recommended" className="cursor-pointer">
          <Card className={`p-4 border-2 ${level === 'recommended' ? 'border-primary' : 'border-border'}`}>
            <div className="flex items-center gap-4">
              <RadioGroupItem value="recommended" id="compress-recommended" />
              <div className="text-center flex-1">
                <Zap className="mx-auto h-8 w-8 mb-2 text-green-500" />
                <h4 className="font-semibold">Recommended</h4>
                <p className="text-xs text-muted-foreground">Good quality, balanced size</p>
              </div>
            </div>
          </Card>
        </Label>
        <Label htmlFor="compress-extreme" className="cursor-pointer">
          <Card className={`p-4 border-2 ${level === 'extreme' ? 'border-primary' : 'border-border'}`}>
            <div className="flex items-center gap-4">
              <RadioGroupItem value="extreme" id="compress-extreme" />
              <div className="text-center flex-1">
                <Gem className="mx-auto h-8 w-8 mb-2 text-red-500" />
                <h4 className="font-semibold">Extreme Compression</h4>
                <p className="text-xs text-muted-foreground">Smallest size, lower quality</p>
              </div>
            </div>
          </Card>
        </Label>
      </RadioGroup>
    </div>
  );
}
