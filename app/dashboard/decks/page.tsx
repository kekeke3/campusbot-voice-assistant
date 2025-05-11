"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Search,
  Plus,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  Star,
  Clock,
  Trash2,
  Edit,
  Copy,
  Share,
  Download,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Mock data for decks
const mockDecks = [
  {
    id: "1",
    title: "Biology Midterm",
    description: "Key concepts for the biology midterm exam",
    cardCount: 42,
    progress: 68,
    lastStudied: "2 hours ago",
    tags: ["Biology", "Science", "Midterm"],
    isPublic: true,
    isFavorite: true,
    createdAt: "2025-04-15",
    completedCards: 28,
    masteryScore: 76,
  },
  {
    id: "2",
    title: "Chemistry Formulas",
    description: "Important chemical formulas and equations",
    cardCount: 28,
    progress: 45,
    lastStudied: "Yesterday",
    tags: ["Chemistry", "Science", "Formulas"],
    isPublic: false,
    isFavorite: false,
    createdAt: "2025-04-10",
    completedCards: 12,
    masteryScore: 62,
  },
  {
    id: "3",
    title: "History Dates",
    description: "Important historical dates and events",
    cardCount: 56,
    progress: 22,
    lastStudied: "3 days ago",
    tags: ["History", "Dates", "Events"],
    isPublic: true,
    isFavorite: true,
    createdAt: "2025-04-05",
    completedCards: 12,
    masteryScore: 45,
  },
  {
    id: "4",
    title: "Spanish Vocabulary",
    description: "Common Spanish words and phrases",
    cardCount: 120,
    progress: 12,
    lastStudied: "1 week ago",
    tags: ["Spanish", "Language", "Vocabulary"],
    isPublic: false,
    isFavorite: false,
    createdAt: "2025-03-28",
    completedCards: 15,
    masteryScore: 38,
  },
  {
    id: "5",
    title: "Physics Concepts",
    description: "Fundamental physics concepts and formulas",
    cardCount: 35,
    progress: 0,
    lastStudied: "Never",
    tags: ["Physics", "Science", "Concepts"],
    isPublic: false,
    isFavorite: false,
    createdAt: "2025-04-18",
    completedCards: 0,
    masteryScore: 0,
  },
  {
    id: "6",
    title: "Programming Algorithms",
    description: "Common programming algorithms and data structures",
    cardCount: 48,
    progress: 85,
    lastStudied: "Today",
    tags: ["Programming", "Algorithms", "Computer Science"],
    isPublic: true,
    isFavorite: true,
    createdAt: "2025-03-15",
    completedCards: 41,
    masteryScore: 92,
  },
]

