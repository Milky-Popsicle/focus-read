import { useState } from 'react'
import { Card, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { BookOpen, Clock, Users } from 'lucide-react'
import './ReadingActivity.css'

export const ReadingActivity = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})

  const material = {
    id: 1,
    title: 'The Great Adventure',
    author: 'Jane Smith',
    estimatedTime: '15 mins',
    wordCount: 1500,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`,
  }

  const questions = [
    {
      id: 1,
      text: 'What is the main theme of this passage?',
      options: ['Adventure', 'Love', 'Mystery', 'Exploration'],
      correct: 'Adventure',
    },
    {
      id: 2,
      text: 'Who is the author of this material?',
      options: ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'],
      correct: 'Jane Smith',
    },
  ]

  const handleAnswer = (questionId: number, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleSubmit = () => {
    const score = Object.entries(selectedAnswers).filter(
      ([id, answer]) => {
        const question = questions.find(q => q.id === Number(id))
        return question?.correct === answer
      }
    ).length
    alert(`You scored ${score}/${questions.length}`)
  }

  return (
    <DashboardLayout>
      <div className="reading-activity-container">
        <Header title="Reading Activity" subtitle="Read and comprehend the material" />

        <div className="reading-layout">
          <div className="reading-content">
            <Card className="material-card">
              <div className="material-header">
                <div>
                  <h2>{material.title}</h2>
                  <p className="material-meta">
                    <span className="meta-item">
                      <span>By {material.author}</span>
                    </span>
                    <span className="meta-item">
                      <Clock size={16} />
                      <span>{material.estimatedTime}</span>
                    </span>
                    <span className="meta-item">
                      <span>{material.wordCount} words</span>
                    </span>
                  </p>
                </div>
              </div>

              <div className="material-body">
                <div className="reading-text">
                  {material.content}
                </div>

                <div className="reading-controls">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="btn btn-outline"
                  >
                    ← Previous
                  </button>
                  <span className="page-indicator">Page {currentPage} of 3</span>
                  <button
                    disabled={currentPage === 3}
                    onClick={() => setCurrentPage(prev => Math.min(3, prev + 1))}
                    className="btn btn-outline"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <div className="assessment-sidebar">
            <Card className="assessment-card">
              <h3>Comprehension Questions</h3>
              <div className="questions-list">
                {questions.map((q, idx) => (
                  <div key={q.id} className="question-block">
                    <h4>Question {idx + 1}</h4>
                    <p className="question-text">{q.text}</p>
                    <div className="options">
                      {q.options.map(option => (
                        <label key={option} className="option-label">
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option}
                            checked={selectedAnswers[q.id] === option}
                            onChange={() => handleAnswer(q.id, option)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                className="btn btn-primary w-full"
                disabled={Object.keys(selectedAnswers).length !== questions.length}
              >
                Submit Assessment
              </button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
