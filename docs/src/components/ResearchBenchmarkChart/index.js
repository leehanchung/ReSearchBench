import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { benchmarkData } from '../../data/benchmarkData';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{data.model}</p>
        <p style={{ margin: 0, color: data.color }}>
          Score: {data.decimal.toFixed(3)}
        </p>
      </div>
    );
  }
  return null;
};

export default function ResearchBenchmarkChart() {
  const [notification, setNotification] = React.useState('');
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  const isSmallMobile = width <= 480;

  const handleCopyToClipboard = async () => {
    try {
      const dataText = benchmarkData.map(item => 
        `${item.model}: ${item.decimal.toFixed(3)}`
      ).join('\n');
      const content = `ReSearch Bench Index\n\n${dataText}`;
      
      await navigator.clipboard.writeText(content);
      setNotification('📋 Copied to clipboard!');
      setTimeout(() => setNotification(''), 2000);
    } catch (err) {
      setNotification('❌ Failed to copy to clipboard');
      setTimeout(() => setNotification(''), 2000);
    }
  };

  const handleDownload = () => {
    try {
      const dataText = benchmarkData.map(item => 
        `${item.model},${item.decimal.toFixed(3)}`
      ).join('\n');
      const content = `Model,Score\n${dataText}`;
      
      const blob = new Blob([content], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'research-bench-data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setNotification('📥 File downloaded!');
      setTimeout(() => setNotification(''), 2000);
    } catch (err) {
      setNotification('❌ Failed to download file');
      setTimeout(() => setNotification(''), 2000);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '2rem',
      padding: isMobile ? '1rem' : '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Main Chart Section */}
      <div style={{
        flex: isMobile ? '1' : '2',
        minWidth: 0
      }}>
        <h2 
          id="chart-title"
          style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '600',
            marginBottom: isMobile ? '1rem' : '2rem',
            color: '#1a1a1a'
          }}
        >
          ReSearch Bench Index
        </h2>
        
        <div 
          role="img"
          aria-labelledby="chart-title"
          aria-describedby="chart-description"
          style={{
            height: isMobile ? '300px' : '400px',
            padding: isMobile ? '1rem' : '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e1e5e9'
          }}
        >
          <div id="chart-description" className="sr-only">
            Bar chart showing ReSearch Bench scores for AI models. Google Gemini Deep Research leads with 0.257, followed by OpenAI ChatGPT Deep Research at 0.214, and Grok Deeper Search at 0.150.
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={benchmarkData} 
              margin={{ 
                top: 20, 
                right: isMobile ? 10 : 30, 
                left: isMobile ? 10 : 20, 
                bottom: isMobile ? 40 : 60 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="shortName"
                tick={{ fontSize: isMobile ? 10 : 12, fill: '#666' }}
                axisLine={{ stroke: '#e1e5e9' }}
                tickLine={{ stroke: '#e1e5e9' }}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? 'end' : 'middle'}
                height={isMobile ? 60 : 40}
              />
              <YAxis 
                domain={[0, 1.0]}
                tick={{ fontSize: isMobile ? 10 : 12, fill: '#666' }}
                axisLine={{ stroke: '#e1e5e9' }}
                tickLine={{ stroke: '#e1e5e9' }}
                label={{ 
                  value: 'ReSearch Bench Score', 
                  angle: -90, 
                  position: 'insideLeft', 
                  style: { 
                    textAnchor: 'middle',
                    fontSize: isMobile ? '12px' : '14px'
                  } 
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="decimal" 
                radius={[4, 4, 0, 0]}
              >
                {benchmarkData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Right Sidebar */}
      <div style={{
        flex: '1',
        backgroundColor: '#f8f9fa',
        padding: isMobile ? '1.5rem' : '2rem',
        borderRadius: '8px',
        border: '1px solid #e1e5e9',
        minWidth: 0
      }}>
        <div style={{
          display: 'flex',
          flexDirection: isSmallMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isSmallMobile ? 'flex-start' : 'center',
          marginBottom: '1.5rem',
          gap: isSmallMobile ? '1rem' : '0'
        }}>
          <h3 style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            margin: 0,
            color: '#1a1a1a'
          }}>
            ReSearch Bench Index
          </h3>
          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            <button 
              onClick={handleCopyToClipboard}
              title="Copy data to clipboard"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: isMobile ? '14px' : '16px',
                padding: isMobile ? '8px' : '4px',
                minWidth: '32px',
                minHeight: '32px'
              }}
            >
              📋
            </button>
            <button 
              onClick={handleDownload}
              title="Download data as CSV"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: isMobile ? '14px' : '16px',
                padding: isMobile ? '8px' : '4px',
                minWidth: '32px',
                minHeight: '32px'
              }}
            >
              📥
            </button>
          </div>
        </div>
        
        {notification && (
          <div style={{
            fontSize: '12px',
            padding: '8px',
            marginBottom: '12px',
            backgroundColor: notification.includes('❌') ? '#fee' : '#efe',
            color: notification.includes('❌') ? '#c33' : '#363',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            {notification}
          </div>
        )}
        
        <p style={{
          fontSize: '14px',
          lineHeight: '1.6',
          color: '#666',
          margin: 0
        }}>
          The ReSearch Bench Index is a comprehensive metric that evaluates AI models across multiple research capabilities including information retrieval, analysis depth, source credibility, and synthesis quality. Higher scores indicate superior performance in research-oriented tasks.
        </p>
      </div>
    </div>
  );
}