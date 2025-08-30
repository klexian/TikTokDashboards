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
  DollarSign,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Users,
  TrendingUp,
  TrendingDown,
  Lock,
  Unlock,
  Eye,
  Search,
  RefreshCw,
  Wallet,
  BarChart3,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Link as LinkIcon,
  Copy,
  Filter,
  MoreHorizontal,
  Award,
} from "lucide-react"
import Link from "next/link"

interface Delegation {
  id: string
  delegator: string
  delegate: string
  amount: number
  startDate: string
  endDate?: string
  status: "active" | "revoked" | "expired"
  interestRate: number
  totalInterestPaid: number
  lastPaymentDate: string
  riskScore: number
  isBlocked: boolean
  blockReason?: string
}

interface InterestPayment {
  id: string
  delegationId: string
  delegator: string
  delegate: string
  amount: number
  date: string
  status: "completed" | "pending" | "failed"
  transactionHash?: string
  blockNumber?: number
}

interface BlockedPayment {
  id: string
  delegationId: string
  delegator: string
  delegate: string
  amount: number
  blockDate: string
  reason: string
  riskLevel: "low" | "medium" | "high"
  amlStatus: "pending" | "review" | "cleared" | "flagged"
  transactionHash?: string
}

interface BlockchainTransaction {
  hash: string
  blockNumber: number
  timestamp: string
  from: string
  to: string
  value: number
  gasUsed: number
  status: "success" | "failed"
  delegationId?: string
}

