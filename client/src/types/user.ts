export interface AnalysisHistoryItem {
  heuristic: {
    score: number;
    flags: string[];
  };
  ai: {
    label: string;
    score: number;
  };
  combinedScore: number;
  recommendation: string;
  checkedAt?: string;
}

export interface VendorSnapshot {
  name: string;
  instagramHandle?: string;
  phoneNumber?: string;
  combinedScore: number;
  recommendation: string;
  heuristic: {
    score: number;
    flags: string[];
  };
  ai: {
    label: string;
    score: number;
  };
  vendorText: string;
}

export interface VendorHistory {
  _id?: string;
  analysisHistory?: AnalysisHistoryItem[];
}

export interface SearchHistoryItem {
  vendor: VendorHistory;   // reference
  snapshot: VendorSnapshot;
  createdAt?: string;

  // computed on frontend
  confidenceScore?: number;
  softReputation?: number;
  communityFlags?: {
    phrase: string;
    count: number;
  }[];
}
