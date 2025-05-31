import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { model: 'Google Gemini Deep Research', shortName: 'Gemini', score: 53, decimal: 0.257, color: '#4285F4', icon: '🔵' },
  { model: 'OpenAI ChatGPT Deep Research', shortName: 'ChatGPT', score: 44, decimal: 0.214, color: '#00A67E', icon: '🟢' },
  { model: 'Grok Deeper Search', shortName: 'Grok', score: 31, decimal: 0.150, color: '#1DA1F2', icon: '🔷' }
];

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
  return (
    <div style={{
      display: 'flex',
      gap: '2rem',
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Main Chart Section */}
      <div style={{flex: '2'}}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '2rem',
          color: '#1a1a1a'
        }}>
          ReSearch Bench Index
        </h2>
        
        <div style={{
          height: '400px',
          padding: '2rem',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e1e5e9'
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="shortName"
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={{ stroke: '#e1e5e9' }}
                tickLine={{ stroke: '#e1e5e9' }}
              />
              <YAxis 
                domain={[0, 1.0]}
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={{ stroke: '#e1e5e9' }}
                tickLine={{ stroke: '#e1e5e9' }}
                label={{ value: 'ReSearch Bench Score', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="decimal" 
                radius={[4, 4, 0, 0]}
              >
                {data.map((entry, index) => (
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
        padding: '2rem',
        borderRadius: '8px',
        border: '1px solid #e1e5e9'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '18px',
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
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '4px'
            }}>
              📋
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '4px'
            }}>
              📥
            </button>
          </div>
        </div>
        
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