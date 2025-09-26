'use server';

/**
 * @fileOverview Implements the IntelligentPreventiveReminders flow, which delivers personalized and timely reminders
 * for preventive care, leveraging an LLM to determine the optimal timing and content of the reminders.
 *
 * - intelligentPreventiveReminders - The main function to trigger personalized reminders.
 * - IntelligentPreventiveRemindersInput - The input type for the function.
 * - IntelligentPreventiveRemindersOutput - The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntelligentPreventiveRemindersInputSchema = z.object({
  userId: z.string().describe('The ID of the user receiving the reminder.'),
  reminderType: z
    .enum(['checkup', 'medication', 'lifestyle'])
    .describe('The type of reminder to send.'),
  details: z
    .string()
    .optional()
    .describe('Additional details or context for the reminder.'),
  medicalHistory: z.string().describe('The medical history of the user.'),
  lifestyleFactors: z.string().describe('Lifestyle factors of the user.'),
});
export type IntelligentPreventiveRemindersInput = z.infer<
  typeof IntelligentPreventiveRemindersInputSchema
>;

const IntelligentPreventiveRemindersOutputSchema = z.object({
  reminderMessage: z.string().describe('The personalized reminder message.'),
  deliveryTime: z
    .string()
    .describe('The suggested delivery time for the reminder.'),
});
export type IntelligentPreventiveRemindersOutput = z.infer<
  typeof IntelligentPreventiveRemindersOutputSchema
>;

export async function intelligentPreventiveReminders(
  input: IntelligentPreventiveRemindersInput
): Promise<IntelligentPreventiveRemindersOutput> {
  return intelligentPreventiveRemindersFlow(input);
}

const prompt = ai.definePrompt({
  name: 'intelligentPreventiveRemindersPrompt',
  input: {schema: IntelligentPreventiveRemindersInputSchema},
  output: {schema: IntelligentPreventiveRemindersOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized and timely reminders for users to improve their preventive care.

  Based on the user's medical history: {{{medicalHistory}}}, lifestyle factors: {{{lifestyleFactors}}}, and the specific reminder type: {{{reminderType}}}, create a reminder message and suggest an optimal delivery time.

  The reminder message should be concise, encouraging, and relevant to the user's needs.
  The delivery time should be a specific time of day (e.g., "9:00 AM") and should consider when the user is most likely to take action. Take into account the user's lifestyle and the type of reminder.

  Details: {{{details}}}

  Format your response as follows:
  Reminder Message: [personalized reminder message]
  Delivery Time: [suggested delivery time]`,
});

const intelligentPreventiveRemindersFlow = ai.defineFlow(
  {
    name: 'intelligentPreventiveRemindersFlow',
    inputSchema: IntelligentPreventiveRemindersInputSchema,
    outputSchema: IntelligentPreventiveRemindersOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
