"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Settings,
  User,
  Bell,
  Moon,
  Trash2,
  Save,
  HelpCircle,
  Mic,
  Brain,
  Upload,
  Download,
  Check,
  Sun,
  Laptop,
  Volume2,
  VolumeX,
  Sparkles,
  Lock,
  FileDown,
  FileUp,
  Trash,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showSavedDialog, setShowSavedDialog] = useState(false)
  const [theme, setTheme] = useState("system")
  const [speechRate, setSpeechRate] = useState(1)
  const [voiceRecognitionSensitivity, setVoiceRecognitionSensitivity] = useState(0.7)

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/placeholder.svg?height=80&width=80",
    plan: "Premium",
    joinDate: "April 2025",
  }

  // Save settings
  const saveSettings = () => {
    // In a real app, this would save to your backend
    setShowSavedDialog(true)
    setTimeout(() => setShowSavedDialog(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-300 bg-card">
        <div className=" flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold">Settings</span>
          </div>
          <Button onClick={saveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 space-y-4">
            <div className="flex items-center gap-4 p-4 border border-gray-300 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{user.name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{user.plan}</Badge>
                  <Link href="/dashboard/billing" className="text-xs text-primary hover:underline">
                    Upgrade
                  </Link>
                </div>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-2">
                <h3 className="font-medium text-sm">Settings</h3>
              </div>
              <div className="p-2">
                <Tabs defaultValue="account" orientation="vertical" className="w-full">
                  <TabsList className="flex flex-col items-start h-auto bg-transparent p-0 space-y-1">
                    <TabsTrigger
                      value="account"
                      className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </TabsTrigger>
                    <TabsTrigger
                      value="appearance"
                      className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                    >
                      <Moon className="h-4 w-4 mr-2" />
                      Appearance
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                    >
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="voice"
                      className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Voice Settings
                    </TabsTrigger>
                    <TabsTrigger
                      value="ai"
                      className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      AI Preferences
                    </TabsTrigger>
                    <TabsTrigger
                      value="data"
                      className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-muted"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Data & Privacy
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <Card className="border-gray-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>Having trouble with settings? Our support team is here to help.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Settings Area */}
          <div className="flex-1">
            <Tabs defaultValue="account" className="w-full">
              {/* Account Settings */}
              <TabsContent value="account" className="space-y-6">
                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Manage your account details and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="space-y-2">
                      <Label>Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload New
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Update Password</Button>
                  </CardFooter>
                </Card>

                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>Manage your subscription plan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                      <div>
                        <h3 className="font-medium">Premium Plan</h3>
                        <p className="text-sm text-muted-foreground">$9.99/month</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="text-sm">
                      <p>Your subscription renews on May 15, 2025</p>
                      <ul className="mt-2 space-y-1">
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Unlimited flashcard decks</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Advanced AI answer generation</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Voice practice with feedback</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Detailed analytics and insights</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Manage Subscription</Button>
                    <Button variant="destructive">Cancel Subscription</Button>
                  </CardFooter>
                </Card>

                <Card className="border-red-200 dark:border-red-800">
                  <CardHeader>
                    <CardTitle className="text-red-500">Danger Zone</CardTitle>
                    <CardDescription>Irreversible account actions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Once you delete your account, all of your data will be permanently removed. This action cannot be
                      undone.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance" className="space-y-6">
                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>Customize the appearance of the application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <Label>Color Theme</Label>
                      <RadioGroup defaultValue={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem value="light" id="light" className="sr-only" />
                          <Label
                            htmlFor="light"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <Sun className="mb-3 h-6 w-6" />
                            Light
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="dark" id="dark" className="sr-only" />
                          <Label
                            htmlFor="dark"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <Moon className="mb-3 h-6 w-6" />
                            Dark
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="system" id="system" className="sr-only" />
                          <Label
                            htmlFor="system"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-300 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <Laptop className="mb-3 h-6 w-6" />
                            System
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="font-size">Font Size</Label>
                        <span className="text-sm">Default</span>
                      </div>
                      <Select defaultValue="default">
                        <SelectTrigger id="font-size">
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="x-large">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reduced-motion">Reduced Motion</Label>
                        <p className="text-xs text-muted-foreground">Minimize animations throughout the app</p>
                      </div>
                      <Switch id="reduced-motion" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="high-contrast">High Contrast</Label>
                        <p className="text-xs text-muted-foreground">Increase contrast for better visibility</p>
                      </div>
                      <Switch id="high-contrast" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>Dashboard Layout</CardTitle>
                    <CardDescription>Customize your dashboard experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Compact View</Label>
                        <p className="text-xs text-muted-foreground">Show more content with less spacing</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Statistics on Dashboard</Label>
                        <p className="text-xs text-muted-foreground">Display study statistics on the main dashboard</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show AI Suggestions</Label>
                        <p className="text-xs text-muted-foreground">Display AI-powered learning suggestions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Control how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Email Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-study-reminders">Study Reminders</Label>
                          <Switch id="email-study-reminders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-new-features">New Features</Label>
                          <Switch id="email-new-features" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-tips">Learning Tips & Insights</Label>
                          <Switch id="email-tips" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-marketing">Marketing & Promotions</Label>
                          <Switch id="email-marketing" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Push Notifications</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-study-reminders">Study Reminders</Label>
                          <Switch id="push-study-reminders" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-streak">Streak Notifications</Label>
                          <Switch id="push-streak" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="push-ai-insights">AI Insights</Label>
                          <Switch id="push-ai-insights" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="reminder-frequency">Study Reminder Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="reminder-frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="every-other-day">Every Other Day</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reminder-time">Preferred Reminder Time</Label>
                      <Select defaultValue="morning">
                        <SelectTrigger id="reminder-time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (8:00 AM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (2:00 PM)</SelectItem>
                          <SelectItem value="evening">Evening (7:00 PM)</SelectItem>
                          <SelectItem value="custom">Custom Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Test Notification
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Voice Settings */}
              <TabsContent value="voice" className="space-y-6">
                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>Voice Practice Settings</CardTitle>
                    <CardDescription>Customize your voice interaction experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Text-to-Speech</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="tts-enabled">Enable Text-to-Speech</Label>
                          <Switch id="tts-enabled" defaultChecked />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="voice-type">Voice Type</Label>
                            <span className="text-sm">Female</span>
                          </div>
                          <Select defaultValue="female">
                            <SelectTrigger id="voice-type">
                              <SelectValue placeholder="Select voice" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="neutral">Gender Neutral</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Speech Rate</Label>
                            <span className="text-sm">{speechRate}x</span>
                          </div>
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
                            <VolumeX className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-read-questions">Automatically Read Questions</Label>
                          <Switch id="auto-read-questions" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Voice Recognition</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="voice-recognition-enabled">Enable Voice Recognition</Label>
                          <Switch id="voice-recognition-enabled" defaultChecked />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label>Recognition Sensitivity</Label>
                            <span className="text-sm">
                              {voiceRecognitionSensitivity < 0.4
                                ? "Low"
                                : voiceRecognitionSensitivity < 0.7
                                  ? "Medium"
                                  : "High"}
                            </span>
                          </div>
                          <Slider
                            value={[voiceRecognitionSensitivity]}
                            min={0.1}
                            max={1}
                            step={0.1}
                            onValueChange={(value) => setVoiceRecognitionSensitivity(value[0])}
                            className="flex-1"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="background-noise-reduction">Background Noise Reduction</Label>
                          <Switch id="background-noise-reduction" defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-stop-recording">Auto-Stop Recording After Silence</Label>
                          <Switch id="auto-stop-recording" defaultChecked />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="language">Recognition Language</Label>
                      <Select defaultValue="en-US">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="es-ES">Spanish</SelectItem>
                          <SelectItem value="fr-FR">French</SelectItem>
                          <SelectItem value="de-DE">German</SelectItem>
                          <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                          <SelectItem value="ja-JP">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Test Voice Recognition</Button>
                    <Button variant="outline">Test Text-to-Speech</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* AI Preferences */}
              <TabsContent value="ai" className="space-y-6">
                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>AI Learning Assistant</CardTitle>
                    <CardDescription>Customize how AI helps with your learning</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ai-enabled">Enable AI Features</Label>
                          <p className="text-xs text-muted-foreground">
                            Use AI to generate answers, provide feedback, and create study plans
                          </p>
                        </div>
                        <Switch id="ai-enabled" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ai-suggestions">Show AI Suggestions</Label>
                          <p className="text-xs text-muted-foreground">Receive personalized learning recommendations</p>
                        </div>
                        <Switch id="ai-suggestions" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ai-answer-generation">AI Answer Generation</Label>
                          <p className="text-xs text-muted-foreground">
                            Automatically generate answers for your flashcard questions
                          </p>
                        </div>
                        <Switch id="ai-answer-generation" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ai-voice-feedback">AI Voice Response Feedback</Label>
                          <p className="text-xs text-muted-foreground">
                            Get AI feedback on your verbal responses during practice
                          </p>
                        </div>
                        <Switch id="ai-voice-feedback" defaultChecked />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="ai-model">AI Model Preference</Label>
                      <Select defaultValue="balanced">
                        <SelectTrigger id="ai-model">
                          <SelectValue placeholder="Select AI model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="balanced">Balanced (Default)</SelectItem>
                          <SelectItem value="creative">Creative</SelectItem>
                          <SelectItem value="precise">Precise</SelectItem>
                          <SelectItem value="fast">Fast</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        This affects how AI generates answers and provides feedback
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="answer-detail">Answer Detail Level</Label>
                      <Select defaultValue="standard">
                        <SelectTrigger id="answer-detail">
                          <SelectValue placeholder="Select detail level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="brief">Brief</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="detailed">Detailed</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        Controls the length and depth of AI-generated answers
                      </p>
                    </div>

                    <div className="p-4 bg-primary/5 rounded-lg border border-gray-300 flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Premium AI Features</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your Premium subscription includes access to advanced AI features, including detailed answer
                          generation, personalized study plans, and voice response analysis.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>AI Data & Privacy</CardTitle>
                    <CardDescription>Control how your data is used to improve AI features</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="improve-ai">Help Improve AI</Label>
                        <p className="text-xs text-muted-foreground">
                          Allow anonymous usage data to improve AI features
                        </p>
                      </div>
                      <Switch id="improve-ai" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="personalized-ai">Personalized AI Learning</Label>
                        <p className="text-xs text-muted-foreground">
                          Allow AI to learn from your study patterns to provide better recommendations
                        </p>
                      </div>
                      <Switch id="personalized-ai" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="voice-data">Store Voice Data</Label>
                        <p className="text-xs text-muted-foreground">
                          Store your voice recordings to improve voice recognition
                        </p>
                      </div>
                      <Switch id="voice-data" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Trash className="h-4 w-4 mr-2" />
                      Clear AI Learning Data
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Data & Privacy */}
              <TabsContent value="data" className="space-y-6">
                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Export, import, or delete your data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Export Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Download all your flashcards, study history, and account information
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <Button variant="outline">
                          <FileDown className="h-4 w-4 mr-2" />
                          Export All Data
                        </Button>
                        <Button variant="outline">
                          <FileDown className="h-4 w-4 mr-2" />
                          Export Flashcards Only
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Import Data</h3>
                      <p className="text-sm text-muted-foreground">
                        Import flashcards from a CSV file or another flashcard application
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <Button variant="outline">
                          <FileUp className="h-4 w-4 mr-2" />
                          Import from CSV
                        </Button>
                        <Button variant="outline">
                          <FileUp className="h-4 w-4 mr-2" />
                          Import from Anki
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Data Retention</h3>
                      <div className="space-y-4 mt-2">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="study-history">Study History</Label>
                            <p className="text-xs text-muted-foreground">How long to keep your study session data</p>
                          </div>
                          <Select defaultValue="1-year">
                            <SelectTrigger id="study-history" className="w-[180px]">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3-months">3 Months</SelectItem>
                              <SelectItem value="6-months">6 Months</SelectItem>
                              <SelectItem value="1-year">1 Year</SelectItem>
                              <SelectItem value="forever">Forever</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="voice-recordings">Voice Recordings</Label>
                            <p className="text-xs text-muted-foreground">How long to keep your voice practice data</p>
                          </div>
                          <Select defaultValue="30-days">
                            <SelectTrigger id="voice-recordings" className="w-[180px]">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7-days">7 Days</SelectItem>
                              <SelectItem value="30-days">30 Days</SelectItem>
                              <SelectItem value="90-days">90 Days</SelectItem>
                              <SelectItem value="never">Don't Store</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-300">
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Control your privacy and data sharing preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="analytics">Usage Analytics</Label>
                        <p className="text-xs text-muted-foreground">
                          Allow anonymous usage data to improve our service
                        </p>
                      </div>
                      <Switch id="analytics" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="public-profile">Public Profile</Label>
                        <p className="text-xs text-muted-foreground">
                          Allow other users to find and view your public decks
                        </p>
                      </div>
                      <Switch id="public-profile" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="third-party">Third-Party Data Sharing</Label>
                        <p className="text-xs text-muted-foreground">Share data with trusted third-party services</p>
                      </div>
                      <Switch id="third-party" />
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm text-yellow-800 dark:text-yellow-300">
                          California Privacy Rights (CCPA)
                        </h4>
                        <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                          As a California resident, you have additional rights regarding your personal information.
                          <Link href="/privacy/ccpa" className="underline ml-1">
                            Learn more
                          </Link>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
                      View Privacy Policy
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-500">Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone and all your data will be
              permanently lost.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">You will lose:</h4>
              <ul className="space-y-1 text-sm text-red-700 dark:text-red-400">
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>All your flashcard decks and study data</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Your study history and statistics</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Your premium subscription (no refunds)</span>
                </li>
                <li className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Access to shared decks and collaborations</span>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-delete">Type "DELETE" to confirm</Label>
              <Input id="confirm-delete" placeholder="DELETE" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Saved Dialog */}
      <Dialog open={showSavedDialog} onOpenChange={setShowSavedDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-2">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-semibold">Settings Saved</h2>
            <p className="text-center text-muted-foreground mt-1">Your settings have been updated successfully.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
