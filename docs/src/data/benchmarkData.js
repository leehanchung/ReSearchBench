const modelConfig = {
  'Google Gemini Deep Research': { shortName: 'Gemini', color: '#4285F4', icon: '🔵' },
  'OpenAI ChatGPT Deep Research': { shortName: 'ChatGPT', color: '#00A67E', icon: '🟢' },
  'Grok Deeper Search': { shortName: 'Grok', color: '#1DA1F2', icon: '🔷' }
};

const csvData = `Model,Score,Decimal
Google Gemini Deep Research,53,0.257
OpenAI ChatGPT Deep Research,44,0.214
Grok Deeper Search,31,0.150`;

function loadDataFromCSV() {
  try {
    const lines = csvData.trim().split('\n');
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const model = values[0];
      const score = parseInt(values[1]);
      const decimal = parseFloat(values[2]);
      
      const config = modelConfig[model] || { 
        shortName: model.split(' ')[0], 
        color: '#666666', 
        icon: '⚪' 
      };
      
      return {
        model,
        shortName: config.shortName,
        score,
        decimal,
        color: config.color,
        icon: config.icon
      };
    });
  } catch (error) {
    console.warn('Could not parse CSV data, using fallback data:', error);
    return [
      { model: 'Google Gemini Deep Research', shortName: 'Gemini', score: 53, decimal: 0.257, color: '#4285F4', icon: '🔵' },
      { model: 'OpenAI ChatGPT Deep Research', shortName: 'ChatGPT', score: 44, decimal: 0.214, color: '#00A67E', icon: '🟢' },
      { model: 'Grok Deeper Search', shortName: 'Grok', score: 31, decimal: 0.150, color: '#1DA1F2', icon: '🔷' }
    ];
  }
}

export const benchmarkData = loadDataFromCSV();