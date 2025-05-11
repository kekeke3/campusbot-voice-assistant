"use client"

import { useState } from "react"
import {
  BookOpen,
  BarChart3,
  Clock,
  Award,
  TrendingUp,
  TrendingDown,
  Download,
  Share2,
  Sparkles,
  Brain,
  Zap,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for charts
// In a real app, you would use a charting library like Chart.js, Recharts, or D3.js
// For this example, we'll create simple visual representations

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState("week")
  const [showAIInsights, setShowAIInsights] = useState(false)

  // Mock statistics data
  const stats = {
    cardsStudied: 247,
    minutesStudied: 186,
    daysStreak: 8,
    masteryScore: 76,
    correctAnswers: 189,
    incorrectAnswers: 58,
    totalSessions: 12,
    averageSessionTime: 15.5,
    mostStudiedDeck: "Biology Midterm",
    mostDifficultTopic: "Cell Division",
    bestTimeOfDay: "Morning",
    weeklyProgress: [
      { day: "Mon", cards: 42, time: 32 },
      { day: "Tue", cards: 38, time: 28 },
      { day: "Wed", cards: 45, time: 35 },
      { day: "Thu", cards: 30, time: 22 },
      { day: "Fri", cards: 52, time: 40 },
      { day: "Sat", cards: 25, time: 18 },
      { day: "Sun", cards: 15, time: 11 },
    ],
    monthlyProgress: [
      { week: "Week 1", cards: 180, time: 145 },
      { week: "Week 2", cards: 220, time: 165 },
      { week: "Week 3", cards: 195, time: 150 },
      { week: "Week 4", cards: 247, time: 186 },
    ],
    topDecks: [
      { name: "Biology Midterm", cards: 120, progress: 85 },
      { name: "Chemistry Formulas", cards: 75, progress: 62 },
      { name: "History Dates", cards: 52, progress: 45 },
    ],
    topicMastery: [
      { topic: "Photosynthesis", mastery: 92 },
      { topic: "Cell Structure", mastery: 88 },
      { topic: "DNA Replication", mastery: 76 },
      { topic: "Cell Division", mastery: 65 },
      { topic: "Genetics", mastery: 72 },
    ],
    learningInsights: [
      "You learn 35% faster when studying in the morning",
      "Voice practice improves your retention by 28%",
      "You perform best on topics related to cellular biology",
      "Short, frequent sessions are more effective for you than long sessions",
      "Your recall accuracy has improved 12% in the last week",
    ],
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold">Learning Statistics</span>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Time Range</SelectLabel>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                  <SelectItem value="3months">Past 3 Months</SelectItem>
                  <SelectItem value="year">Past Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export Data</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6">
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cards Studied</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.cardsStudied}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">+24</span> from last {timeRange}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Study Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.minutesStudied} min</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">+32 min</span> from last {timeRange}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Day Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.daysStreak} days</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <Award className="h-3 w-3 mr-1 text-yellow-500" />
                  <span>Best streak: 12 days</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Mastery Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.masteryScore}%</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500 font-medium">+2%</span> from last {timeRange}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Button */}
          <Button
            variant="outline"
            className="w-full border-dashed border-2 h-auto py-3 flex items-center gap-2"
            onClick={() => setShowAIInsights(true)}
          >
            <div className="bg-primary/10 rounded-full p-2">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-medium">View AI Learning Insights</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations based on your study patterns
              </p>
            </div>
          </Button>

          {/* Tabs for different stat views */}
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="decks">Decks</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Study Sessions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Study Sessions</CardTitle>
                    <CardDescription>Your study activity over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-end justify-between gap-2">
                      {stats.weeklyProgress.map((day, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 w-full">
                          <div
                            className="bg-primary/80 rounded-t-sm w-full"
                            style={{ height: `${(day.cards / 60) * 100}px` }}
                          ></div>
                          <span className="text-xs">{day.day}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Total: {stats.totalSessions} sessions</span>
                    </div>
                  </CardFooter>
                </Card>

                {/* Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance</CardTitle>
                    <CardDescription>Your answer accuracy</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-[200px]">
                      <div className="relative h-40 w-40 rounded-full border-8 border-primary flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-8 border-muted-foreground/20 -rotate-[60deg]"></div>
                        <div className="text-center">
                          <div className="text-3xl font-bold">
                            {Math.round((stats.correctAnswers / (stats.correctAnswers + stats.incorrectAnswers)) * 100)}
                            %
                          </div>
                          <div className="text-xs text-muted-foreground">Accuracy</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-500">{stats.correctAnswers}</div>
                        <div className="text-xs text-muted-foreground">Correct</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-500">{stats.incorrectAnswers}</div>
                        <div className="text-xs text-muted-foreground">Incorrect</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Study Habits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Study Habits</CardTitle>
                    <CardDescription>When and how you study best</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Best time of day</span>
                        <span className="font-medium">{stats.bestTimeOfDay}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average session length</span>
                        <span className="font-medium">{stats.averageSessionTime} minutes</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Most productive day</span>
                        <span className="font-medium">Friday</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Voice practice sessions</span>
                        <span className="font-medium">42% of total</span>
                      </div>
                    </div>
                    <div className="pt-2">
                      <h4 className="text-sm font-medium mb-2">Time of day distribution</h4>
                      <div className="flex items-center gap-1 h-8">
                        <div className="bg-blue-200 dark:bg-blue-900 h-full rounded-l-sm w-[15%]"></div>
                        <div className="bg-blue-400 dark:bg-blue-700 h-full w-[35%]"></div>
                        <div className="bg-blue-600 dark:bg-blue-500 h-full w-[25%]"></div>
                        <div className="bg-blue-800 dark:bg-blue-300 h-full rounded-r-sm w-[25%]"></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Morning</span>
                        <span>Afternoon</span>
                        <span>Evening</span>
                        <span>Night</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Learning Insights</CardTitle>
                    <CardDescription>Patterns in your learning behavior</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {stats.learningInsights.map((insight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                          <span className="text-sm">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setShowAIInsights(true)}>
                      <Brain className="h-4 w-4 mr-2" />
                      View Detailed Insights
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Over Time</CardTitle>
                  <CardDescription>Your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex flex-col">
                    <div className="flex-1 flex items-end gap-4">
                      {stats.monthlyProgress.map((week, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full flex items-end h-full gap-2">
                            <div
                              className="w-1/2 bg-blue-500 rounded-t-sm"
                              style={{ height: `${(week.cards / 250) * 100}%` }}
                            ></div>
                            <div
                              className="w-1/2 bg-green-500 rounded-t-sm"
                              style={{ height: `${(week.time / 200) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{week.week}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-8 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                        <span className="text-sm">Cards Studied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        <span className="text-sm">Minutes Studied</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mastery Growth</CardTitle>
                    <CardDescription>Your knowledge mastery over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] relative">
                      {/* Simple line chart representation */}
                      <div className="absolute inset-0 flex items-end">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path
                            d="M0,80 L10,75 L20,72 L30,68 L40,65 L50,60 L60,55 L70,48 L80,40 L90,35 L100,30"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary"
                          />
                        </svg>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Daily Streak</CardTitle>
                    <CardDescription>Your consistency in studying</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 28 }).map((_, i) => (
                        <div
                          key={i}
                          className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                            i < 22
                              ? "bg-primary/80 text-primary-foreground"
                              : i === 22
                                ? "bg-yellow-500/80 text-primary-foreground"
                                : "bg-muted"
                          }`}
                        >
                          {i < 22 && <CheckCircle2 className="h-3 w-3" />}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>4 weeks ago</span>
                      <span>Today</span>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">Current Streak</h4>
                          <p className="text-sm text-muted-foreground">Keep it going!</p>
                        </div>
                        <div className="text-2xl font-bold flex items-center gap-2">
                          <Award className="h-5 w-5 text-yellow-500" />
                          {stats.daysStreak} days
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Decks Tab */}
            <TabsContent value="decks" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Deck Performance</CardTitle>
                  <CardDescription>How you're doing across different decks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {stats.topDecks.map((deck, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{deck.name}</h3>
                        <Badge variant={deck.progress > 80 ? "default" : deck.progress > 50 ? "secondary" : "outline"}>
                          {deck.progress}% Mastery
                        </Badge>
                      </div>
                      <Progress value={deck.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{deck.cards} cards</span>
                        <span>Last studied: 2 days ago</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View All Decks
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Study Time Distribution</CardTitle>
                    <CardDescription>Time spent on each deck</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center">
                      {/* Simple pie chart representation */}
                      <div className="relative h-40 w-40 rounded-full overflow-hidden">
                        <div
                          className="absolute bg-blue-500"
                          style={{
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            clipPath: "polygon(50% 50%, 0 0, 0 100%, 100% 100%, 100% 0)",
                          }}
                        ></div>
                        <div
                          className="absolute bg-green-500"
                          style={{
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            clipPath: "polygon(50% 50%, 100% 0, 0 0)",
                          }}
                        ></div>
                        <div
                          className="absolute bg-yellow-500"
                          style={{
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            clipPath: "polygon(50% 50%, 100% 100%, 100% 0)",
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-24 w-24 rounded-full bg-background"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                        <span className="text-sm flex-1">Biology Midterm</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                        <span className="text-sm flex-1">Chemistry Formulas</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                        <span className="text-sm flex-1">History Dates</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Most Challenging Cards</CardTitle>
                    <CardDescription>Cards you struggle with the most</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-md">
                        <h4 className="font-medium text-sm">What is the difference between mitosis and meiosis?</h4>
                        <p className="text-xs text-muted-foreground mt-1">Biology Midterm • 5 incorrect attempts</p>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <h4 className="font-medium text-sm">Explain the process of cellular respiration.</h4>
                        <p className="text-xs text-muted-foreground mt-1">Biology Midterm • 4 incorrect attempts</p>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <h4 className="font-medium text-sm">What are the four nucleotide bases in DNA?</h4>
                        <p className="text-xs text-muted-foreground mt-1">Biology Midterm • 3 incorrect attempts</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Practice Challenging Cards
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Topics Tab */}
            <TabsContent value="topics" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Topic Mastery</CardTitle>
                  <CardDescription>Your understanding of different topics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {stats.topicMastery.map((topic, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{topic.topic}</h3>
                        <Badge variant={topic.mastery > 80 ? "default" : topic.mastery > 60 ? "secondary" : "outline"}>
                          {topic.mastery}% Mastery
                        </Badge>
                      </div>
                      <Progress value={topic.mastery} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                          {topic.mastery > 80
                            ? "Excellent"
                            : topic.mastery > 60
                              ? "Good"
                              : topic.mastery > 40
                                ? "Fair"
                                : "Needs Work"}
                        </span>
                        <span>
                          {topic.mastery > 80
                            ? "Ready for advanced concepts"
                            : topic.mastery > 60
                              ? "Keep practicing"
                              : "Focus on this topic"}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Recommendations</CardTitle>
                    <CardDescription>Topics to focus on next</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md">
                        <div className="flex items-start gap-2">
                          <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                            <Zap className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Cell Division</h4>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              This topic has the lowest mastery score. Focus here to improve your overall understanding.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 border rounded-md">
                        <div className="flex items-start gap-2">
                          <div className="bg-primary/10 rounded-full p-1.5 mt-0.5">
                            <Zap className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Genetics</h4>
                            <p className="text-sm text-muted-foreground mt-0.5">
                              You're making good progress, but could benefit from more practice with genetic inheritance
                              patterns.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Create Study Plan
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning Style Analysis</CardTitle>
                    <CardDescription>How you learn most effectively</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Learning Modality Effectiveness</h4>
                        <div className="space-y-2">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Visual</span>
                              <span>65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Auditory</span>
                              <span>80%</span>
                            </div>
                            <Progress value={80} className="h-2" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Kinesthetic</span>
                              <span>45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>
                        </div>
                      </div>
                      <div className="pt-2">
                        <h4 className="text-sm font-medium mb-2">Recommendation</h4>
                        <p className="text-sm">
                          Your data suggests you learn best through auditory methods. Continue using voice practice for
                          optimal results.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* AI Insights Dialog */}
      <Dialog open={showAIInsights} onOpenChange={setShowAIInsights}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Learning Insights
            </DialogTitle>
            <DialogDescription>
              Personalized insights and recommendations based on your learning patterns
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto pr-2">
            <div className="p-4 bg-primary/5 rounded-lg border">
              <h3 className="font-medium text-lg mb-2">Your Learning Profile</h3>
              <p className="text-sm mb-4">
                Based on your study patterns, we've identified the following insights about how you learn most
                effectively:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Auditory Learner</h4>
                      <p className="text-sm text-muted-foreground">
                        You show 35% better retention when using voice practice compared to text-only review.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Morning Productivity</h4>
                      <p className="text-sm text-muted-foreground">
                        Your accuracy is 28% higher when studying between 7-10am compared to evening sessions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <BarChart3 className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Spaced Repetition</h4>
                      <p className="text-sm text-muted-foreground">
                        You retain information better with short, frequent study sessions rather than long cramming
                        sessions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Subject Affinity</h4>
                      <p className="text-sm text-muted-foreground">
                        You show strongest performance in cellular biology topics and concepts related to processes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recommended Study Schedule</CardTitle>
                  <CardDescription>Optimized for your learning patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full px-2 py-0.5 text-xs font-medium">
                        Monday
                      </div>
                      <span className="text-sm">7:30am - Biology (Voice Practice)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full px-2 py-0.5 text-xs font-medium">
                        Wednesday
                      </div>
                      <span className="text-sm">8:00am - Cell Division (Focus Topic)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full px-2 py-0.5 text-xs font-medium">
                        Friday
                      </div>
                      <span className="text-sm">7:45am - Review Challenging Cards</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full px-2 py-0.5 text-xs font-medium">
                        Weekend
                      </div>
                      <span className="text-sm">9:00am - Comprehensive Review</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Add to Calendar
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Focus Recommendations</CardTitle>
                  <CardDescription>Areas that need attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full p-1 mt-0.5">
                        <TrendingDown className="h-3 w-3" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Cell Division</h4>
                        <p className="text-xs text-muted-foreground">65% mastery - Needs improvement</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full p-1 mt-0.5">
                        <TrendingDown className="h-3 w-3" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Genetics</h4>
                        <p className="text-xs text-muted-foreground">72% mastery - Room for improvement</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full p-1 mt-0.5">
                        <TrendingUp className="h-3 w-3" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Photosynthesis</h4>
                        <p className="text-xs text-muted-foreground">92% mastery - Excellent!</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Create Focus Study Plan
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Long-term Learning Trajectory</CardTitle>
                <CardDescription>Your projected mastery over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] relative">
                  {/* Simple line chart representation */}
                  <div className="absolute inset-0 flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d="M0,70 L10,65 L20,60 L30,55 L40,50 L50,42 L60,35 L70,30 L80,25 L90,20 L100,15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-primary"
                      />
                      <path
                        d="M0,70 L10,68 L20,65 L30,62 L40,58 L50,55 L60,52 L70,48 L80,45 L90,42 L100,40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        className="text-muted-foreground"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-primary"></div>
                    <span className="text-xs">With AI recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-muted-foreground"></div>
                    <span className="text-xs">Current trajectory</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm">
                    Following our personalized recommendations could help you reach 90% mastery 3 weeks sooner than your
                    current pace.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowAIInsights(false)}>Apply Recommendations</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
