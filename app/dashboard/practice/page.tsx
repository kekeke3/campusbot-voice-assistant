"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import {
  BookOpen,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Settings,
  X,
  CheckCircle2,
  XCircle,
  Sparkles,
  Pause,
  Play,
  SkipForward,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock flashcard data
const mockFlashcards = [
  {
    id: "1",
    question: "What is photosynthesis?",
    answer:
      "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll. It converts carbon dioxide and water into glucose and oxygen.",
    tags: ["Biology", "Plants"],
  },
  {
    id: "2",
    question: "What are the main parts of a plant cell?",
    answer:
      "The main parts of a plant cell include the cell wall, cell membrane, cytoplasm, nucleus, mitochondria, chloroplasts, vacuole, endoplasmic reticulum, Golgi apparatus, and ribosomes.",
    tags: ["Biology", "Cells"],
  },
  {
    id: "3",
    question: "Explain the process of cellular respiration.",
    answer:
      "Cellular respiration is the process by which cells convert glucose and oxygen into energy in the form of ATP, along with carbon dioxide and water as byproducts. It occurs in the mitochondria and involves glycolysis, the Krebs cycle, and the electron transport chain.",
    tags: ["Biology", "Cellular Processes"],
  },
  {
    id: "4",
    question: "What is the difference between mitosis and meiosis?",
    answer:
      "Mitosis is cell division that results in two identical daughter cells, used for growth and repair. Meiosis is cell division that results in four genetically different daughter cells, used for sexual reproduction.",
    tags: ["Biology", "Cell Division"],
  },
  {
    id: "5",
    question: "What are the four nucleotide bases in DNA?",
    answer:
      "The four nucleotide bases in DNA are Adenine (A), Thymine (T), Guanine (G), and Cytosine (C). Adenine pairs with Thymine, and Guanine pairs with Cytosine.",
    tags: ["Biology", "Genetics"],
  },
]

// Mock decks
const mockDecks = [
  { id: "1", title: "Biology Midterm", cardCount: 42 },
  { id: "2", title: "Chemistry Formulas", cardCount: 28 },
  { id: "3", title: "History Dates", cardCount: 56 },
]

