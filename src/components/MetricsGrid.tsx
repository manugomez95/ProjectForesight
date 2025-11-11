import { motion } from 'framer-motion'

interface MetricsGridProps {
  selectedMetric: string
  onSelectMetric: (metric: string) => void
}

interface MetricCard {
  id: string
  title: string
  value: string
  trend: string
  color: string
}

const metrics: MetricCard[] = [
  {
    id: 'computing-power',
    title: 'Computing Power',
    value: '2.5x',
    trend: '+150%',
    color: '#8884d8'
  },
  {
    id: 'model-size',
    title: 'Model Size',
    value: '10T',
    trend: '+200%',
    color: '#82ca9d'
  },
  {
    id: 'training-cost',
    title: 'Training Cost',
    value: '$100M',
    trend: '+75%',
    color: '#ffc658'
  },
  {
    id: 'capabilities',
    title: 'Capabilities',
    value: '95%',
    trend: '+45%',
    color: '#ff8042'
  }
]

const MetricsGrid = ({ selectedMetric, onSelectMetric }: MetricsGridProps) => {
  return (
    <div className="metrics-grid">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.id}
          className={`metric-card ${selectedMetric === metric.id ? 'active' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectMetric(metric.id)}
          style={{ borderColor: metric.color }}
        >
          <div className="metric-header">
            <h3>{metric.title}</h3>
            <span className="trend" style={{ color: metric.color }}>
              {metric.trend}
            </span>
          </div>
          <div className="metric-value" style={{ color: metric.color }}>
            {metric.value}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default MetricsGrid