export default function DecksPage() {
  const [decks, setDecks] = useState(mockDecks)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("lastStudied")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deckToDelete, setDeckToDelete] = useState<string | null>(null)

  // Get all unique tags from decks
  const allTags = Array.from(new Set(decks.flatMap((deck) => deck.tags)))

  // Filter decks based on search query and selected tags
  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => deck.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  // Sort decks based on selected sort option
  const sortedDecks = [...filteredDecks].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title)
      case "cardCount":
        return b.cardCount - a.cardCount
      case "progress":
        return b.progress - a.progress
      case "createdAt":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "lastStudied":
      default:
        // Simple sort for mock data - in a real app, you'd parse dates properly
        if (a.lastStudied === "Never") return 1
        if (b.lastStudied === "Never") return -1
        if (a.lastStudied === "Today") return -1
        if (b.lastStudied === "Today") return 1
        return a.lastStudied.localeCompare(b.lastStudied)
    }
  })

  // Toggle favorite status
  const toggleFavorite = (deckId: string) => {
    setDecks(decks.map((deck) => (deck.id === deckId ? { ...deck, isFavorite: !deck.isFavorite } : deck)))
  }

  // Delete deck
  const deleteDeck = () => {
    if (deckToDelete) {
      setDecks(decks.filter((deck) => deck.id !== deckToDelete))
      setDeckToDelete(null)
      setShowDeleteDialog(false)
    }
  }

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold">My Decks</span>
          </div>
          <Link href="/dashboard/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Deck
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6">
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search decks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-y-auto p-2">
                    {allTags.map((tag) => (
                      <div key={tag} className="flex items-center space-x-2 py-1">
                        <Checkbox
                          id={`tag-${tag}`}
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => toggleTag(tag)}
                        />
                        <Label htmlFor={`tag-${tag}`} className="text-sm cursor-pointer">
                          {tag}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedTags([])}>
                      Clear Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    <SelectItem value="lastStudied">Last Studied</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="cardCount">Card Count</SelectItem>
                    <SelectItem value="progress">Progress</SelectItem>
                    <SelectItem value="createdAt">Date Created</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <div className="flex items-center border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-none"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Deck Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Decks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{decks.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{decks.reduce((sum, deck) => sum + deck.cardCount, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Cards Mastered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{decks.reduce((sum, deck) => sum + deck.completedCards, 0)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Mastery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(decks.reduce((sum, deck) => sum + deck.masteryScore, 0) / decks.length)}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for deck categories */}
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Decks</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="recent">Recently Studied</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {sortedDecks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No decks found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchQuery || selectedTags.length > 0
                      ? "Try adjusting your search or filters"
                      : "Create your first flashcard deck to get started"}
                  </p>
                  {(searchQuery || selectedTags.length > 0) && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSearchQuery("")
                        setSelectedTags([])
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                  {!searchQuery && selectedTags.length === 0 && (
                    <Link href="/dashboard/create">
                      <Button className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Deck
                      </Button>
                    </Link>
                  )}
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedDecks.map((deck) => (
                    <Card key={deck.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <CardTitle className="flex items-center">
                              {deck.title}
                              {deck.isFavorite && <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />}
                            </CardTitle>
                            <CardDescription>{deck.description}</CardDescription>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toggleFavorite(deck.id)}>
                                <Star
                                  className={`h-4 w-4 mr-2 ${deck.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`}
                                />
                                {deck.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Deck
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share className="h-4 w-4 mr-2" />
                                Share
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Export
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-500 focus:text-red-500"
                                onClick={() => {
                                  setDeckToDelete(deck.id)
                                  setShowDeleteDialog(true)
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {deck.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
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
                      <CardFooter className="pt-0 flex gap-2">
                        <Button size="sm" className="flex-1">
                          Study
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Practice
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {sortedDecks.map((deck) => (
                    <div
                      key={deck.id}
                      className="flex items-center border rounded-md p-3 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="font-medium">{deck.title}</h3>
                          {deck.isFavorite && <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />}
                          <div className="flex ml-2 gap-1">
                            {deck.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <span>{deck.cardCount} cards</span>
                          <span className="mx-2">•</span>
                          <span>{deck.progress}% complete</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Last studied {deck.lastStudied}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm">Study</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toggleFavorite(deck.id)}>
                              <Star
                                className={`h-4 w-4 mr-2 ${deck.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`}
                              />
                              {deck.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Deck
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500 focus:text-red-500"
                              onClick={() => {
                                setDeckToDelete(deck.id)
                                setShowDeleteDialog(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sortedDecks
                    .filter((deck) => deck.isFavorite)
                    .map((deck) => (
                      <Card key={deck.id} className="overflow-hidden">
                        {/* Same card content as above */}
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <CardTitle className="flex items-center">
                                {deck.title}
                                <Star className="h-4 w-4 ml-2 fill-yellow-400 text-yellow-400" />
                              </CardTitle>
                              <CardDescription>{deck.description}</CardDescription>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => toggleFavorite(deck.id)}>
                                  <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                                  Remove from Favorites
                                </DropdownMenuItem>
                                {/* Other dropdown items */}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex flex-wrap gap-1 mb-3">
                            {deck.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
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
                        <CardFooter className="pt-0 flex gap-2">
                          <Button size="sm" className="flex-1">
                            Study
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Practice
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {/* List view for favorites */}
                  {sortedDecks
                    .filter((deck) => deck.isFavorite)
                    .map((deck) => (
                      <div
                        key={deck.id}
                        className="flex items-center border rounded-md p-3 hover:bg-accent/50 transition-colors"
                      >
                        {/* Same list item content as above */}
                      </div>
                    ))}
                </div>
              )}

              {sortedDecks.filter((deck) => deck.isFavorite).length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Star className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No favorite decks</h3>
                  <p className="text-muted-foreground mt-1">Mark decks as favorites to access them quickly</p>
                </div>
              )}
            </TabsContent>

            {/* Other tab contents would be similar */}
            <TabsContent value="recent" className="mt-6">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Recently studied decks</h3>
                <p className="text-muted-foreground mt-1">Decks you've studied in the last 7 days will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="shared" className="mt-6">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Share className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Shared decks</h3>
                <p className="text-muted-foreground mt-1">Decks shared with you by other users will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Deck</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this deck? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteDeck}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
