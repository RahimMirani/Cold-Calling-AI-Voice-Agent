import React from 'react';
import { BarChart, Phone, PhoneCall, Clock, Target } from 'lucide-react';
import { CallStats } from '../types';

interface DashboardProps {
  stats: CallStats;
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const { totalCalls, successfulCalls, averageDuration, conversionRate } = stats;
  
  const statCards = [
    {
      title: 'Total Calls',
      value: totalCalls,
      icon: <Phone size={20} />,
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      iconColor: 'text-blue-500 dark:text-blue-400'
    },
    {
      title: 'Successful Calls',
      value: successfulCalls,
      icon: <PhoneCall size={20} />,
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      iconColor: 'text-green-500 dark:text-green-400'
    },
    {
      title: 'Avg Duration',
      value: `${Math.floor(averageDuration / 60)}:${(averageDuration % 60).toString().padStart(2, '0')}`,
      icon: <Clock size={20} />,
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      iconColor: 'text-purple-500 dark:text-purple-400'
    },
    {
      title: 'Conversion Rate',
      value: `${(conversionRate * 100).toFixed(1)}%`,
      icon: <Target size={20} />,
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      iconColor: 'text-orange-500 dark:text-orange-400'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center text-gray-800 dark:text-white">
          <BarChart size={18} className="mr-2" />
          Call Statistics
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className={`p-4 rounded-lg ${stat.color} transition-all duration-300`}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.title}</p>
                <p className="text-xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-full ${stat.iconColor}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;