"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  IntelligentPreventiveRemindersInput,
  IntelligentPreventiveRemindersOutput,
  intelligentPreventiveReminders,
} from "@/ai/flows/intelligent-preventive-reminders";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader, Bell, Clock, MessageSquare, Sparkles } from "lucide-react";

const formSchema = z.object({
  reminderType: z.enum(["checkup", "medication", "lifestyle"]),
  medicalHistory: z.string().min(1, "This field is required."),
  lifestyleFactors: z.string().min(1, "This field is required."),
  details: z.string().optional(),
  userId: z.string().optional(),
});

export default function RemindersPage() {
  const [reminder, setReminder] =
    useState<IntelligentPreventiveRemindersOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reminderType: "lifestyle",
      medicalHistory: "High cholesterol, currently on statins.",
      lifestyleFactors: "Works a 9-5 office job, tries to walk 30 mins a day.",
      details: "Remind me to take a short walk during my lunch break.",
      userId: "user-123",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReminder(null);
    try {
      const result = await intelligentPreventiveReminders(
        values as IntelligentPreventiveRemindersInput
      );
      setReminder(result);
    } catch (error) {
      console.error("Error getting reminder:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate reminder. Please try again.",
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
            Intelligent Reminders
          </CardTitle>
          <CardDescription>
            Generate a personalized health reminder powered by AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="reminderType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reminder Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a reminder type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="checkup">Check-up</SelectItem>
                        <SelectItem value="medication">Medication</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical History</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., High blood pressure..."
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
                        placeholder="e.g., Sedentary job, active on weekends..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Remind me about my annual physical."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Reminder
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
                <p className="text-muted-foreground">Crafting your reminder...</p>
            </CardContent>
            </Card>
        )}
        {reminder && (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-lg flex items-center gap-2"><Bell className="w-5 h-5"/> Your Personalized Reminder</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary"/> Reminder Message</h3>
                        <p className="text-muted-foreground bg-secondary p-4 rounded-md">{reminder.reminderMessage}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Clock className="w-4 h-4 text-primary"/> Suggested Delivery Time</h3>
                        <p className="text-muted-foreground font-bold text-lg">{reminder.deliveryTime}</p>
                    </div>
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}
