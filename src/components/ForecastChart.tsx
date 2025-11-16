import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { motion } from 'framer-motion'
import { getYAxisProps, formatTickValue, formatTooltipValue } from '../utils/chartUtils';
import ScaleToggleButton from './ScaleToggleButton';

interface ForecastChartProps {
  metric: string
}

// Sample data - replace with your actual data
const generateData = (_metric: string) => {
  const baseData = [
    { year: 2020, value: 100, prediction: 100 },
    { year: 2021, value: 150, prediction: 145 },
    { year: 2022, value: 225, prediction: 220 },
    { year: 2023, value: 340, prediction: 330 },
    { year: 2024, value: 510, prediction: 500 },
    { year: 2025, value: null, prediction: 750 },
    { year: 2026, value: null, prediction: 1125 },
    { year: 2027, value: null, prediction: 1687 },
    { year: 2028, value: null, prediction: 2531 },
    { year: 2029, value: null, prediction: 3796 },
    { year: 2030, value: null, prediction: 5694 },
  ]

  return baseData
}

const ForecastChart = ({ metric }: ForecastChartProps) => {
  const data = generateData(metric)
  const [isLogScale, setIsLogScale] = useState(false)

  return (
    <motion.div
      className="chart-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2>AI {metric.replace('-', ' ')} Forecast</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
        <ScaleToggleButton
          isLogScale={isLogScale}
          onToggle={() => setIsLogScale(!isLogScale)}
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrediction" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="year"
            tick={{ fill: '#888' }}
          />
          <YAxis
            tick={{ fill: '#888' }}
            {...getYAxisProps(isLogScale)}
            tickFormatter={(value) => formatTickValue(value, isLogScale)}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid #444',
              borderRadius: '8px'
            }}
            formatter={(value: number) => formatTooltipValue(value)}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorValue)"
            name="Actual Value"
          />
          <Area
            type="monotone"
            dataKey="prediction"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorPrediction)"
            name="Prediction"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default ForecastChart
