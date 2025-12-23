export interface HeuristicResult {
  score: number;
  flags: string[];
}

export interface AIResult {
  label: string;
  score: number;
}

export interface CommunityFlag {
  phrase: string;
  count: number;
}

export interface Vendor {
  _id: string;
  name: string;
  instagramHandle?: string;
  phoneNumber?: string;
  riskScore: number;
  lastCheckedAt?: string; // ISO date string
  analysisHistory?: AnalysisRecord[];
}

export interface AnalysisRecord {
  heuristic: HeuristicResult;
  ai: AIResult;
  combinedScore: number;
  recommendation: string;
  checkedAt: string;
}

export interface VendorSnapshot {
  name: string;
  instagramHandle?: string;
  phoneNumber?: string;
  combinedScore: number;
  recommendation: string;
  heuristic: HeuristicResult;
  ai: AIResult;
  checkedAt?: string;
}

export interface VendorCheckResponse {
  vendor: Vendor;
  heuristic: HeuristicResult;
  ai: AIResult;
  combinedScore: number;
  recommendation: string;
  snapshot: VendorSnapshot; // for storing in user history
  confidenceScore?: number;
  softReputation?: number; // 0 or 1
  communityFlags?: CommunityFlag[];
}
