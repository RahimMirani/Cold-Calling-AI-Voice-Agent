import React from 'react';
import { Clock, CheckCircle, XCircle, PhoneOff, PhoneCall } from 'lucide-react';
import { CallInfo, CallMessage } from '../types';

interface CallInfoProps {
  callInfo: CallInfo;
  onEndCall: () => void;
}

const CallMessageItem: React.FC<{ message: CallMessage }> = ({ message }) => {
  const isAI = message.sender === 'ai';
  
  return (
    <div 
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}
      data-aos={isAI ? 'fade-right' : 'fade-left'}
      data-aos-duration="500"
    >
      <div 
        className={`max-w-[80%] px-4 py-2 rounded-lg ${
          isAI 
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

const CallInfoDisplay: React.FC<CallInfoProps> = ({ callInfo, onEndCall }) => {
  const formatDuration = (durationMs?: number): string => {
    if (!durationMs) return '00:00';
    const seconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'connecting': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
      case 'active': return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'completed': return 'text-blue-500 bg-blue-100 dark:bg-blue-900';
      case 'failed': return 'text-red-500 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connecting': return <Clock size={16} />;
      case 'active': return <PhoneCall size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      case 'failed': return <XCircle size={16} />;
      default: return null;
    }
  };

  // Show elapsed time for active calls
  const [elapsedTime, setElapsedTime] = React.useState<number>(0);
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (callInfo.status === 'active' && callInfo.startTime) {
      interval = setInterval(() => {
        const elapsed = new Date().getTime() - new Date(callInfo.startTime!).getTime();
        setElapsedTime(elapsed);
      }, 1000);
    } else if (callInfo.duration) {
      setElapsedTime(callInfo.duration);
    } else {
      setElapsedTime(0);
    }
    
    return () => clearInterval(interval);
  }, [callInfo.status, callInfo.startTime, callInfo.duration]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300">
      {/* Call Status Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(callInfo.status)}`}>
              {getStatusIcon(callInfo.status)}
              <span className="ml-1 capitalize">{callInfo.status}</span>
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <Clock size={14} className="mr-1" />
              {formatDuration(elapsedTime)}
            </span>
          </div>
          
          {callInfo.status === 'active' && (
            <button 
              onClick={onEndCall}
              className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800"
              aria-label="End call"
            >
              <PhoneOff size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Call Transcript */}
      <div className="p-4 h-96 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
        {callInfo.transcript.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <PhoneCall size={48} className="mb-2 opacity-30" />
            <p className="text-center">
              {callInfo.status === 'idle' 
                ? 'No active call. Start a call to see the transcript here.' 
                : callInfo.status === 'connecting' 
                  ? 'Connecting to the call...' 
                  : 'Call transcript will appear here'}
            </p>
          </div>
        ) : (
          callInfo.transcript.map(message => (
            <CallMessageItem key={message.id} message={message} />
          ))
        )}
      </div>
      
      {/* Call Actions Footer (can add more actions here) */}
      {callInfo.status === 'active' && (
        <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex justify-center">
            <button 
              onClick={onEndCall}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200 flex items-center"
            >
              <PhoneOff size={16} className="mr-2" />
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CallInfoDisplay;