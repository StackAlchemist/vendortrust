export interface SearchHistoryItem {
    snapshot: {
      name: string;
      instagramHandle?: string;
      phoneNumber?: string;
      combinedScore: number;
      recommendation: string;
    };
    searchedAt: string;
  }
  