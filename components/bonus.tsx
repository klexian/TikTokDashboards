"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import {
  Shield,
  Clock,
  ExternalLink,
  Users,
  TrendingUp,
  Eye,
  RefreshCw,
  MoreHorizontal,
  BookOpen,
  Leaf,
  Heart,
  Users2,
  Dumbbell,
  Star,
  Play,
  Target,
  Award,
  Globe,
  Briefcase,
  FlaskConical,
  Palette,
} from "lucide-react"
import Link from "next/link"

interface BonusCategory {
  id: string
  name: string
  multiplier: number
  totalVideos: number
  newVideosThisMonth: number
  numberOfCreators: number
  adRevenue: number
  sponsorshipRevenue: number
  totalGifts: number
  totalInterestEarned: number
  topCreators: Creator[]
  description: string
  icon: React.ReactNode
  color: string
}

interface Creator {
  id: string
  name: string
  username: string
  followers: number
  videos: number
  revenue: number
  category: string
  avatar: string
  verified: boolean
  lastActive: string
}

export function BonusDashboard() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [categories, setCategories] = useState<BonusCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  // Update time on client side to prevent hydration issues
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Mock bonus category data
  useEffect(() => {
    const mockCategories: BonusCategory[] = [
      {
        id: "education",
        name: "Education",
        multiplier: 150,
        totalVideos: 15420,
        newVideosThisMonth: 1247,
        numberOfCreators: 2847,
        adRevenue: 1250000,
        sponsorshipRevenue: 890000,
        totalGifts: 45600,
        totalInterestEarned: 89000,
        description: "Educational content, tutorials, and knowledge sharing",
        icon: <BookOpen className="h-6 w-6" />,
        color: "text-blue-600",
        topCreators: [
          {
            id: "edu_001",
            name: "Dr. Sarah Chen",
            username: "@dr_sarah_edu",
            followers: 2450000,
            videos: 342,
            revenue: 125,
            category: "Education",
            avatar: "👩‍🏫",
            verified: true,
            lastActive: "2025-01-15",
          },
          {
            id: "edu_002",
            name: "Professor Mike Johnson",
            username: "@prof_mike",
            followers: 1800000,
            videos: 289,
            revenue: 98,
            category: "Education",
            avatar: "👨‍🏫",
            verified: true,
            lastActive: "2025-01-14",
          },
          {
            id: "edu_003",
            name: "Learning Lab",
            username: "@learning_lab",
            followers: 3200000,
            videos: 456,
            revenue: 156,
            category: "Education",
            avatar: "📚",
            verified: true,
            lastActive: "2025-01-15",
          },
        ],
      },
      {
        id: "sustainability",
        name: "Sustainability",
        multiplier: 200,
        totalVideos: 8920,
        newVideosThisMonth: 756,
        numberOfCreators: 1654,
        adRevenue: 980000,
        sponsorshipRevenue: 1200000,
        totalGifts: 32400,
        totalInterestEarned: 76000,
        description: "Environmental awareness and sustainable living",
        icon: <Leaf className="h-6 w-6" />,
        color: "text-green-600",
        topCreators: [
          {
            id: "sus_001",
            name: "Eco Warrior",
            username: "@eco_warrior",
            followers: 3200000,
            videos: 198,
            revenue: 145,
            category: "Sustainability",
            avatar: "🌱",
            verified: true,
            lastActive: "2025-01-15",
          },
          {
            id: "sus_002",
            name: "Green Living",
            username: "@green_living",
            followers: 2100000,
            videos: 167,
            revenue: 112,
            category: "Sustainability",
            avatar: "🌿",
            verified: true,
            lastActive: "2025-01-13",
          },
          {
            id: "sus_003",
            name: "Eco Tips Daily",
            username: "@eco_tips",
            followers: 2800000,
            videos: 234,
            revenue: 134,
            category: "Sustainability",
            avatar: "♻️",
            verified: true,
            lastActive: "2025-01-15",
          },
        ],
      },
      {
        id: "animals",
        name: "Animals",
        multiplier: 175,
        totalVideos: 12340,
        newVideosThisMonth: 987,
        numberOfCreators: 2156,
        adRevenue: 1450000,
        sponsorshipRevenue: 1100000,
        totalGifts: 67800,
        totalInterestEarned: 123000,
        description: "Animal welfare, pet care, and wildlife content",
        icon: <Heart className="h-6 w-6" />,
        color: "text-pink-600",
        topCreators: [
          {
            id: "ani_001",
            name: "Pet Paradise",
            username: "@pet_paradise",
            followers: 4100000,
            videos: 567,
            revenue: 189,
            category: "Animals",
            avatar: "🐕",
            verified: true,
            lastActive: "2025-01-15",
          },
          {
            id: "ani_002",
            name: "Wildlife Explorer",
            username: "@wildlife_explorer",
            followers: 3500000,
            videos: 234,
            revenue: 167,
            category: "Animals",
            avatar: "🦁",
            verified: true,
            lastActive: "2025-01-14",
          },
          {
            id: "ani_003",
            name: "Pet Care Pro",
            username: "@pet_care_pro",
            followers: 2800000,
            videos: 345,
            revenue: 145,
            category: "Animals",
            avatar: "🐱",
            verified: true,
            lastActive: "2025-01-15",
          },
        ],
      },
      {
        id: "society",
        name: "Society",
        multiplier: 125,
        totalVideos: 18760,
        newVideosThisMonth: 1456,
        numberOfCreators: 3245,
        adRevenue: 1650000,
        sponsorshipRevenue: 980000,
        totalGifts: 89200,
        totalInterestEarned: 145000,
        description: "Social issues, community building, and cultural content",
        icon: <Users2 className="h-6 w-6" />,
        color: "text-purple-600",
        topCreators: [
          {
            id: "soc_001",
            name: "Community Builder",
            username: "@community_builder",
            followers: 3560000,
            videos: 289,
            revenue: 167,
            category: "Society",
            avatar: "🤝",
            verified: true,
            lastActive: "2025-01-15",
          },
          {
            id: "soc_002",
            name: "Social Impact",
            username: "@social_impact",
            followers: 2400000,
            videos: 198,
            revenue: 123,
            category: "Society",
            avatar: "🌍",
            verified: true,
            lastActive: "2025-01-13",
          },
          {
            id: "soc_003",
            name: "Culture Connect",
            username: "@culture_connect",
            followers: 3100000,
            videos: 267,
            revenue: 145,
            category: "Society",
            avatar: "🎭",
            verified: true,
            lastActive: "2025-01-15",
          },
        ],
      },
      {
        id: "fitness",
        name: "Fitness",
        multiplier: 300,
        totalVideos: 22340,
        newVideosThisMonth: 1876,
        numberOfCreators: 4123,
        adRevenue: 2100000,
        sponsorshipRevenue: 1800000,
        totalGifts: 123400,
        totalInterestEarned: 234000,
        description: "Health, fitness, and wellness content",
        icon: <Dumbbell className="h-6 w-6" />,
        color: "text-orange-600",
        topCreators: [
          {
            id: "fit_001",
            name: "Fitness Pro",
            username: "@fitness_pro",
            followers: 5200000,
            videos: 456,
            revenue: 234,
            category: "Fitness",
            avatar: "💪",
            verified: true,
            lastActive: "2025-01-15",
          },
          {
            id: "fit_002",
            name: "Wellness Coach",
            username: "@wellness_coach",
            followers: 3800000,
            videos: 345,
            revenue: 178,
            category: "Fitness",
            avatar: "🧘‍♀️",
            verified: true,
            lastActive: "2025-01-14",
          },
          {
            id: "fit_003",
            name: "Gym Life",
            username: "@gym_life",
            followers: 4200000,
            videos: 389,
            revenue: 198,
            category: "Fitness",
            avatar: "🏋️‍♂️",
            verified: true,
            lastActive: "2025-01-15",
          },
        ],
      },
      {
        id: "travel",
        name: "Travel",
        multiplier: 0,
        totalVideos: 0,
        newVideosThisMonth: 0,
        numberOfCreators: 0,
        adRevenue: 0,
        sponsorshipRevenue: 0,
        totalGifts: 0,
        totalInterestEarned: 0,
        description: "Travel guides, destinations, and adventure content",
        icon: <Globe className="h-6 w-6" />,
        color: "text-cyan-600",
        topCreators: [],
      },
      {
        id: "business",
        name: "Business",
        multiplier: 0,
        totalVideos: 0,
        newVideosThisMonth: 0,
        numberOfCreators: 0,
        adRevenue: 0,
        sponsorshipRevenue: 0,
        totalGifts: 0,
        totalInterestEarned: 0,
        description: "Business tips, entrepreneurship, and professional development",
        icon: <Briefcase className="h-6 w-6" />,
        color: "text-indigo-600",
        topCreators: [],
      },
      {
        id: "science",
        name: "Science",
        multiplier: 0,
        totalVideos: 0,
        newVideosThisMonth: 0,
        numberOfCreators: 0,
        adRevenue: 0,
        sponsorshipRevenue: 0,
        totalGifts: 0,
        totalInterestEarned: 0,
        description: "Scientific discoveries, research, and educational content",
        icon: <FlaskConical className="h-6 w-6" />,
        color: "text-violet-600",
        topCreators: [],
      },
      {
        id: "art",
        name: "Art",
        multiplier: 0,
        totalVideos: 0,
        newVideosThisMonth: 0,
        numberOfCreators: 0,
        adRevenue: 0,
        sponsorshipRevenue: 0,
        totalGifts: 0,
        totalInterestEarned: 0,
        description: "Artistic content, creativity, and visual expression",
        icon: <Palette className="h-6 w-6" />,
        color: "text-rose-600",
        topCreators: [],
      },
      {
        id: "technology",
        name: "Technology",
        multiplier: 0,
        totalVideos: 0,
        newVideosThisMonth: 0,
        numberOfCreators: 0,
        adRevenue: 0,
        sponsorshipRevenue: 0,
        totalGifts: 0,
        totalInterestEarned: 0,
        description: "Tech reviews, tutorials, and innovation content",
        icon: <Star className="h-6 w-6" />,
        color: "text-yellow-600",
        topCreators: [],
      },
      {
        id: "food",
        name: "Food",
        multiplier: 0,
        totalVideos: 0,
        newVideosThisMonth: 0,
        numberOfCreators: 0,
        adRevenue: 0,
        sponsorshipRevenue: 0,
        totalGifts: 0,
        totalInterestEarned: 0,
        description: "Cooking, recipes, and culinary content",
        icon: <Play className="h-6 w-6" />,
        color: "text-red-600",
        topCreators: [],
      },
      {
        id: "music",
        name: "Music",
        multiplier: 0,
        totalVideos: 0,
        newVideosThisMonth: 0,
        numberOfCreators: 0,
        adRevenue: 0,
        sponsorshipRevenue: 0,
        totalGifts: 0,
        totalInterestEarned: 0,
        description: "Music, instruments, and audio content",
        icon: <Target className="h-6 w-6" />,
        color: "text-emerald-600",
        topCreators: [],
      },
      {
        id: "gaming",
        name: "Gaming",
        multiplier: 0,
        totalVideos: 0,
        newVideosThisMonth: 0,
        numberOfCreators: 0,
        adRevenue: 0,
        sponsorshipRevenue: 0,
        totalGifts: 0,
        totalInterestEarned: 0,
        description: "Video games, streaming, and gaming content",
        icon: <TrendingUp className="h-6 w-6" />,
        color: "text-lime-600",
        topCreators: [],
      },
      {
        id: "fashion",
        name: "Fashion",
        multiplier: 0,
        totalVideos: 0,
        newVideosThisMonth: 0,
        numberOfCreators: 0,
        adRevenue: 0,
        sponsorshipRevenue: 0,
        totalGifts: 0,
        totalInterestEarned: 0,
        description: "Fashion, style, and beauty content",
        icon: <Eye className="h-6 w-6" />,
        color: "text-pink-600",
        topCreators: [],
      },
      
    ]

    setCategories(mockCategories)
  }, [])

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Bonus Categories Dashboard</h1>
                <p className="text-sm text-muted-foreground">Category Multipliers & Creator Analytics • January 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                <Clock className="h-4 w-4 mr-1" />
                Last Updated: {currentTime || "Loading..."}
              </Badge>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Shield className="h-4 w-4 mr-2" />
                  AML Dashboard
                </Button>
              </Link>
              <Link href="/delegation">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Delegation Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Boosted Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Current Month Boosted Categories
              </CardTitle>
              <CardDescription>Categories receiving bonus multipliers this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.slice(0, 5).map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${category.color}`}>
                        {category.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">{category.numberOfCreators.toLocaleString()} creators</p>
                      </div>
                    </div>
                    <Badge variant="default" className="text-sm">
                      +{category.multiplier}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
                         <CardHeader>
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <Target className="h-5 w-5 text-blue-600" />
                   <div>
                     <CardTitle>Next Month Boost Selection</CardTitle>
                     <CardDescription>Select categories to boost for February 2025</CardDescription>
                   </div>
                 </div>
                 <Button variant="outline" size="sm">
                   <RefreshCw className="h-4 w-4 mr-2" />
                   Run Analysis
                 </Button>
               </div>
             </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded bg-muted ${category.color}`}>
                        {category.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold">{category.name}</h4>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
                      Select
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary">Category Summary</TabsTrigger>
            <TabsTrigger value="creators">Top Creators</TabsTrigger>
            <TabsTrigger value="analytics">Revenue Analytics</TabsTrigger>
          </TabsList>

          {/* Category Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Bonus Categories Overview</h2>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>

            <div className="grid gap-6">
              {categories.slice(0, 5).map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-muted ${category.color}`}>
                          {category.icon}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{category.name}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="text-lg px-3 py-1">
                          +{category.multiplier}%
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCategorySelect(category.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Creators
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Total Videos</p>
                        <p className="text-lg font-bold">{category.totalVideos.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">New This Month</p>
                        <p className="text-lg font-bold text-green-600">+{category.newVideosThisMonth.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Creators</p>
                        <p className="text-lg font-bold">{category.numberOfCreators.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Ad & Sponsorship Rev Allocation</p>
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-lg font-bold">${(((category.adRevenue + category.sponsorshipRevenue) / 10) / 1000).toFixed(0)}K</p>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Total Gifts</p>
                        <p className="text-lg font-bold">${(category.totalGifts / 1000).toFixed(0)}K</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Total Interest Earned</p>
                        <p className="text-lg font-bold text-blue-600">${((category.totalInterestEarned / 10) / 1000).toFixed(0)}K</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                        <p className="text-lg font-bold text-green-600">${((((category.adRevenue + category.sponsorshipRevenue) / 10) / 1000) + (category.totalGifts / 1000) + ((category.totalInterestEarned / 10) / 1000)).toFixed(0)}K</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Top Creators Tab */}
          <TabsContent value="creators" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Top Creators by Category</h2>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Creators
              </Button>
            </div>

                         <div className="grid gap-6">
               {categories.slice(0, 5).map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg bg-muted ${category.color}`}>
                          {category.icon}
                        </div>
                        <h3 className="text-lg font-semibold">{category.name} Top Creators</h3>
                      </div>
                      <Badge variant="outline">+{category.multiplier}% Bonus</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {category.topCreators.map((creator) => (
                        <div key={creator.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{creator.avatar}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{creator.name}</h4>
                                {creator.verified && <Badge variant="secondary" className="text-xs">✓ Verified</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground">{creator.username}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-muted-foreground">{creator.followers.toLocaleString()} followers</span>
                                <span className="text-xs text-muted-foreground">{creator.videos} videos</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">Monthly Revenue</p>
                              <p className="text-lg font-bold text-green-600">${creator.revenue.toLocaleString()}</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Revenue Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">Revenue Analytics</h2>
            
            <div className="grid gap-6">
              {/* Revenue Comparison Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                  <CardDescription>Ad revenue vs sponsorship revenue comparison</CardDescription>
                </CardHeader>
                <CardContent>
                                     <div className="space-y-4">
                     {categories.slice(0, 5).map((category) => (
                      <div key={category.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-1 rounded ${category.color}`}>
                              {category.icon}
                            </div>
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <span className="font-bold">${((category.adRevenue + category.sponsorshipRevenue) / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex gap-1 h-2">
                          <div 
                            className="bg-blue-500 rounded-l"
                            style={{ width: `${(category.adRevenue / (category.adRevenue + category.sponsorshipRevenue)) * 100}%` }}
                          />
                          <div 
                            className="bg-green-500 rounded-r"
                            style={{ width: `${(category.sponsorshipRevenue / (category.adRevenue + category.sponsorshipRevenue)) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Ad: ${(category.adRevenue / 1000).toFixed(0)}K</span>
                          <span>Sponsorship: ${(category.sponsorshipRevenue / 1000).toFixed(0)}K</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Multiplier Impact */}
              <Card>
                <CardHeader>
                  <CardTitle>Multiplier Impact Analysis</CardTitle>
                  <CardDescription>How bonus multipliers affect creator earnings</CardDescription>
                </CardHeader>
                <CardContent>
                                     <div className="grid gap-4">
                     {categories.slice(0, 5).map((category) => (
                      <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-muted ${category.color}`}>
                            {category.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold">{category.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {category.numberOfCreators.toLocaleString()} creators affected
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">+{category.multiplier}%</div>
                          <div className="text-sm text-muted-foreground">
                            Bonus multiplier
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
