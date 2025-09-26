import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "Recognizing Atypical Heart Attack Symptoms in Women",
    description: "Did you know heart attack symptoms can be different for women? Learn to spot the subtle signs that are often missed.",
    tags: ["Symptoms", "Awareness"],
    imageId: "symptom-awareness",
  },
  {
    title: "The Heart-Healthy Plate: A Guide to Better Eating",
    description: "Discover the best foods for your cardiovascular health. Simple swaps can make a big difference.",
    tags: ["Diet", "Nutrition"],
    imageId: "healthy-lifestyle",
  },
  {
    title: "Stress and Your Heart: How to Manage It",
    description: "Chronic stress is a silent contributor to heart disease. Find practical techniques to protect your heart and mind.",
    tags: ["Lifestyle", "Mental Health"],
    imageId: "heart-health",
  },
  {
    title: "The Importance of Regular Check-ups",
    description: "Preventive care is your best defense. Understand which screenings you need and how often to get them.",
    tags: ["Prevention", "Screening"],
    imageId: "medical-checkup",
  },
  {
    title: "Finding Your Move: Fun Ways to Stay Active",
    description: "Exercise doesn't have to be a chore. Explore different activities to find what you love and get your heart pumping.",
    tags: ["Exercise", "Fitness"],
    imageId: "exercise-woman",
  },
  {
    title: "Decoding Blood Pressure Numbers",
    description: "What do 'systolic' and 'diastolic' really mean? A simple guide to understanding your blood pressure readings.",
    tags: ["Health Metrics", "Prevention"],
    imageId: "preventive-care",
  },
];

export default function EducationPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Learn & Discover</h1>
        <p className="text-muted-foreground">
          Knowledge is power. Empower yourself with information to protect your heart.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => {
          const image = PlaceHolderImages.find((img) => img.id === article.imageId);
          return (
            <Card key={article.title} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex gap-2 mb-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="font-headline text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{article.description}</CardDescription>
              </CardContent>
              <CardFooter>
                 <a href="#" className="flex items-center text-sm font-semibold text-primary hover:underline">
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                 </a>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
