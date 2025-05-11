"use client"

import { useState } from "react"
import Link from "next/link"
import { Settings, User, Bell, Moon, Trash2, Save, HelpCircle, Mic, Brain, Upload, Download, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

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
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between p-4">
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
      <main className="flex-1 container py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
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

            <div className="border rounded-lg overflow-hidden">
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

            <Card>
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
                <Card>
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

                <Card>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>Manage your subscription plan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
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
              <TabsContent value="appearance" className="\
