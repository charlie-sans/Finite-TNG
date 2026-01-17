import { useState, useEffect } from 'react';

export default function StatsCard({ title, value, change, icon, color = 'blue' }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500'
  };
  
  const iconMap = {
    users: 'fa-users',
    'dollar-sign': 'fa-dollar-sign',
    'chart-line': 'fa-chart-line',
    'user-check': 'fa-user-check',
    'shopping-cart': 'fa-shopping-cart',
    eye: 'fa-eye',
    clock: 'fa-clock',
    'credit-card': 'fa-credit-card'
  };
  
  // Animate value counter
  useEffect(() => {
    if (!value) return;
    
    const target = typeof value === 'string' 
      ? parseInt(value.replace(/[^0-9]/g, '')) 
      : Number(value);
    
    if (isNaN(target)) {
      setAnimatedValue(value);
      return;
    }
    
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedValue(formatValue(target));
        clearInterval(timer);
      } else {
        setAnimatedValue(formatValue(Math.floor(current)));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  const formatValue = (val) => {
    if (typeof value === 'string' && value.includes('$')) {
      return `$${val.toLocaleString()}`;
    }
    if (typeof value === 'string' && value.includes('%')) {
      return `${val}%`;
    }
    return val.toLocaleString();
  };
  
  const isPositive = change && change.startsWith('+');
  const isNegative = change && change.startsWith('-');
  
  return (
    <div className="stats-card">
      <div className="stats-icon-container" style={{ backgroundColor: `var(--${color}-light)` }}>
        <div className={`stats-icon ${colorClasses[color]}`}>
          <i className={`fas ${iconMap[icon] || 'fa-chart-bar'}`}></i>
        </div>
      </div>
      
      <div className="stats-content">
        <p className="stats-title">{title}</p>
        <h3 className="stats-value">{animatedValue}</h3>
        
        {change && (
          <div className="stats-change">
            <span className={`change-indicator ${isPositive ? 'positive' : isNegative ? 'negative' : 'neutral'}`}>
              <i className={`fas fa-${isPositive ? 'arrow-up' : isNegative ? 'arrow-down' : 'minus'}`}></i>
              {change}
            </span>
            <span className="change-label">from last month</span>
          </div>
        )}
      </div>
    </div>
  );
}