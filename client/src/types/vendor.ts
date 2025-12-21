export interface HeuristicResult {
    score: number;
    flags: string[];
  }
  
  export interface AIResult {
    label: string;
    score: number;
  }
  
  export interface Vendor {
    _id: string;
    name: string;
    instagramHandle?: string;
    phoneNumber?: string;
    riskScore: number;
  }
  
  export interface VendorCheckResponse {
    vendor: Vendor;
    heuristic: HeuristicResult;
    ai: AIResult;
    combinedScore: number;
    recommendation: string;
  }
  