export default function VoicePracticePage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [speechRate, setSpeechRate] = useState(1)
  const [selectedDeck, setSelectedDeck] = useState("1")
  const [practiceMode, setPracticeMode] = useState<"voice" | "text">("voice")
  const [userResponse, setUserResponse] = useState("")
  const [responseAccuracy, setResponseAccuracy] = useState<"correct" | "incorrect" | null>(null)
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
    totalTime: 0,
  })
  const [sessionActive, setSessionActive] = useState(false)
  const [sessionPaused, setSessionPaused] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)

  // Start/stop session timer
  useEffect(() => {
    if (sessionActive && !sessionPaused) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [sessionActive, sessionPaused])

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Get current card
  const currentCard = mockFlashcards[currentCardIndex]

  // Start practice session
  const startSession = () => {
    setSessionActive(true)
    setSessionPaused(false)
    setCurrentCardIndex(0)
    setShowAnswer(false)
    setResponseAccuracy(null)
    setUserResponse("")
    setSessionStats({
      correct: 0,
      incorrect: 0,
      skipped: 0,
      totalTime: 0,
    })
    setElapsedTime(0)
  }

  // End practice session
  const endSession = () => {
    setSessionActive(false)
    setSessionPaused(false)
    setSessionStats((prev) => ({
      ...prev,
      totalTime: elapsedTime,
    }))
    setShowCompletionDialog(true)
  }

  // Toggle session pause
  const togglePause = () => {
    setSessionPaused(!sessionPaused)
  }

  // Go to next card
  const nextCard = () => {
    if (currentCardIndex < mockFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setShowAnswer(false)
      setResponseAccuracy(null)
      setUserResponse("")
    } else {
      // End of deck
      endSession()
    }
  }

  // Go to previous card
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setShowAnswer(false)
      setResponseAccuracy(null)
      setUserResponse("")
    }
  }

  // Toggle recording
  const toggleRecording = () => {
    if (sessionPaused) return

    setIsRecording(!isRecording)

    if (!isRecording) {
      // Simulate starting recording
      setTimeout(() => {
        // Simulate voice recognition result
        const simulatedResponse = "Photosynthesis is the process where plants use sunlight to create energy"
        setUserResponse(simulatedResponse)
        setIsRecording(false)
      }, 3000)
    }
  }

  // Toggle text-to-speech
  const toggleSpeech = () => {
    if (sessionPaused) return

    setIsSpeaking(!isSpeaking)

    if (!isSpeaking) {
      // Simulate text-to-speech
      setTimeout(() => {
        setIsSpeaking(false)
      }, 3000)
    }
  }

  // Check answer
  const checkAnswer = () => {
    if (!userResponse) return

    // In a real app, this would use AI to compare the user's response to the correct answer
    // For this demo, we'll randomly determine if the answer is correct
    const isCorrect = Math.random() > 0.5

    setResponseAccuracy(isCorrect ? "correct" : "incorrect")
    setSessionStats((prev) => ({
      ...prev,
      [isCorrect ? "correct" : "incorrect"]: prev[isCorrect ? "correct" : "incorrect"] + 1,
    }))
  }

  // Skip current card
  const skipCard = () => {
    setSessionStats((prev) => ({
      ...prev,
      skipped: prev.skipped + 1,
    }))
    nextCard()
  }

  // Calculate progress percentage
  const progressPercentage = ((currentCardIndex + 1) / mockFlashcards.length) * 100

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold">Voice Practice</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6">
        {!sessionActive ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Start Voice Practice Session</CardTitle>
                <CardDescription>
                  Practice answering flashcards using your voice to improve recall and speaking skills
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deck-select">Select Deck</Label>
                  <Select value={selectedDeck} onValueChange={setSelectedDeck}>
                    <SelectTrigger id="deck-select">
                      <SelectValue placeholder="Select a deck" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Your Decks</SelectLabel>
                        {mockDecks.map((deck) => (
                          <SelectItem key={deck.id} value={deck.id}>
                            {deck.title} ({deck.cardCount} cards)
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Practice Mode</Label>
                  <div className="flex items-center space-x-2">
                    <Tabs
                      defaultValue="voice"
                      className="w-full"
                      onValueChange={(v) => setPracticeMode(v as "voice" | "text")}
                    >
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="voice">
                          <Mic className="h-4 w-4 mr-2" />
                          Voice Mode
                        </TabsTrigger>
                        <TabsTrigger value="text">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Text Mode
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Speech Rate</Label>
                  <div className="flex items-center space-x-4">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={[speechRate]}
                      min={0.5}
                      max={2}
                      step={0.1}
                      onValueChange={(value) => setSpeechRate(value[0])}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium">{speechRate}x</span>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    Voice Practice Benefits
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span>Improves recall by 35% compared to silent review</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span>Enhances confidence in expressing concepts verbally</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span>AI provides feedback on your verbal responses</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span>Perfect for auditory learners and exam preparation</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={startSession}>
                  <Mic className="h-4 w-4 mr-2" />
                  Start Practice Session
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Session Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={togglePause}>
                  {sessionPaused ? <Play className="h-4 w-4 mr-2" /> : <Pause className="h-4 w-4 mr-2" />}
                  {sessionPaused ? "Resume" : "Pause"}
                </Button>
                <span className="text-sm font-medium">
                  Card {currentCardIndex + 1} of {mockFlashcards.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{formatTime(elapsedTime)}</span>
                <Button variant="destructive" size="sm" onClick={endSession}>
                  <X className="h-4 w-4 mr-2" />
                  End Session
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
            </div>

            {/* Flashcard */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {currentCard.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="icon" onClick={toggleSpeech} disabled={isSpeaking || sessionPaused}>
                    {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="min-h-[100px] text-lg font-medium">
                  <h3 className="text-sm text-muted-foreground mb-2">Question:</h3>
                  {currentCard.question}
                </div>

                {showAnswer && (
                  <div className="min-h-[100px] border-t pt-4">
                    <h3 className="text-sm text-muted-foreground mb-2">Answer:</h3>
                    <p>{currentCard.answer}</p>
                  </div>
                )}

                {practiceMode === "voice" && !showAnswer && (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Button
                        variant={isRecording ? "destructive" : "outline"}
                        size="lg"
                        className={`rounded-full h-16 w-16 ${isRecording ? "animate-pulse" : ""}`}
                        onClick={toggleRecording}
                        disabled={sessionPaused}
                      >
                        {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                      </Button>
                    </div>
                    {isRecording && (
                      <p className="text-center text-sm text-muted-foreground">
                        Listening... Speak your answer clearly
                      </p>
                    )}
                    {userResponse && !responseAccuracy && (
                      <div className="space-y-2">
                        <h3 className="text-sm text-muted-foreground">Your response:</h3>
                        <div className="p-3 bg-muted rounded-md">
                          <p>{userResponse}</p>
                        </div>
                        <div className="flex justify-center gap-2">
                          <Button onClick={checkAnswer} disabled={sessionPaused}>
                            Check Answer
                          </Button>
                        </div>
                      </div>
                    )}
                    {responseAccuracy && (
                      <div
                        className={`p-4 rounded-md ${responseAccuracy === "correct" ? "bg-green-100 dark:bg-green-900/20" : "bg-red-100 dark:bg-red-900/20"}`}
                      >
                        <div className="flex items-center gap-2">
                          {responseAccuracy === "correct" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          )}
                          <h3 className="font-medium">
                            {responseAccuracy === "correct" ? "Correct!" : "Not quite right"}
                          </h3>
                        </div>
                        <p className="text-sm mt-1">
                          {responseAccuracy === "correct"
                            ? "Great job! Your answer matches the key concepts."
                            : "Your answer missed some key concepts. Review the correct answer below."}
                        </p>
                        <Button variant="link" className="p-0 h-auto text-sm" onClick={() => setShowAnswer(true)}>
                          Show correct answer
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={prevCard} disabled={currentCardIndex === 0 || sessionPaused}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <div className="flex gap-2">
                  {!showAnswer && !userResponse && (
                    <Button variant="outline" onClick={() => setShowAnswer(true)} disabled={sessionPaused}>
                      Show Answer
                    </Button>
                  )}
                  <Button variant="outline" onClick={skipCard} disabled={sessionPaused}>
                    <SkipForward className="h-4 w-4 mr-2" />
                    Skip
                  </Button>
                </div>
                <Button onClick={nextCard} disabled={currentCardIndex === mockFlashcards.length - 1 || sessionPaused}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            {/* Session Stats */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Session Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Cards</p>
                    <p className="text-xl font-bold">
                      {currentCardIndex + 1}/{mockFlashcards.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Correct</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">{sessionStats.correct}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Incorrect</p>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">{sessionStats.incorrect}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Skipped</p>
                    <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{sessionStats.skipped}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Voice Practice Settings</DialogTitle>
            <DialogDescription>Customize your practice experience</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Text-to-Speech</Label>
                <p className="text-xs text-muted-foreground">Read questions aloud automatically</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-Check Answers</Label>
                <p className="text-xs text-muted-foreground">Check answers automatically after speaking</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Speech Rate</Label>
              <div className="flex items-center space-x-4">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[speechRate]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={(value) => setSpeechRate(value[0])}
                  className="flex-1"
                />
                <span className="text-sm font-medium">{speechRate}x</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Hints</Label>
                <p className="text-xs text-muted-foreground">Display hints when you're stuck</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Strict Grading</Label>
                <p className="text-xs text-muted-foreground">Require more precise answers</p>
              </div>
              <Switch />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowSettings(false)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Session Completion Dialog */}
      <Dialog open={showCompletionDialog} onOpenChange={setShowCompletionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Practice Session Complete!</DialogTitle>
            <DialogDescription>You've completed your voice practice session. Here's how you did:</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {sessionStats.correct + sessionStats.incorrect === 0
                      ? "0"
                      : Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.incorrect)) * 100)}
                    %
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatTime(elapsedTime)}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Correct</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">{sessionStats.correct}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Incorrect</p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">{sessionStats.incorrect}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Skipped</p>
                <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{sessionStats.skipped}</p>
              </div>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                AI Insights
              </h3>
              <p className="text-sm mb-2">Based on your performance, here are some recommendations:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Focus more on cellular processes concepts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Your explanation of photosynthesis was excellent</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Try practicing with the genetics deck next</span>
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="sm:flex-1" onClick={() => setShowCompletionDialog(false)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Practice Again
            </Button>
            <Button className="sm:flex-1" onClick={() => setShowCompletionDialog(false)}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
