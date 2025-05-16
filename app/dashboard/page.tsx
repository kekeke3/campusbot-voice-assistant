"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Bell,
  User,
  Home,
  BookMarked,
  Mic,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Play,
  Clock,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock data for the dashboard
  const recentDecks = [
    {
      id: 1,
      title: "Biology Midterm",
      cards: 42,
      progress: 68,
      lastStudied: "2 hours ago",
    },
    {
      id: 2,
      title: "Chemistry Formulas",
      cards: 28,
      progress: 45,
      lastStudied: "Yesterday",
    },
    {
      id: 3,
      title: "History Dates",
      cards: 56,
      progress: 22,
      lastStudied: "3 days ago",
    },
  ];

  const suggestedDecks = [
    {
      id: 4,
      title: "Physics Concepts",
      cards: 35,
      progress: 0,
      lastStudied: "Never",
    },
    {
      id: 5,
      title: "Spanish Vocabulary",
      cards: 120,
      progress: 12,
      lastStudied: "1 week ago",
    },
  ];

  const upcomingExams = [
    { id: 1, title: "Biology Final", date: "May 15, 2025", daysLeft: 5 },
    { id: 2, title: "Chemistry Quiz", date: "May 12, 2025", daysLeft: 2 },
  ];

  const studyStats = {
    cardsStudied: 247,
    minutesStudied: 186,
    daysStreak: 8,
    masteryScore: 76,
  };

  return (
    <div className=" flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <header className=" border-b border-gray-300 bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <ChevronRight
                className={`h-4 w-4 transition-all ${
                  sidebarOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] md:w-[300px] pl-8 border-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="relative border-gray-300"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Gerald Manatad
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, Gerald!
              </h1>
              <p className="text-muted-foreground">
                Continue your learning journey
              </p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button className="gap-2 bg-gray-800  text-white hover:bg-gray-700">
                <Plus className="h-4 w-4" />
                <span>New Deck</span>
              </Button>
              <Button
                variant="outline"
                className="gap-2 hover:bg-gray-100 border-gray-300"
              >
                <Play className="h-4 w-4" />
                <span>Quick Study</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-gray-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Cards Studied
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {studyStats.cardsStudied}
                </div>
                <p className="text-xs text-muted-foreground">
                  +24 from yesterday
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Study Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {studyStats.minutesStudied} min
                </div>
                <p className="text-xs text-muted-foreground">
                  +32 min from yesterday
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Day Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {studyStats.daysStreak} days
                </div>
                <p className="text-xs text-muted-foreground">Keep it up!</p>
              </CardContent>
            </Card>
            <Card className="border-gray-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mastery Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {studyStats.masteryScore}%
                </div>
                <p className="text-xs text-muted-foreground">
                  +2% from last week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="decks">
            <TabsList className="grid w-full grid-cols-3 md:w-[400px] ">
              <TabsTrigger value="decks">My Decks</TabsTrigger>
              <TabsTrigger value="exams">Upcoming Exams</TabsTrigger>
              <TabsTrigger value="ai">AI Suggestions</TabsTrigger>
            </TabsList>

            {/* Decks Tab */}
            <TabsContent value="decks" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Decks</h2>
                <Link href="/dashboard/decks">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-100"
                  >
                    View All
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentDecks.map((deck) => (
                  <Card
                    key={deck.id}
                    className="overflow-hidden border-gray-300"
                  >
                    <CardHeader className="pb-2">
                      <CardTitle>{deck.title}</CardTitle>
                      <CardDescription>{deck.cards} cards</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{deck.progress}%</span>
                      </div>
                      <Progress value={deck.progress} className="h-2" />
                      <div className="flex items-center gap-1 mt-4 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Last studied {deck.lastStudied}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        size="sm"
                        className="w-full bg-gray-900 text-white hover:bg-gray-700"
                      >
                        Study Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                <Card className="border-dashed border-gray-300 flex flex-col items-center justify-center p-6">
                  <div className="rounded-full bg-gray-900/10 p-3 mb-4">
                    <Plus className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="font-medium mb-1">Create New Deck</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Add questions and let AI generate answers
                  </p>
                  <Button className="bg-gray-900 text-white hover:bg-gray-700">
                    Create Deck
                  </Button>
                </Card>
              </div>
            </TabsContent>

            {/* Exams Tab */}
            <TabsContent value="exams" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Upcoming Exams</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-gray-100"
                >
                  Add Exam
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingExams.map((exam) => (
                  <Card key={exam.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{exam.title}</CardTitle>
                          <CardDescription>{exam.date}</CardDescription>
                        </div>
                        <Badge
                          variant={
                            exam.daysLeft <= 3 ? "destructive" : "outline"
                          }
                        >
                          {exam.daysLeft} days left
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Study progress</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" className=" hover:bg-gray-100">
                        View Study Plan
                      </Button>
                      <Button className="bg-gray-900 text-white hover:bg-gray-700">
                        Practice Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {upcomingExams.length === 0 && (
                <Card className="p-6 text-center">
                  <p>No upcoming exams. Add one to start preparing!</p>
                  <Button className="mt-4">Add Exam</Button>
                </Card>
              )}
            </TabsContent>

            {/* AI Suggestions Tab */}
            <TabsContent value="ai" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  AI-Powered Suggestions
                </h2>
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-purple-500" />
                    <CardTitle className="text-purple-700 dark:text-purple-300">
                      Voice Practice Recommendation
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Based on your study patterns, we recommend practicing your
                    Biology Midterm deck using voice mode. Your recall accuracy
                    improves 24% when you practice verbally!
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Start Voice Practice
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-gray-300">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <CardTitle>Suggested Deck</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Based on your upcoming Biology exam, we&apos;ve created a
                      suggested deck focusing on Cell Biology concepts you need
                      to review.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="hover:bg-gray-100">
                      Preview
                    </Button>
                    <Button className="bg-gray-900 text-white hover:bg-gray-700">
                      Add to My Decks
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-gray-300">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <CardTitle>Study Schedule</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>
                      We&apos;ve analyzed your learning patterns and created an
                      optimized study schedule for your upcoming exams.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" className="hover:bg-gray-100">
                      Learn More
                    </Button>
                    <Button className="bg-gray-900 text-white hover:bg-gray-700">
                      View Schedule
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
