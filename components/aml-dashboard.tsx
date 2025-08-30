"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import {
  AlertTriangle,
  Shield,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Brain,
  Database,
  Calendar,
  MapPin,
  TrendingUp,
  Download,
  Play,
  Globe,
  Users,
  Award,
} from "lucide-react"
import Link from "next/link"

interface Transaction {
  id: string
  amount: number
  accountBalance: number
  sender: string
  receiver: string
  status: "pending" | "flagged" | "cleared"
  riskScore: number
  timestamp: string
  country?: string
  riskFactors?: string[]
}

interface NameMatch {
  id: string
  name: string
  matchType: "direct" | "fuzzy"
  confidence: number
  source: "worldcheck" | "mas" | "internal"
  status: "pending" | "review" | "suspicious" | "cleared"
  transactionAmount?: number
  accountBalance?: number
}

interface AIRiskFlag {
  id: string
  transactionId: string
  riskType: "large_amount" | "high_risk_country" | "unusual_pattern"
  severity: "low" | "medium" | "high"
  description: string
  recommendation: string
  confidence: number
}

export function AMLDashboard() {
  const [transactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      amount: 10000,
      accountBalance: 25000,
      sender: "John Smith",
      receiver: "withdrawal",
      status: "flagged",
      riskScore: 85,
      timestamp: "2025-01-15 14:30",
      country: "Nigeria",
      riskFactors: ["high_risk_country", "large_amount"],
    },
    {
      id: "TXN002",
      amount: 5000,
      accountBalance: 15000,
      sender: "Maria Garcia",
      receiver: "withdrawal",
      status: "pending",
      riskScore: 45,
      timestamp: "2025-01-15 15:45",
      country: "Mexico",
      riskFactors: ["unusual_pattern"],
    },
    {
      id: "TXN003",
      amount: 20000,
      accountBalance: 50000,
      sender: "Robert Johnson",
      receiver: "Zhang Liang",
      status: "flagged",
      riskScore: 92,
      timestamp: "2025-01-15 16:20",
      country: "Iran",
      riskFactors: ["high_risk_country", "large_amount", "unusual_pattern"],
    },
    {
      id: "TXN004",
      amount: 30000,
      accountBalance: 60000,
      sender: "Alice Brown",
      receiver: "GHI Inc",
      status: "cleared",
      riskScore: 20,
      timestamp: "2025-01-15 17:00",
      country: "Canada",
      riskFactors: [],
    },
  ])

  const [nameMatches] = useState<NameMatch[]>([
    {
      id: "NM001",
      name: "John Smith",
      matchType: "direct",
      confidence: 98,
      source: "worldcheck",
      status: "pending",
      transactionAmount: 10000,
      accountBalance: 25000,
    },
    {
      id: "NM002",
      name: "Maria Garzia",
      matchType: "fuzzy",
      confidence: 76,
      source: "mas",
      status: "review",
      transactionAmount: 5000,
      accountBalance: 15000,
    },
    {
      id: "NM003",
      name: "R. Johnson",
      matchType: "fuzzy",
      confidence: 82,
      source: "worldcheck",
      status: "suspicious",
      transactionAmount: 20000,
      accountBalance: 50000,
    },
  ])

  const [aiRiskFlags] = useState<AIRiskFlag[]>([
    {
      id: "AI001",
      transactionId: "TXN001",
      riskType: "high_risk_country",
      severity: "high",
      description: "Transaction originating from Nigeria, classified as high-risk jurisdiction",
      recommendation: "Enhanced due diligence required",
      confidence: 95,
    },
    {
      id: "AI002",
      transactionId: "TXN003",
      riskType: "large_amount",
      severity: "high",
      description: "Transaction amount ($20,000) exceeds 90th percentile for this account type",
      recommendation: "Verify source of funds",
      confidence: 88,
    },
    {
      id: "AI003",
      transactionId: "TXN002",
      riskType: "unusual_pattern",
      severity: "medium",
      description: "Transaction timing and frequency deviate from established user pattern",
      recommendation: "Monitor for additional suspicious activity",
      confidence: 72,
    },
  ])

  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [selectedMatches, setSelectedMatches] = useState<string[]>([])

  const [reviewPeriod] = useState({
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    totalDays: 31,
  })

  const [isLoadingWorldCheck, setIsLoadingWorldCheck] = useState(false)
  const [isLoadingDatabase, setIsLoadingDatabase] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [worldCheckData, setWorldCheckData] = useState<any[]>([])
  const [databaseData, setDatabaseData] = useState<any[]>([])
  const [currentTime, setCurrentTime] = useState<string>("")

  // Update time on client side to prevent hydration issues
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Mock WorldCheck API data
  const mockWorldCheckData = [
    {
      id: "WC001",
      name: "Ahmed Hassan",
      country: "Syria",
      riskLevel: "high",
      sanctions: ["UN", "EU"],
      lastUpdated: "2025-01-15",
      source: "worldcheck"
    },
    {
      id: "WC002", 
      name: "Vladimir Petrov",
      country: "Russia",
      riskLevel: "medium",
      sanctions: ["US"],
      lastUpdated: "2025-01-14",
      source: "worldcheck"
    },
    {
      id: "WC003",
      name: "Li Wei",
      country: "China",
      riskLevel: "low",
      sanctions: [],
      lastUpdated: "2025-01-13",
      source: "worldcheck"
    }
  ]

  // Mock Database data
  const mockDatabaseData = [
    {
      id: "DB001",
      customerId: "CUST001",
      name: "John Doe",
      accountType: "business",
      riskScore: 75,
      lastTransaction: "2025-01-15",
      source: "internal_db"
    },
    {
      id: "DB002",
      customerId: "CUST002", 
      name: "Jane Smith",
      accountType: "personal",
      riskScore: 25,
      lastTransaction: "2025-01-14",
      source: "internal_db"
    },
    {
      id: "DB003",
      customerId: "CUST003",
      name: "Bob Johnson",
      accountType: "business",
      riskScore: 90,
      lastTransaction: "2025-01-13",
      source: "internal_db"
    }
  ]

  const pullWorldCheckData = async () => {
    setIsLoadingWorldCheck(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      setWorldCheckData(mockWorldCheckData)
      toast.success("WorldCheck data pulled successfully", {
        description: `Retrieved ${mockWorldCheckData.length} records from WorldCheck API`
      })
    } catch (error) {
      toast.error("Failed to pull WorldCheck data", {
        description: "Please check your API credentials and try again"
      })
    } finally {
      setIsLoadingWorldCheck(false)
    }
  }

  const pullDatabaseData = async () => {
    setIsLoadingDatabase(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      setDatabaseData(mockDatabaseData)
      toast.success("Database data pulled successfully", {
        description: `Retrieved ${mockDatabaseData.length} records from database`
      })
    } catch (error) {
      toast.error("Failed to pull database data", {
        description: "Please check your database connection and try again"
      })
    } finally {
      setIsLoadingDatabase(false)
    }
  }

  const runAnalysis = async () => {
    if (worldCheckData.length === 0 && databaseData.length === 0) {
      toast.error("No data available", {
        description: "Please pull data from WorldCheck API and/or Database first"
      })
      return
    }

    setIsRunning(true)
    try {
      // Simulate analysis processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Combine and process the data
      const combinedData = [...worldCheckData, ...databaseData]
      
      toast.success("Analysis completed successfully", {
        description: `Processed ${combinedData.length} records and identified potential matches`
      })
    } catch (error) {
      toast.error("Analysis failed", {
        description: "An error occurred during the analysis process"
      })
    } finally {
      setIsRunning(false)
    }
  }

  const handleTransactionSelect = (txnId: string) => {
    setSelectedTransactions((prev) => (prev.includes(txnId) ? prev.filter((id) => id !== txnId) : [...prev, txnId]))
  }

  const handleMatchSelect = (matchId: string) => {
    setSelectedMatches((prev) => (prev.includes(matchId) ? prev.filter((id) => id !== matchId) : [...prev, matchId]))
  }

  const addToKYCList = () => {
    console.log("Adding transactions to KYC list:", selectedTransactions)
    setSelectedTransactions([])
  }

  const addToReviewList = () => {
    console.log("Adding matches to review list:", selectedMatches)
    setSelectedMatches([])
  }

  const addToSuspiciousList = () => {
    console.log("Adding matches to suspicious list:", selectedMatches)
    setSelectedMatches([])
  }

  const flaggedCount = transactions.filter((t) => t.status === "flagged").length
  const pendingCount = transactions.filter((t) => t.status === "pending").length
  const clearedCount = transactions.filter((t) => t.status === "cleared").length
  const directMatches = nameMatches.filter((m) => m.matchType === "direct").length
  const fuzzyMatches = nameMatches.filter((m) => m.matchType === "fuzzy").length
  const aiRiskCount = aiRiskFlags.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">AML KYC Dashboard</h1>
                <p className="text-sm text-muted-foreground">Transaction Monitoring & Compliance</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                Review Period: {reviewPeriod.startDate} to {reviewPeriod.endDate}
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Clock className="h-4 w-4 mr-1" />
                Last Updated: {currentTime || "Loading..."}
              </Badge>
              <Link href="/delegation">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Delegation Dashboard
                </Button>
              </Link>
              <Link href="/bonus">
                <Button variant="outline" size="sm">
                  <Award className="h-4 w-4 mr-2" />
                  Bonus Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* API Control Panel */}
      <div className="border-b bg-muted/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">Data Sources</h2>
              <Badge variant="secondary" className="text-xs">
                {worldCheckData.length + databaseData.length} records loaded
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                onClick={pullWorldCheckData} 
                disabled={isLoadingWorldCheck || isLoadingDatabase || isRunning}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                {isLoadingWorldCheck ? "Loading..." : "Pull WorldCheck API"}
              </Button>
              
              <Button 
                onClick={pullDatabaseData} 
                disabled={isLoadingWorldCheck || isLoadingDatabase || isRunning}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Database className="h-4 w-4" />
                {isLoadingDatabase ? "Loading..." : "Pull Database"}
              </Button>
              
              <Button 
                onClick={runAnalysis} 
                disabled={isLoadingWorldCheck || isLoadingDatabase || isRunning || (worldCheckData.length === 0 && databaseData.length === 0)}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                {isRunning ? "Running..." : "Run Analysis"}
              </Button>
            </div>
          </div>
          
          {/* Data Status */}
          {(worldCheckData.length > 0 || databaseData.length > 0) && (
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              {worldCheckData.length > 0 && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  WorldCheck: {worldCheckData.length} records
                </div>
              )}
              {databaseData.length > 0 && (
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Database: {databaseData.length} records
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Flagged Transactions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{flaggedCount}</div>
              <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
              <p className="text-xs text-muted-foreground mt-1">
                Total: $
                {transactions
                  .filter((t) => t.status === "flagged")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">Awaiting manual review</p>
              <p className="text-xs text-muted-foreground mt-1">
                Total: $
                {transactions
                  .filter((t) => t.status === "pending")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cleared Transactions</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{clearedCount}</div>
              <p className="text-xs text-muted-foreground">Successfully processed</p>
              <p className="text-xs text-muted-foreground mt-1">
                Total: $
                {transactions
                  .filter((t) => t.status === "cleared")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Direct Matches</CardTitle>
              <Database className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{directMatches}</div>
              <p className="text-xs text-muted-foreground">WorldCheck & MAS hits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuzzy Matches</CardTitle>
              <Search className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{fuzzyMatches}</div>
              <p className="text-xs text-muted-foreground">Potential indirect matches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Risk Flags</CardTitle>
              <Brain className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{aiRiskCount}</div>
              <p className="text-xs text-muted-foreground">AI-detected risk factors</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="section1" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="section1">Direct Name Matching</TabsTrigger>
            <TabsTrigger value="section2">Fuzzy Logic Analysis</TabsTrigger>
            <TabsTrigger value="section3">AI Risk Factors</TabsTrigger>
            <TabsTrigger value="section4">AI-Assisted Clearing</TabsTrigger>
          </TabsList>

          {/* Section 1: Direct Name Matching */}
          <TabsContent value="section1" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  WorldCheck & MAS Blacklist Monitoring
                </CardTitle>
                <CardDescription>Direct name matches against sanctioned entities and PEP lists</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {directMatches} direct matches found requiring immediate manual intervention
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  {nameMatches
                    .filter((match) => match.matchType === "direct")
                    .map((match) => (
                      <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedMatches.includes(match.id)}
                            onChange={() => handleMatchSelect(match.id)}
                            className="rounded"
                          />
                          <div>
                            <p className="font-medium">{match.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {match.source.toUpperCase()}
                              </Badge>
                              <span>{match.confidence}% confidence</span>
                            </div>
                            {match.transactionAmount && (
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span>Transaction: ${match.transactionAmount.toLocaleString()}</span>
                                <span>Account Balance: ${match.accountBalance?.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={match.status === "pending" ? "destructive" : "secondary"}>
                            {match.status}
                          </Badge>
                          {match.status === "pending" && <XCircle className="h-4 w-4 text-destructive" />}
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={addToKYCList} disabled={selectedMatches.length === 0} variant="outline">
                    Add to KYC List ({selectedMatches.length})
                  </Button>
                  <Button onClick={addToReviewList} disabled={selectedMatches.length === 0} variant="secondary">
                    Further Review
                  </Button>
                  <Button onClick={addToSuspiciousList} disabled={selectedMatches.length === 0} variant="destructive">
                    Mark Suspicious
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Section 2: Fuzzy Logic Analysis */}
          <TabsContent value="section2" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Fuzzy Logic & Pattern Analysis
                </CardTitle>
                <CardDescription>
                  Indirect matches and transaction pattern flags based on amount and volume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Volume Flags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>High Volume (&gt;$20K)</span>
                          <span className="font-medium">3 transactions</span>
                        </div>
                        <Progress value={75} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          Total Volume: $
                          {transactions
                            .filter((t) => t.amount > 20000)
                            .reduce((sum, t) => sum + t.amount, 0)
                            .toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Pattern Flags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Unusual Patterns</span>
                          <span className="font-medium">2 detected</span>
                        </div>
                        <Progress value={40} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          Avg Transaction: $
                          {Math.round(
                            transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length,
                          ).toLocaleString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  {nameMatches
                    .filter((match) => match.matchType === "fuzzy")
                    .map((match) => (
                      <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedMatches.includes(match.id)}
                            onChange={() => handleMatchSelect(match.id)}
                            className="rounded"
                          />
                          <div>
                            <p className="font-medium">{match.name}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                Fuzzy Match
                              </Badge>
                              <span>{match.confidence}% confidence</span>
                            </div>
                            {match.transactionAmount && (
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span>Transaction: ${match.transactionAmount.toLocaleString()}</span>
                                <span>Account Balance: ${match.accountBalance?.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={match.status === "review" ? "secondary" : "outline"}>{match.status}</Badge>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={addToKYCList} disabled={selectedMatches.length === 0} variant="outline">
                    Add to KYC List ({selectedMatches.length})
                  </Button>
                  <Button onClick={addToReviewList} disabled={selectedMatches.length === 0} variant="secondary">
                    Further Review
                  </Button>
                  <Button onClick={addToSuspiciousList} disabled={selectedMatches.length === 0} variant="destructive">
                    Mark Suspicious
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Section 3: AI Risk Factors */}
          <TabsContent value="section3" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Risk Factor Analysis
                </CardTitle>
                <CardDescription>
                  Automated flagging based on transaction amounts, user countries, and unusual patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Large Amounts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>High Value Transactions</span>
                          <span className="font-medium">2 flagged</span>
                        </div>
                        <Progress value={67} className="h-2" />
                        <div className="text-xs text-muted-foreground">Threshold: &gt;$15,000</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        High-Risk Countries
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Sanctioned Jurisdictions</span>
                          <span className="font-medium">2 flagged</span>
                        </div>
                        <Progress value={50} className="h-2" />
                        <div className="text-xs text-muted-foreground">Nigeria, Iran detected</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Unusual Patterns
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Behavioral Anomalies</span>
                          <span className="font-medium">2 flagged</span>
                        </div>
                        <Progress value={40} className="h-2" />
                        <div className="text-xs text-muted-foreground">Timing & frequency deviations</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  {aiRiskFlags.map((flag) => {
                    const transaction = transactions.find((t) => t.id === flag.transactionId)
                    return (
                      <div key={flag.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedTransactions.includes(flag.transactionId)}
                            onChange={() => handleTransactionSelect(flag.transactionId)}
                            className="rounded"
                          />
                          <div>
                            <p className="font-medium">
                              {transaction?.sender} → {transaction?.receiver}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Badge
                                variant={
                                  flag.severity === "high"
                                    ? "destructive"
                                    : flag.severity === "medium"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {flag.riskType.replace("_", " ").toUpperCase()}
                              </Badge>
                              <span>{flag.confidence}% confidence</span>
                              {transaction?.country && (
                                <Badge variant="outline" className="text-xs">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {transaction.country}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>Amount: ${transaction?.amount.toLocaleString()}</span>
                              <span>Balance: ${transaction?.accountBalance.toLocaleString()}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{flag.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              flag.severity === "high"
                                ? "destructive"
                                : flag.severity === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {flag.severity} risk
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={addToKYCList} disabled={selectedTransactions.length === 0} variant="outline">
                    Add to KYC List ({selectedTransactions.length})
                  </Button>
                  <Button onClick={addToReviewList} disabled={selectedTransactions.length === 0} variant="secondary">
                    Further Review
                  </Button>
                  <Button
                    onClick={addToSuspiciousList}
                    disabled={selectedTransactions.length === 0}
                    variant="destructive"
                  >
                    Mark Suspicious
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Section 4: AI-Assisted Clearing */}
          <TabsContent value="section4" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI-Assisted Clearing
                </CardTitle>
                <CardDescription>
                  All flagged transactions with intelligent analysis and administrator confirmation required
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    AI has analyzed {flaggedCount} flagged transactions and identified 2 potential false positives and 1
                    high-risk transaction requiring review
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  {transactions
                    .filter((transaction) => transaction.status === "flagged")
                    .map((transaction) => (
                      <Card key={transaction.id}>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base flex items-center justify-between">
                            Transaction {transaction.id} - AI Recommendation
                            <Badge variant={transaction.riskScore > 80 ? "destructive" : "secondary"}>
                              {transaction.riskScore > 80 ? "High Risk" : "Medium Risk"}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span>Amount: ${transaction.amount.toLocaleString()}</span>
                            <span>Account Balance: ${transaction.accountBalance.toLocaleString()}</span>
                            <span>Risk Score: {transaction.riskScore}%</span>
                            {transaction.country && (
                              <Badge variant="outline" className="text-xs">
                                <MapPin className="h-3 w-3 mr-1" />
                                {transaction.country}
                              </Badge>
                            )}
                          </div>
                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm font-medium mb-2">AI Analysis:</p>
                            <p className="text-sm text-muted-foreground">
                              Transaction from "{transaction.sender}" to "{transaction.receiver}" shows multiple risk
                              factors:
                              {transaction.riskFactors?.includes("high_risk_country") &&
                                " originating from high-risk jurisdiction,"}
                              {transaction.riskFactors?.includes("large_amount") &&
                                " amount exceeds normal pattern thresholds,"}
                              {transaction.riskFactors?.includes("unusual_pattern") &&
                                " timing and frequency deviate from established patterns,"}{" "}
                              representing {Math.round((transaction.amount / transaction.accountBalance) * 100)}% of
                              account balance.
                            </p>
                          </div>
                          <div className="bg-muted p-3 rounded-lg">
                            <p className="text-sm font-medium mb-2">Recommendation:</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.riskScore > 80 ? (
                                <strong>BLOCK TRANSACTION</strong>
                              ) : (
                                <strong>ENHANCED REVIEW</strong>
                              )}
                              {" - "}
                              {transaction.riskScore > 80
                                ? "Require enhanced due diligence and source of funds verification before release."
                                : "Additional verification recommended but transaction may proceed with monitoring."}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {transaction.riskScore > 80 ? (
                              <>
                                <Button size="sm" variant="destructive">
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Block Transaction
                                </Button>
                                <Button size="sm" variant="outline">
                                  Request Additional Info
                                </Button>
                                <Button size="sm" variant="secondary">
                                  Override & Clear
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button size="sm" variant="default">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Accept & Clear
                                </Button>
                                <Button size="sm" variant="outline">
                                  Manual Review
                                </Button>
                                <Button size="sm" variant="destructive">
                                  Override & Flag
                                </Button>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button variant="secondary">Export Analysis</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
