"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Siren, Phone } from "lucide-react";

export default function EmergencyPage() {
  const { toast } = useToast();

  const handleSendAlert = () => {
    // In a real application, this would trigger a backend process
    // (e.g., a Firebase Cloud Function) to send an SMS via Twilio.
    console.log("Emergency alert triggered!");
    toast({
      variant: "destructive",
      title: "Alert Sent",
      description: "Your emergency contact has been notified.",
    });
  };
  
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Emergency Contact</CardTitle>
          <CardDescription>
            Set up the person to contact in an emergency. This information is stored securely and only used when you trigger an alert.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Contact Name</Label>
            <Input id="contact-name" placeholder="e.g., Jane Smith" defaultValue="Dr. Eleanor Vance" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Contact Phone Number</Label>
            <Input id="contact-phone" type="tel" placeholder="e.g., 555-123-4567" defaultValue="555-867-5309"/>
          </div>
           <div className="space-y-2">
            <Label htmlFor="contact-relationship">Relationship</Label>
            <Input id="contact-relationship" placeholder="e.g., Spouse, Doctor" defaultValue="Primary Care Physician"/>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Contact</Button>
        </CardFooter>
      </Card>
      
      <Card className="border-destructive bg-destructive/10">
        <CardHeader>
            <div className="mx-auto w-fit rounded-full bg-destructive/20 p-4">
                <Siren className="h-10 w-10 text-destructive" />
            </div>
        </CardHeader>
        <CardContent className="text-center">
            <CardTitle className="font-headline text-xl text-destructive">Emergency Alert System</CardTitle>
            <CardDescription className="mt-2 text-destructive/80">
                If you are experiencing severe symptoms and believe you are having a medical emergency, press this button to notify your emergency contact.
            </CardDescription>
        </CardContent>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full text-lg py-6">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Send Alert Now
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will immediately send an emergency alert notification to your saved contact, Dr. Eleanor Vance. Only proceed if you believe you are in a medical emergency.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSendAlert} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                  Yes, Send Alert
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </div>
  );
}
