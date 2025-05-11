"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronLeft,
  Plus,
  Trash2,
  Save,
  Mic,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  X,
  Loader2,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

// Types for our flashcards
interface Flashcard {
  id: string;
  question: string;
  answer: string;
  tags: string[];
  lastStudied?: string;
  difficulty?: "easy" | "medium" | "hard";
}

interface DeckInfo {
  id: string;
  title: string;
  description: string;
  cardCount: number;
  tags: string[];
  isPublic: boolean;
}

export default function CreateFlashcardsPage() {
  // Deck information state
  const [deckInfo, setDeckInfo] = useState<DeckInfo>({
    id: "new-deck-" + Date.now(),
    title: "",
    description: "",
    cardCount: 0,
    tags: [],
    isPublic: false,
  });

  // Flashcards state
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [newTag, setNewTag] = useState("");
  const [isGeneratingAnswer, setIsGeneratingAnswer] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Initialize with an empty card if none exist
  useEffect(() => {
    if (flashcards.length === 0) {
      addNewCard();
    }
    // Update card count in deck info
    setDeckInfo((prev) => ({ ...prev, cardCount: flashcards.length }));
  }, [flashcards.length]);

  // Add a new flashcard
  const addNewCard = () => {
    const newCard: Flashcard = {
      id: `card-${Date.now()}-${flashcards.length}`,
      question: "",
      answer: "",
      tags: [],
    };
    setFlashcards([...flashcards, newCard]);
    setCurrentCardIndex(flashcards.length); // Set to the new card
  };

  // Update the current flashcard
  const updateCurrentCard = (
    field: keyof Flashcard,
    value: string | string[]
  ) => {
    const updatedCards = [...flashcards];
    updatedCards[currentCardIndex] = {
      ...updatedCards[currentCardIndex],
      [field]: value,
    };
    setFlashcards(updatedCards);
  };

  // Delete the current flashcard
  const deleteCurrentCard = () => {
    if (flashcards.length <= 1) {
      // Don't delete the last card, just clear it
      setFlashcards([
        {
          id: `card-${Date.now()}`,
          question: "",
          answer: "",
          tags: [],
        },
      ]);
      setCurrentCardIndex(0);
      return;
    }

    const updatedCards = flashcards.filter(
      (_, index) => index !== currentCardIndex
    );
    setFlashcards(updatedCards);

    // Adjust current index if needed
    if (currentCardIndex >= updatedCards.length) {
      setCurrentCardIndex(updatedCards.length - 1);
    }
  };

  // Navigate to previous card
  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  // Navigate to next card
  const goToNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  // Add tag to current card
  const addTagToCard = (tag: string) => {
    if (!tag.trim()) return;

    const currentCard = flashcards[currentCardIndex];
    if (!currentCard.tags.includes(tag)) {
      updateCurrentCard("tags", [...currentCard.tags, tag]);
    }
    setNewTag("");
  };

  // Remove tag from current card
  const removeTagFromCard = (tagToRemove: string) => {
    const currentCard = flashcards[currentCardIndex];
    updateCurrentCard(
      "tags",
      currentCard.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  // Add tag to deck
  const addTagToDeck = (tag: string) => {
    if (!tag.trim()) return;

    if (!deckInfo.tags.includes(tag)) {
      setDeckInfo({
        ...deckInfo,
        tags: [...deckInfo.tags, tag],
      });
    }
    setNewTag("");
  };

  // Remove tag from deck
  const removeTagFromDeck = (tagToRemove: string) => {
    setDeckInfo({
      ...deckInfo,
      tags: deckInfo.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Generate answer using AI
  const generateAnswer = async () => {
    const currentCard = flashcards[currentCardIndex];
    if (!currentCard.question.trim()) {
      return; // Don't generate if question is empty
    }

    setIsGeneratingAnswer(true);

    try {
      // Simulate AI response with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real app, this would be an API call to your AI service
      const generatedAnswer = `This is a simulated AI-generated answer for the question: "${currentCard.question}". 
      
In a real implementation, this would use Gemini AI to generate a comprehensive and accurate answer based on the question content.

The answer would include:
- Key concepts and definitions
- Relevant examples
- Clear explanations
- Important context

EchoLearn would then save this answer to help you study effectively.`;

      updateCurrentCard("answer", generatedAnswer);
    } catch (error) {
      console.error("Error generating answer:", error);
    } finally {
      setIsGeneratingAnswer(false);
    }
  };

  // Toggle voice recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      // In a real app, this would start the voice recording process
      console.log("Starting voice recording...");

      // Simulate recording for 3 seconds then stopping
      setTimeout(() => {
        setIsRecording(false);

        // Simulate transcription result
        const transcribedText =
          "This is a simulated voice transcription that would come from Vapi.ai in a real implementation.";

        // Update the current field (question or answer) based on which one is active
        // For this demo, we'll just append to the question
        const currentCard = flashcards[currentCardIndex];
        updateCurrentCard(
          "question",
          (currentCard.question ? currentCard.question + " " : "") +
            transcribedText
        );
      }, 3000);
    } else {
      // Stop recording
      console.log("Stopping voice recording...");
    }
  };

  // Save the deck
  const saveDeck = async () => {
    // Validate deck has a title
    if (!deckInfo.title.trim()) {
      alert("Please enter a deck title");
      return;
    }

    // Validate at least one card has content
    const hasValidCard = flashcards.some(
      (card) => card.question.trim() && card.answer.trim()
    );
    if (!hasValidCard) {
      alert(
        "Please create at least one complete flashcard with both question and answer"
      );
      return;
    }

    // In a real app, this would save to your backend
    console.log("Saving deck:", { deckInfo, flashcards });

    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to decks page (in a real app)
    alert("Deck saved successfully!");
    // window.location.href = "/dashboard/decks"
  };

  // Get the current card
  const currentCard = flashcards[currentCardIndex] || {
    id: "",
    question: "",
    answer: "",
    tags: [],
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-300 bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold">EchoLearn</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={saveDeck}>
              <Save className="h-4 w-4 mr-2" />
              Save Deck
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Deck Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle>Deck Information</CardTitle>
                <CardDescription>
                  Set up your flashcard deck details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deck-title">Deck Title</Label>
                  <Input
                    id="deck-title"
                    placeholder="e.g., Biology Midterm"
                    value={deckInfo.title}
                    onChange={(e) =>
                      setDeckInfo({ ...deckInfo, title: e.target.value })
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deck-description">Description</Label>
                  <Textarea
                    id="deck-description"
                    placeholder="What is this deck about?"
                    value={deckInfo.description}
                    onChange={(e) =>
                      setDeckInfo({ ...deckInfo, description: e.target.value })
                    }
                    rows={3}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="deck-tags">Tags</Label>
                    <span className="text-xs text-muted-foreground">
                      {deckInfo.tags.length} tags
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="deck-tags"
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addTagToDeck(newTag);
                          e.preventDefault();
                        }
                      }}
                      className="border-gray-300"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => addTagToDeck(newTag)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {deckInfo.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTagFromDeck(tag)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="public-deck">Public Deck</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow others to study your deck
                    </p>
                  </div>
                  <Switch
                    id="public-deck"
                    checked={deckInfo.isPublic}
                    onCheckedChange={(checked: any) =>
                      setDeckInfo({ ...deckInfo, isPublic: checked })
                    }
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-300 pt-4">
                <div className="w-full flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span>Cards in deck:</span>
                    <span className="font-medium">{flashcards.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated study time:</span>
                    <span className="font-medium">
                      {Math.max(5, flashcards.length * 2)} minutes
                    </span>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-gray-300">
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
                <CardDescription>
                  Let AI help you create better flashcards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  className="w-full gap-2"
                  onClick={generateAnswer}
                  disabled={isGeneratingAnswer}
                >
                  <Sparkles className="h-4 w-4" />
                  {isGeneratingAnswer
                    ? "Generating Answer..."
                    : "Generate Answer with AI"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={toggleRecording}
                >
                  <Mic
                    className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`}
                  />
                  {isRecording
                    ? "Recording... Click to Stop"
                    : "Record Voice Input"}
                </Button>
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">AI can help you:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Generate answers for your questions</li>
                    <li>Transcribe your voice to text</li>
                    <li>Suggest improvements to your cards</li>
                    <li>Create practice questions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Flashcard Editor */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Flashcard Editor</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={deleteCurrentCard}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Card
                </Button>
                <Button size="sm" onClick={addNewCard}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              </div>
            </div>

            <Card className="border-2 border-gray-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Card {currentCardIndex + 1} of {flashcards.length}
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goToPreviousCard}
                      disabled={currentCardIndex === 0}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      {currentCardIndex + 1}/{flashcards.length}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goToNextCard}
                      disabled={currentCardIndex === flashcards.length - 1}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="question" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="question">Question</TabsTrigger>
                    <TabsTrigger value="answer">Answer</TabsTrigger>
                  </TabsList>
                  <TabsContent value="question" className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="question">Question</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleRecording}
                              >
                                <Mic
                                  className={`h-4 w-4 ${
                                    isRecording ? "text-red-500" : ""
                                  }`}
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Record your question</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Textarea
                        id="question"
                        placeholder="Enter your question here..."
                        value={currentCard.question}
                        onChange={(e) =>
                          updateCurrentCard("question", e.target.value)
                        }
                        rows={6}
                        className="resize-none border-gray-300"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="answer" className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="answer">Answer</Label>
                        <div className="flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={toggleRecording}
                                >
                                  <Mic
                                    className={`h-4 w-4 ${
                                      isRecording ? "text-red-500" : ""
                                    }`}
                                  />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Record your answer</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={generateAnswer}
                                  disabled={isGeneratingAnswer}
                                >
                                  {isGeneratingAnswer ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Sparkles className="h-4 w-4" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Generate answer with AI</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      <Textarea
                        id="answer"
                        placeholder="Enter your answer here or generate with AI..."
                        value={currentCard.answer}
                        onChange={(e) =>
                          updateCurrentCard("answer", e.target.value)
                        }
                        rows={6}
                        className="resize-none"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="card-tags">Card Tags</Label>
                    <span className="text-xs text-muted-foreground">
                      {currentCard.tags.length} tags
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      id="card-tags"
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addTagToCard(newTag);
                          e.preventDefault();
                        }
                      }}
                      className="border-gray-300"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => addTagToCard(newTag)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {currentCard.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTagFromCard(tag)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousCard}
                disabled={currentCardIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Card
              </Button>
              {currentCardIndex === flashcards.length - 1 ? (
                <Button onClick={addNewCard}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Card
                </Button>
              ) : (
                <Button onClick={goToNextCard}>
                  Next Card
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Help Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Creating Effective Flashcards</DialogTitle>
            <DialogDescription>
              Tips to make your flashcards more effective for learning
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4 pr-2">
              <div>
                <h3 className="font-medium">
                  Keep questions clear and specific
                </h3>
                <p className="text-sm text-muted-foreground">
                  Instead of "What is photosynthesis?", try "What are the main
                  inputs and outputs of photosynthesis?"
                </p>
              </div>
              <div>
                <h3 className="font-medium">
                  Use the minimum information principle
                </h3>
                <p className="text-sm text-muted-foreground">
                  Break complex topics into multiple simple cards rather than
                  creating one complex card.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Include images when helpful</h3>
                <p className="text-sm text-muted-foreground">
                  Visual information is often easier to remember than text
                  alone.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Use voice practice</h3>
                <p className="text-sm text-muted-foreground">
                  Speaking answers out loud improves recall compared to just
                  reading them.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Tag your cards effectively</h3>
                <p className="text-sm text-muted-foreground">
                  Good tagging helps you organize and filter cards for targeted
                  study sessions.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Let AI help, but review answers</h3>
                <p className="text-sm text-muted-foreground">
                  AI-generated answers are helpful, but always review them for
                  accuracy and clarity.
                </p>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="flex items-center justify-between">
            <Button variant="outline" className="w-full">
              View Tutorial
            </Button>
            <Button className="w-full">Got It</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