export function DelegationDashboard() {
  const [currentTime, setCurrentTime] = useState<string>("")
  const [delegations, setDelegations] = useState<Delegation[]>([])
  const [interestPayments, setInterestPayments] = useState<InterestPayment[]>([])
  const [blockedPayments, setBlockedPayments] = useState<BlockedPayment[]>([])
  const [blockchainTransactions, setBlockchainTransactions] = useState<BlockchainTransaction[]>([])
  const [selectedDelegations, setSelectedDelegations] = useState<string[]>([])
  const [isRevoking, setIsRevoking] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Update time on client side to prevent hydration issues
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Mock delegation data
  useEffect(() => {
    const mockDelegations: Delegation[] = [
      {
        id: "DEL001",
        delegator: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        delegate: "0x8ba1f109551bD432803012645Hac136c772c3c7c",
        amount: 3500,
        startDate: "2024-12-01",
        status: "active",
        interestRate: 5.2,
        totalInterestPaid: 2600,
        lastPaymentDate: "2025-01-15",
        riskScore: 25,
        isBlocked: false,
      },
      {
        id: "DEL002",
        delegator: "0x1234567890123456789012345678901234567890",
        delegate: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
        amount: 4800,
        startDate: "2024-11-15",
        status: "active",
        interestRate: 4.8,
        totalInterestPaid: 3600,
        lastPaymentDate: "2025-01-14",
        riskScore: 45,
        isBlocked: true,
        blockReason: "Suspicious transaction pattern detected",
      },
      {
        id: "DEL003",
        delegator: "0x9876543210987654321098765432109876543210",
        delegate: "0xfedcbafedcbafedcbafedcbafedcbafedcbafedc",
        amount: 2200,
        startDate: "2024-10-01",
        endDate: "2025-01-10",
        status: "revoked",
        interestRate: 6.0,
        totalInterestPaid: 1500,
        lastPaymentDate: "2025-01-10",
        riskScore: 85,
        isBlocked: false,
      },
    ]

    const mockInterestPayments: InterestPayment[] = [
      {
        id: "INT001",
        delegationId: "DEL001",
        delegator: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        delegate: "0x8ba1f109551bD432803012645Hac136c772c3c7c",
        amount: 260,
        date: "2025-01-15",
        status: "completed",
        transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        blockNumber: 18456789,
      },
      {
        id: "INT002",
        delegationId: "DEL002",
        delegator: "0x1234567890123456789012345678901234567890",
        delegate: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
        amount: 300,
        date: "2025-01-14",
        status: "completed",
        transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        blockNumber: 18456788,
      },
    ]

         const mockBlockedPayments: BlockedPayment[] = [
       {
         id: "BLK001",
         delegationId: "DEL002",
         delegator: "0x1234567890123456789012345678901234567890",
         delegate: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
         amount: 10000,
         blockDate: "2025-01-14",
         reason: "Suspicious transaction pattern detected",
         riskLevel: "high",
         amlStatus: "flagged",
         transactionHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
       },
     ]

    const mockBlockchainTransactions: BlockchainTransaction[] = [
      {
        hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
        blockNumber: 18456789,
        timestamp: "2025-01-15T14:30:00Z",
        from: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        to: "0x8ba1f109551bD432803012645Hac136c772c3c7c",
        value: 260,
        gasUsed: 21000,
        status: "success",
        delegationId: "DEL001",
      },
      {
        hash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
        blockNumber: 18456788,
        timestamp: "2025-01-14T16:45:00Z",
        from: "0x1234567890123456789012345678901234567890",
        to: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
        value: 300,
        gasUsed: 21000,
        status: "success",
        delegationId: "DEL002",
      },
    ]

    setDelegations(mockDelegations)
    setInterestPayments(mockInterestPayments)
    setBlockedPayments(mockBlockedPayments)
    setBlockchainTransactions(mockBlockchainTransactions)
  }, [])

  const handleDelegationSelect = (delegationId: string) => {
    setSelectedDelegations((prev) =>
      prev.includes(delegationId) ? prev.filter((id) => id !== delegationId) : [...prev, delegationId]
    )
  }

  const revokeDelegations = async () => {
    if (selectedDelegations.length === 0) {
      toast.error("No delegations selected", {
        description: "Please select delegations to revoke"
      })
      return
    }

    setIsRevoking(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setDelegations(prev => prev.map(del => 
        selectedDelegations.includes(del.id) 
          ? { ...del, status: "revoked" as const, endDate: new Date().toISOString().split('T')[0] }
          : del
      ))
      
      toast.success("Delegations revoked successfully", {
        description: `${selectedDelegations.length} delegation(s) have been revoked`
      })
      setSelectedDelegations([])
    } catch (error) {
      toast.error("Failed to revoke delegations", {
        description: "Please try again or contact support"
      })
    } finally {
      setIsRevoking(false)
    }
  }

  const processBlockedPayment = async (paymentId: string, action: "approve" | "reject") => {
    setIsProcessing(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (action === "approve") {
        setBlockedPayments(prev => prev.filter(p => p.id !== paymentId))
        toast.success("Payment approved", {
          description: "The blocked payment has been approved and processed"
        })
      } else {
        setBlockedPayments(prev => prev.map(p => 
          p.id === paymentId ? { ...p, amlStatus: "flagged" as const } : p
        ))
        toast.success("Payment rejected", {
          description: "The blocked payment has been rejected and flagged for review"
        })
      }
    } catch (error) {
      toast.error("Failed to process payment", {
        description: "Please try again"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  const openBlockchainExplorer = (hash: string) => {
    window.open(`https://etherscan.io/tx/${hash}`, '_blank')
  }

  const activeDelegations = delegations.filter(d => d.status === "active")
  const revokedDelegations = delegations.filter(d => d.status === "revoked")
  const blockedDelegations = delegations.filter(d => d.isBlocked)
  const totalInterestPaid = interestPayments.reduce((sum, p) => sum + p.amount, 0)
  const pendingPayments = interestPayments.filter(p => p.status === "pending")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Delegation Payment Dashboard</h1>
                <p className="text-sm text-muted-foreground">Delegation Management & Payment Processing</p>
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

      <div className="container mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Delegations</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeDelegations.length}</div>
              <p className="text-xs text-muted-foreground">
                Total Value: ${activeDelegations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Interest Paid</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">${totalInterestPaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {interestPayments.length} payments processed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blocked Payments</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{blockedPayments.length}</div>
              <p className="text-xs text-muted-foreground">
                Requiring review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <Clock className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">{pendingPayments.length}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting processing
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="delegations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="delegations">Delegations</TabsTrigger>
            <TabsTrigger value="payments">Interest Payments</TabsTrigger>
            <TabsTrigger value="blocked">Blocked Payments</TabsTrigger>
            <TabsTrigger value="blockchain">Blockchain Explorer</TabsTrigger>
          </TabsList>

          {/* Delegations Tab */}
          <TabsContent value="delegations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Delegation Management</h2>
                             <div className="flex items-center gap-2">
                 {selectedDelegations.length > 0 && (
                   <>
                     <Button
                       onClick={revokeDelegations}
                       disabled={isRevoking}
                       variant="destructive"
                       size="sm"
                     >
                       {isRevoking ? "Revoking..." : `Revoke ${selectedDelegations.length} Selected`}
                     </Button>
                     <Button
                       onClick={() => {
                         toast.success("Delegations confirmed", {
                           description: `${selectedDelegations.length} delegation(s) have been confirmed`
                         })
                         setSelectedDelegations([])
                       }}
                       disabled={isRevoking}
                       variant="default"
                       size="sm"
                     >
                       Confirm {selectedDelegations.length} Selected
                     </Button>
                   </>
                 )}
                 <Button variant="outline" size="sm">
                   <RefreshCw className="h-4 w-4 mr-2" />
                   Refresh
                 </Button>
               </div>
            </div>

            <div className="grid gap-4">
              {delegations.map((delegation) => (
                <Card key={delegation.id} className={`${delegation.isBlocked ? 'border-destructive' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedDelegations.includes(delegation.id)}
                          onChange={() => handleDelegationSelect(delegation.id)}
                          disabled={delegation.status !== "active"}
                          className="h-4 w-4"
                        />
                        <div>
                          <CardTitle className="text-lg">Delegation {delegation.id}</CardTitle>
                          <CardDescription>
                            {delegation.delegator.slice(0, 10)}... → {delegation.delegate.slice(0, 10)}...
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={delegation.status === "active" ? "default" : "secondary"}>
                          {delegation.status.toUpperCase()}
                        </Badge>
                        {delegation.isBlocked && (
                          <Badge variant="destructive">
                            <Lock className="h-3 w-3 mr-1" />
                            BLOCKED
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                                         <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                       <div>
                         <p className="text-sm font-medium">Amount</p>
                         <p className="text-lg font-bold">${delegation.amount.toLocaleString()}</p>
                       </div>
                       <div>
                         <p className="text-sm font-medium">Risk Score</p>
                         <div className="flex items-center gap-2">
                           <Progress value={delegation.riskScore} className="w-20" />
                           <span className="text-sm font-bold">{delegation.riskScore}</span>
                         </div>
                       </div>
                     </div>
                    {delegation.isBlocked && delegation.blockReason && (
                      <Alert className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{delegation.blockReason}</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Interest Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <h2 className="text-xl font-semibold">Interest Payment Summary</h2>
            
            <div className="grid gap-4">
              {interestPayments.map((payment) => (
                <Card key={payment.id}>
                                     <CardHeader>
                     <div className="flex items-center justify-between">
                       <div>
                         <CardTitle className="text-lg">Payment {payment.id}</CardTitle>
                                                   <CardDescription>
                            Burn {payment.amount * 100} TKI and transfer {payment.amount} TK to
                          </CardDescription>
                       </div>
                       <Badge variant={payment.status === "completed" ? "default" : "secondary"}>
                         {payment.status.toUpperCase()}
                       </Badge>
                     </div>
                   </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium">Amount</p>
                        <p className="text-lg font-bold">${payment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">From</p>
                        <p className="text-sm font-mono">{payment.delegator.slice(0, 10)}...</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">To</p>
                        <p className="text-sm font-mono">{payment.delegate.slice(0, 10)}...</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => payment.transactionHash && openBlockchainExplorer(payment.transactionHash)}
                          disabled={!payment.transactionHash}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          View on Explorer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blocked Payments Tab */}
          <TabsContent value="blocked" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Blocked Payments for Review</h2>
              <Link href="/">
                <Button variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Open AML Dashboard
                </Button>
              </Link>
            </div>

            {blockedPayments.length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">No Blocked Payments</h3>
                    <p className="text-muted-foreground">All payments are processing normally</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {blockedPayments.map((payment) => (
                  <Card key={payment.id} className="border-destructive">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Blocked Payment {payment.id}</CardTitle>
                          <CardDescription>
                            Delegation {payment.delegationId} • {new Date(payment.blockDate).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive">
                            <Lock className="h-3 w-3 mr-1" />
                            BLOCKED
                          </Badge>
                          <Badge variant={payment.riskLevel === "high" ? "destructive" : "secondary"}>
                            {payment.riskLevel.toUpperCase()} RISK
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium">Amount</p>
                          <p className="text-lg font-bold">${payment.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">From</p>
                          <p className="text-sm font-mono">{payment.delegator.slice(0, 10)}...</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">To</p>
                          <p className="text-sm font-mono">{payment.delegate.slice(0, 10)}...</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">AML Status</p>
                          <Badge variant={payment.amlStatus === "flagged" ? "destructive" : "secondary"}>
                            {payment.amlStatus.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <Alert className="mb-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{payment.reason}</AlertDescription>
                      </Alert>

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => processBlockedPayment(payment.id, "approve")}
                          disabled={isProcessing}
                          variant="default"
                          size="sm"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Payment
                        </Button>
                        <Button
                          onClick={() => processBlockedPayment(payment.id, "reject")}
                          disabled={isProcessing}
                          variant="destructive"
                          size="sm"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Payment
                        </Button>
                        {payment.transactionHash && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openBlockchainExplorer(payment.transactionHash!)}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Transaction
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Blockchain Explorer Tab */}
          <TabsContent value="blockchain" className="space-y-6">
            <h2 className="text-xl font-semibold">Blockchain Transaction Explorer</h2>
            
            <div className="grid gap-4">
              {blockchainTransactions.map((tx) => (
                <Card key={tx.hash}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          Transaction
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(tx.hash)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </CardTitle>
                        <CardDescription className="font-mono text-xs">
                          {tx.hash.slice(0, 20)}...{tx.hash.slice(-20)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={tx.status === "success" ? "default" : "destructive"}>
                          {tx.status.toUpperCase()}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openBlockchainExplorer(tx.hash)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium">Block Number</p>
                        <p className="text-lg font-bold">{tx.blockNumber.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Value</p>
                        <p className="text-lg font-bold">${tx.value.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Gas Used</p>
                        <p className="text-lg font-bold">{tx.gasUsed.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Timestamp</p>
                        <p className="text-sm">{new Date(tx.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">From</p>
                        <p className="text-sm font-mono">{tx.from.slice(0, 20)}...{tx.from.slice(-20)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">To</p>
                        <p className="text-sm font-mono">{tx.to.slice(0, 20)}...{tx.to.slice(-20)}</p>
                      </div>
                    </div>
                    
                    {tx.delegationId && (
                      <div className="mt-4">
                        <p className="text-sm font-medium">Related Delegation</p>
                        <p className="text-sm font-mono">{tx.delegationId}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
