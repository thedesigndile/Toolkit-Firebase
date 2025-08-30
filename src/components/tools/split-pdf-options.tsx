
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, SlidersHorizontal, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SplitPdfOptionsProps {
  options: {
    mode: 'ranges' | 'extract';
    ranges: { from: number, to: number }[];
    extractMode: 'all' | 'odd' | 'even' | 'custom';
    selectedPages: string;
  };
  setOptions: (options: SplitPdfOptionsProps['options']) => void;
  totalPages: number;
}

export function SplitPdfOptions({ options, setOptions, totalPages }: SplitPdfOptionsProps) {
  const handleRangeChange = (index: number, field: 'from' | 'to', value: string) => {
    const newRanges = [...options.ranges];
    newRanges[index] = { ...newRanges[index], [field]: parseInt(value, 10) || 1 };
    setOptions({ ...options, ranges: newRanges });
  };

  const addRange = () => {
    setOptions({ ...options, ranges: [...options.ranges, { from: 1, to: 1 }] });
  };

  const removeRange = (index: number) => {
    const newRanges = options.ranges.filter((_, i) => i !== index);
    setOptions({ ...options, ranges: newRanges });
  };

  return (
    <div className="mt-6">
      <Tabs value={options.mode} onValueChange={(value) => setOptions({ ...options, mode: value as 'ranges' | 'extract' })} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ranges">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Split by range
          </TabsTrigger>
          <TabsTrigger value="extract">
            <FileText className="mr-2 h-4 w-4" /> Extract pages
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ranges">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h4 className="text-md font-semibold">Custom Ranges</h4>
              {options.ranges.map((range, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Label className="w-20">Range {index + 1}:</Label>
                  <Input
                    type="number"
                    placeholder="From"
                    value={range.from}
                    onChange={(e) => handleRangeChange(index, 'from', e.target.value)}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    placeholder="To"
                    value={range.to}
                    onChange={(e) => handleRangeChange(index, 'to', e.target.value)}
                    className="w-24"
                  />
                  {options.ranges.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => removeRange(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addRange}>
                <Plus className="mr-2 h-4 w-4" /> Add Range
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="extract">
          <Card>
            <CardContent className="pt-6 space-y-4">
               <Label>Pages to extract</Label>
               <Input 
                 placeholder="e.g. 1, 3-5, 8"
                 value={options.selectedPages}
                 onChange={(e) => setOptions({...options, selectedPages: e.target.value})}
               />
               <p className="text-xs text-muted-foreground">
                 Enter page numbers or ranges separated by commas.
               </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
