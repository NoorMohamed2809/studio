'use server';

/**
 * @fileOverview This file implements the personalized risk assessment flow.
 *
 * - `personalizedRiskAssessment` - An async function that takes user data and returns a risk assessment.
 * - `PersonalizedRiskAssessmentInput` - The input type for the `personalizedRiskAssessment` function.
 * - `PersonalizedRiskAssessmentOutput` - The output type for the `personalizedRiskAssessment` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRiskAssessmentInputSchema = z.object({
  medicalHistory: z
    .string()
    .describe('Detailed medical history of the user.'),
  lifestyleFactors: z
    .string()
    .describe('Information about the user\'s lifestyle factors, including diet, exercise, smoking habits, and stress levels.'),
  dailyLogs: z
    .string()
    .describe('A summary of the user\'s daily health logs, including fatigue, nausea, back pain, sleep quality, stress levels, heart rate, and blood pressure.'),
});
export type PersonalizedRiskAssessmentInput = z.infer<
  typeof PersonalizedRiskAssessmentInputSchema
>;

const PersonalizedRiskAssessmentOutputSchema = z.object({
  riskLevel: z
    .string()
    .describe(
      'An overall risk level assessment (e.g., low, moderate, high) for heart attack, based on the provided data.'
    ),
  riskFactors: z
    .string()
    .describe(
      'A detailed explanation of the primary risk factors contributing to the assessed risk level.'
    ),
  recommendations: z
    .string()
    .describe(
      'Personalized recommendations for reducing risk, including lifestyle changes, medical checkups, and further monitoring.'
    ),
});
export type PersonalizedRiskAssessmentOutput = z.infer<
  typeof PersonalizedRiskAssessmentOutputSchema
>;

export async function personalizedRiskAssessment(
  input: PersonalizedRiskAssessmentInput
): Promise<PersonalizedRiskAssessmentOutput> {
  return personalizedRiskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedRiskAssessmentPrompt',
  input: {schema: PersonalizedRiskAssessmentInputSchema},
  output: {schema: PersonalizedRiskAssessmentOutputSchema},
  prompt: `You are an expert cardiologist providing personalized risk assessments for heart attack.

  Analyze the provided medical history, lifestyle factors, and daily health logs to determine the user's risk level, identify contributing risk factors, and provide personalized recommendations for risk reduction.

  Medical History: {{{medicalHistory}}}
  Lifestyle Factors: {{{lifestyleFactors}}}
  Daily Health Logs: {{{dailyLogs}}}

  Provide a concise risk level (low, moderate, or high), a detailed explanation of the contributing risk factors, and personalized recommendations for reducing risk.
  `,
});

const personalizedRiskAssessmentFlow = ai.defineFlow(
  {
    name: 'personalizedRiskAssessmentFlow',
    inputSchema: PersonalizedRiskAssessmentInputSchema,
    outputSchema: PersonalizedRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
