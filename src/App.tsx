import { useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import ScenarioSelector from './components/ScenarioSelector'
import ScenarioViewer from './components/ScenarioViewer'
import { scenarios } from './data/scenarios'

function App() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    scenarios[0]?.id || ''
  )

  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId)

  return (
    <div className="app">
      <motion.header
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>ProjectForesight</h1>
        <p className="subtitle">
          Standardize and Visualize AI Forecasts & Scenarios
        </p>
      </motion.header>

      <main className="main-content">
        <motion.section
          className="selector-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <ScenarioSelector
            scenarios={scenarios}
            selectedScenarioId={selectedScenarioId}
            onSelectScenario={setSelectedScenarioId}
          />
        </motion.section>

        {selectedScenario && (
          <motion.section
            className="viewer-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ScenarioViewer scenario={selectedScenario} />
          </motion.section>
        )}
      </main>
    </div>
  )
}

export default App
