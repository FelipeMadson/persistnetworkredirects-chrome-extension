export type ExecutionStatus = "IDLE" | "RUNNING" | "COMPLETED" | "FAILED";

export interface ExecutionRecord {
  id: string;
  key: string;
  payload: any;
  hash: string;
  timestamp: string;
  status: "verified" | "flagged" | "processed";
}

export interface EngineStats {
  totalProcessed: number;
  verifiedCount: number;
  flaggedCount: number;
  walLogSize: number;
  uptimeSeconds: number;
}
