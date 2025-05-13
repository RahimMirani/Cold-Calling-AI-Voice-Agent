import { CallDetails, CallInfo, CallMessage, CallStats } from '../types';

// Mock service for handling calls - to be replaced with real implementation
export const mockCallService = {
  // Start a call with the provided details
  startCall: (details: CallDetails): Promise<CallInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const callInfo: CallInfo = {
          id: crypto.randomUUID(),
          status: 'connecting',
          startTime: new Date(),
          transcript: []
        };
        resolve(callInfo);
      }, 1500);
    });
  },

  // End the call
  endCall: (callInfo: CallInfo): Promise<CallInfo> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const endedCall = {
          ...callInfo,
          status: 'completed',
          endTime: new Date(),
          duration: callInfo.startTime 
            ? new Date().getTime() - new Date(callInfo.startTime).getTime()
            : 0
        };
        resolve(endedCall);
      }, 1000);
    });
  },

  // Get call statistics
  getCallStats: (): Promise<CallStats> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats: CallStats = {
          totalCalls: 0,
          successfulCalls: 0,
          averageDuration: 0,
          conversionRate: 0
        };
        resolve(stats);
      }, 800);
    });
  }
};