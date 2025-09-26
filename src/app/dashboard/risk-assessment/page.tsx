"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  PersonalizedRiskAssessmentInput,
  PersonalizedRiskAssessmentOutput,
  personalizedRiskAssessment,
} from "@/ai/flows/personalized-risk-assessment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader, BarChart, FileText, Heart, ShieldCheck, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  age: z.coerce.number().min(1, "Age is required."),
  gender: z.enum(["female", "male", "other"]),
  medicalHistory: z.string().min(10, "Please provide more details."),
  lifestyleFactors: z.string().min(10, "Please provide more details."),
  dailyLogs: z.string().min(10, "Please provide more details."),
  otherMedicalIssues: z.string().optional(),
});

export default function RiskAssessmentPage() {
  const [assessment, setAssessment] =
    useState<PersonalizedRiskAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 45,
      gender: "female",
      medicalHistory: "Family history of heart disease, diagnosed with high blood pressure in 2020.",
      lifestyleFactors: "Desk job with limited physical activity, non-smoker, occasional alcohol consumption, diet includes processed foods.",
      dailyLogs: "Last week: fatigue levels averaged 6/10, experienced mild nausea twice, back pain on and off, sleep quality around 5/10, stress levels moderate at 6/10. Average heart rate: 75bpm. Average BP: 125/82 mmHg.",
      otherMedicalIssues: "None.",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAssessment(null);
    try {
      const result = await personalizedRiskAssessment(values as PersonalizedRiskAssessmentInput);
      setAssessment(result);
    } catch (error) {
      console.error("Error getting risk assessment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate risk assessment. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Personalized Risk Assessment
          </CardTitle>
          <CardDescription>
            Fill in your details to get an AI-powered heart attack risk
            assessment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 45" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Family history of heart disease, any past diagnoses..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                     <FormDescription>Focus on cardiovascular-related history.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="otherMedicalIssues"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Medical Issues (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Diabetes, kidney issues, etc."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lifestyleFactors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lifestyle Factors</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Diet, exercise, smoking habits, stress levels..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dailyLogs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recent Daily Logs Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Summary of fatigue, nausea, sleep, stress..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a summary of your health logs from the past week.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Heart className="mr-2 h-4 w-4" />
                )}
                Assess My Risk
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-8">
        {isLoading && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-10 gap-4">
              <Loader className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing your data...</p>
            </CardContent>
          </Card>
        )}
        {assessment && (
          <>
            <Card className="bg-primary/10 border-primary">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                 <div className="p-3 bg-primary/20 rounded-full">
                    <ShieldCheck className="w-6 h-6 text-primary"/>
                 </div>
                 <div>
                    <CardTitle className="font-headline text-lg">Overall Risk Level</CardTitle>
                    <p className="text-3xl font-bold text-primary-foreground">{assessment.riskLevel}</p>
                 </div>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-lg"><TrendingUp className="w-5 h-5"/> Key Risk Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{assessment.riskFactors}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-lg"><FileText className="w-5 h-5"/> Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{assessment.recommendations}</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
