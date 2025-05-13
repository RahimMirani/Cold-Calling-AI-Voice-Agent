import React, { useState } from 'react';
import CallForm from '../components/CallForm';
import CallInfoDisplay from '../components/CallInfo';
import { CallDetails, CallInfo } from '../types';

const CallPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [callInfo, setCallInfo] = useState<CallInfo>({
    id: '',
    status: 'idle',
    transcript: []
  });

  const handleStartCall = async (details: CallDetails) => {
    setIsLoading(true);
    try {
      setCallInfo({
        id: crypto.randomUUID(),
        status: 'connecting',
        startTime: new Date(),
        transcript: []
      });
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCallInfo(prev => ({
        ...prev,
        status: 'active'
      }));
    } catch (error) {
      console.error('Error starting call:', error);
      setCallInfo(prev => ({
        ...prev,
        status: 'failed'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = async () => {
    try {
      setCallInfo(prev => ({
        ...prev,
        status: 'completed',
        endTime: new Date(),
        duration: prev.startTime ? new Date().getTime() - new Date(prev.startTime).getTime() : 0
      }));
    } catch (error) {
      console.error('Error ending call:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <CallForm onSubmit={handleStartCall} isLoading={isLoading} />
      </div>
      <div>
        <CallInfoDisplay callInfo={callInfo} onEndCall={handleEndCall} />
      </div>
    </div>
  );
};

export default CallPage;