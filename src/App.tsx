import { useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import ForecastChart from './components/ForecastChart'
import MetricsGrid from './components/MetricsGrid'

function App() {
  const [selectedMetric, setSelectedMetric] = useState<string>('computing-power')

  return (
    <div className="app">
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>ProjectForesight</h1>
        <p className="subtitle">AI Future Projections & Forecasting</p>
      </motion.header>

      <main className="main-content">
        <MetricsGrid
          selectedMetric={selectedMetric}
          onSelectMetric={setSelectedMetric}
        />

        <motion.section
          className="chart-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ForecastChart metric={selectedMetric} />
        </motion.section>
      </main>
    </div>
  )
}

export default App
