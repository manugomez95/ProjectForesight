import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import ScenarioSelector from './components/ScenarioSelector'
import ScenarioViewer from './components/ScenarioViewer'
import ParameterComparisonView from './components/ParameterComparisonView'
import AssumptionComparisonView from './components/AssumptionComparisonView'
import QuizView from './components/QuizView'
import { scenarios } from './data/scenarios'
import type { QuizAnswer } from './types/quiz'
import type { AIScenario } from './types/scenario'
import { generateForecastFromQuiz } from './utils/generateForecast'
import { getQuizAnswersFromUrl, createShareableUrl } from './utils/shareQuiz'

type AppViewMode = 'scenario' | 'parameter' | 'assumptions' | 'quiz'

function App() {
  const [viewMode, setViewMode] = useState<AppViewMode>('scenario')
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    scenarios[0]?.id || ''
  )
  const [quizForecast, setQuizForecast] = useState<AIScenario | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[] | null>(null)
  const [shareUrl, setShareUrl] = useState<string>('')
  const [copyButtonText, setCopyButtonText] = useState<string>('Copy Link')
  const [focusedAssumptionId, setFocusedAssumptionId] = useState<string | undefined>(undefined)

  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId)

  const handleNavigateToAssumption = (assumptionId: string) => {
    setFocusedAssumptionId(assumptionId)
    setViewMode('assumptions')
  }

  // Load quiz answers from URL on mount
  useEffect(() => {
    const answersFromUrl = getQuizAnswersFromUrl()
    if (answersFromUrl) {
      setQuizAnswers(answersFromUrl)
      const generatedForecast = generateForecastFromQuiz(answersFromUrl)
      setQuizForecast(generatedForecast)
      setViewMode('quiz')
      // Set share URL to current URL
      setShareUrl(window.location.href)
    }
  }, [])

  const handleQuizComplete = (answers: QuizAnswer[]) => {
    setQuizAnswers(answers)
    const generatedForecast = generateForecastFromQuiz(answers)
    setQuizForecast(generatedForecast)

    // Generate shareable URL
    const url = createShareableUrl(answers)
    setShareUrl(url)

    // Update browser URL without reload
    window.history.pushState({}, '', url)
  }

  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopyButtonText('Copied!')
    setTimeout(() => setCopyButtonText('Copy Link'), 2000)
  }

  return (
    <div className={`app ${viewMode === 'parameter' ? 'parameter-mode' : 'scenario-mode'}`}>
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

        <div className="app-view-toggle">
          <button
            className={`view-toggle-button ${viewMode === 'scenario' ? 'active' : ''}`}
            onClick={() => setViewMode('scenario')}
          >
            Scenario View
          </button>
          <button
            className={`view-toggle-button ${viewMode === 'parameter' ? 'active' : ''}`}
            onClick={() => setViewMode('parameter')}
          >
            Parameter Comparison
          </button>
          <button
            className={`view-toggle-button ${viewMode === 'assumptions' ? 'active' : ''}`}
            onClick={() => setViewMode('assumptions')}
          >
            Assumption Analysis
          </button>
          <button
            className={`view-toggle-button ${viewMode === 'quiz' ? 'active' : ''}`}
            onClick={() => setViewMode('quiz')}
          >
            Create Your Forecast
          </button>
        </div>
      </motion.header>

      <main className="main-content">
        {viewMode === 'scenario' ? (
          <>
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
                <ScenarioViewer scenario={selectedScenario} onNavigateToAssumption={handleNavigateToAssumption} />
              </motion.section>
            )}
          </>
        ) : viewMode === 'parameter' ? (
          <motion.section
            className="comparison-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <ParameterComparisonView />
          </motion.section>
        ) : viewMode === 'assumptions' ? (
          <motion.section
            className="comparison-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <AssumptionComparisonView scenarios={scenarios} focusedAssumptionId={focusedAssumptionId} />
          </motion.section>
        ) : (
          <motion.section
            className="quiz-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {!quizForecast ? (
              <QuizView onComplete={handleQuizComplete} initialAnswers={quizAnswers || []} />
            ) : (
              <div className="quiz-forecast-container">
                <div className="quiz-forecast-header">
                  <h2>Your Personalized AI Forecast</h2>
                  <p className="quiz-forecast-subtitle">
                    Based on your answers, here's your custom AI scenario
                  </p>
                  {shareUrl && (
                    <div className="quiz-share-section">
                      <div className="quiz-share-label">Share your forecast:</div>
                      <div className="quiz-share-url-container">
                        <div className="quiz-share-url">{shareUrl}</div>
                        <button
                          className={`quiz-copy-button ${copyButtonText === 'Copied!' ? 'copied' : ''}`}
                          onClick={handleCopyShareUrl}
                        >
                          {copyButtonText}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <ScenarioViewer scenario={quizForecast} onNavigateToAssumption={handleNavigateToAssumption} />
                <button
                  className="quiz-back-button"
                  onClick={() => {
                    setQuizForecast(null)
                    setQuizAnswers(null)
                    setShareUrl('')
                    window.history.pushState({}, '', window.location.pathname)
                  }}
                >
                  ← Create New Forecast
                </button>
              </div>
            )}
          </motion.section>
        )}
      </main>
    </div>
  )
}

export default App
