export interface CallDetails {
  phoneNumber: string;
  shopName: string;
  customerName?: string;
  notes?: string;
  callObjective?: string;
}

export interface CallInfo {
  id: string;
  status: 'idle' | 'connecting' | 'active' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  transcript: CallMessage[];
}

export interface CallMessage {
  id: string;
  text: string;
  sender: 'ai' | 'customer';
  timestamp: Date;
}

export interface CallStats {
  totalCalls: number;
  successfulCalls: number;
  averageDuration: number;
  conversionRate: number;
}