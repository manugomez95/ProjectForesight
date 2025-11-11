import { useState, useEffect } from 'react';
import { QuizQuestion, QuizAnswer } from '../types/quiz';
import { quizQuestions } from '../data/quizQuestions';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizViewProps {
  onComplete: (answers: QuizAnswer[]) => void;
  initialAnswers?: QuizAnswer[];
}

export default function QuizView({ onComplete, initialAnswers = [] }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>(initialAnswers);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

  const getCurrentAnswer = () => {
    return answers.find((a) => a.questionId === currentQuestion.id)?.value;
  };

  const handleAnswer = (value: number | string) => {
    const newAnswers = answers.filter((a) => a.questionId !== currentQuestion.id);
    newAnswers.push({ questionId: currentQuestion.id, value });
    setAnswers(newAnswers);
  };

  const canGoNext = () => {
    return getCurrentAnswer() !== undefined;
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (canGoNext()) {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleGenerateForecast = () => {
    onComplete(answers);
  };

  const renderQuestionInput = (question: QuizQuestion) => {
    const currentValue = getCurrentAnswer();

    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="quiz-options">
            {question.options?.map((option) => (
              <button
                key={option.id}
                className={`quiz-option ${currentValue === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(option.value)}
              >
                <div className="quiz-option-label">{option.label}</div>
                {option.description && (
                  <div className="quiz-option-description">{option.description}</div>
                )}
              </button>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className="quiz-scale-container">
            <div className="quiz-scale-labels">
              <span>{question.min}</span>
              <span className="quiz-scale-value">
                {currentValue !== undefined ? `${currentValue}${question.unit || ''}` : '-'}
              </span>
              <span>{question.max}</span>
            </div>
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={currentValue !== undefined ? Number(currentValue) : question.min}
              onChange={(e) => handleAnswer(Number(e.target.value))}
              className="quiz-scale-input"
            />
          </div>
        );

      case 'year':
        return (
          <div className="quiz-year-container">
            <input
              type="number"
              min={question.min}
              max={question.max}
              value={currentValue !== undefined ? Number(currentValue) : ''}
              onChange={(e) => handleAnswer(Number(e.target.value))}
              placeholder={`Enter year (${question.min}-${question.max})`}
              className="quiz-year-input"
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="quiz-results-container"
      >
        <h2>Quiz Complete!</h2>
        <p className="quiz-results-description">
          Based on your answers, we'll generate a personalized AI forecast. You can share this
          forecast with others using a unique link.
        </p>
        <div className="quiz-results-summary">
          <h3>Your Answers:</h3>
          {quizQuestions.map((q) => {
            const answer = answers.find((a) => a.questionId === q.id);
            let displayValue = answer?.value;

            if (q.type === 'multiple-choice') {
              const option = q.options?.find((o) => o.value === answer?.value);
              displayValue = option?.label;
            } else if (q.type === 'scale' && answer) {
              displayValue = `${answer.value}${q.unit || ''}`;
            }

            return (
              <div key={q.id} className="quiz-answer-summary">
                <div className="quiz-answer-question">{q.question}</div>
                <div className="quiz-answer-value">{displayValue}</div>
              </div>
            );
          })}
        </div>
        <div className="quiz-results-actions">
          <button onClick={handleGenerateForecast} className="quiz-generate-button">
            Generate My Forecast
          </button>
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentQuestionIndex(0);
            }}
            className="quiz-retake-button"
          >
            Retake Quiz
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Create Your AI Forecast</h2>
        <div className="quiz-progress-container">
          <div className="quiz-progress-bar">
            <motion.div
              className="quiz-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="quiz-progress-text">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="quiz-question-container"
        >
          <div className="quiz-question-category">{currentQuestion.category.toUpperCase()}</div>
          <h3 className="quiz-question">{currentQuestion.question}</h3>
          {renderQuestionInput(currentQuestion)}
        </motion.div>
      </AnimatePresence>

      <div className="quiz-navigation">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="quiz-nav-button"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!canGoNext()}
          className="quiz-nav-button quiz-nav-button-next"
        >
          {currentQuestionIndex === quizQuestions.length - 1 ? 'Review Answers' : 'Next →'}
        </button>
      </div>
    </div>
  );
}
