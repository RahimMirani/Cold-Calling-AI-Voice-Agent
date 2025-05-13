import React, { useState, useEffect } from 'react';
import { CallStats } from '../types';
import { mockCallService } from '../services/mockCallService';
import { Phone, Clock, CheckCircle, XCircle } from 'lucide-react';

const StatsPage: React.FC = () => {
  const [stats, setStats] = useState<CallStats>({
    totalCalls: 0,
    successfulCalls: 0,
    averageDuration: 0,
    conversionRate: 0
  });

  useEffect(() => {
    mockCallService.getCallStats().then(setStats);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Call Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 dark:text-blue-300">Total Calls</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-200">{stats.totalCalls}</p>
              </div>
              <Phone className="text-blue-500 dark:text-blue-400" size={24} />
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 dark:text-green-300">Successful Calls</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-200">{stats.successfulCalls}</p>
              </div>
              <CheckCircle className="text-green-500 dark:text-green-400" size={24} />
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 dark:text-purple-300">Average Duration</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-200">
                  {Math.floor(stats.averageDuration / 60)}:{(stats.averageDuration % 60).toString().padStart(2, '0')}
                </p>
              </div>
              <Clock className="text-purple-500 dark:text-purple-400" size={24} />
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 dark:text-orange-300">Conversion Rate</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-200">
                  {(stats.conversionRate * 100).toFixed(1)}%
                </p>
              </div>
              <XCircle className="text-orange-500 dark:text-orange-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Call Records */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Calls</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr className="text-gray-500 dark:text-gray-400">
                <td className="px-6 py-4" colSpan={4}>No call records available</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;