"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Calendar, CheckCircle } from "lucide-react";

export default function SymptomLogPage() {
  const { toast } = useToast();
  const [fatigue, setFatigue] = useState(5);
  const [nausea, setNausea] = useState(2);
  const [backPain, setBackPain] = useState(3);
  const [sleepQuality, setSleepQuality] = useState(7);
  const [stress, setStress] = useState(4);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Symptom data submitted");
    toast({
      title: "Log Saved",
      description: "Your daily symptoms have been successfully recorded.",
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
        <div className="flex items-center justify-center h-full min-h-[60vh]">
            <Card className="w-full max-w-md text-center shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit">
                        <CheckCircle className="w-10 h-10 text-primary" />
                    </div>
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-2xl font-headline">Thank You!</CardTitle>
                    <CardDescription className="mt-2">Your symptoms for today have been logged. You can log again tomorrow.</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => setIsSubmitted(false)} className="w-full">Log Again</Button>
                </CardFooter>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex justify-center items-start py-8">
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Daily Symptom Log</CardTitle>
        <CardDescription>
          Record your health indicators for today.
        </CardDescription>
        <div className="flex items-center text-sm text-muted-foreground pt-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="heart-rate">Heart Rate (bpm)</Label>
              <Input id="heart-rate" type="number" placeholder="e.g., 72" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blood-pressure">Blood Pressure (e.g. 120/80)</Label>
              <Input id="blood-pressure" placeholder="e.g., 120/80" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fatigue">Fatigue Level: {fatigue}</Label>
            <Slider
              id="fatigue"
              min={0}
              max={10}
              step={1}
              value={[fatigue]}
              onValueChange={(value) => setFatigue(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not at all</span>
                <span>Extremely</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nausea">Nausea Level: {nausea}</Label>
            <Slider
              id="nausea"
              min={0}
              max={10}
              step={1}
              value={[nausea]}
              onValueChange={(value) => setNausea(value[0])}
            />
             <div className="flex justify-between text-xs text-muted-foreground">
                <span>None</span>
                <span>Severe</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="back-pain">Back Pain Level: {backPain}</Label>
            <Slider
              id="back-pain"
              min={0}
              max={10}
              step={1}
              value={[backPain]}
              onValueChange={(value) => setBackPain(value[0])}
            />
             <div className="flex justify-between text-xs text-muted-foreground">
                <span>No pain</span>
                <span>Unbearable</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sleep">Sleep Quality: {sleepQuality}</Label>
            <Slider
              id="sleep"
              min={0}
              max={10}
              step={1}
              value={[sleepQuality]}
              onValueChange={(value) => setSleepQuality(value[0])}
            />
             <div className="flex justify-between text-xs text-muted-foreground">
                <span>Very Poor</span>
                <span>Excellent</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stress">Stress Level: {stress}</Label>
            <Slider
              id="stress"
              min={0}
              max={10}
              step={1}
              value={[stress]}
              onValueChange={(value) => setStress(value[0])}
            />
             <div className="flex justify-between text-xs text-muted-foreground">
                <span>Calm</span>
                <span>Very Stressed</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Save Today's Log
          </Button>
        </CardFooter>
      </form>
    </Card>
    </div>
  );
}
