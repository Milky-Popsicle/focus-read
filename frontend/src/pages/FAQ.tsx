import { Card, Header } from '../components/Card'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import './Dashboard.css'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'students' | 'teachers' | 'admin'
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I log in to the FocusRead system?',
    answer: 'To log in, enter your email address and password on the login page. If you don\'t have an account, contact your administrator to create one for you.',
    category: 'general'
  },
  {
    id: '2',
    question: 'How do students start a reading assessment?',
    answer: 'Students can start a reading assessment by navigating to their dashboard and clicking on "My Tasks" or "Reading Activity" from the sidebar. Select an assigned reading material and follow the on-screen instructions to begin the assessment.',
    category: 'students'
  },
  {
    id: '3',
    question: 'How can teachers assign reading materials?',
    answer: 'Teachers can assign reading materials by going to the "Materials" section from the sidebar, selecting or uploading a reading material, and then assigning it to specific students or classes through the assessment creation process.',
    category: 'teachers'
  },
  {
    id: '4',
    question: 'Where can students view their reading progress?',
    answer: 'Students can view their reading progress by accessing the "Progress" or "My Tasks" section from the sidebar. This shows completed assessments, current scores, and overall reading statistics.',
    category: 'students'
  },
  {
    id: '5',
    question: 'How do users update their profile information?',
    answer: 'Users can update their profile picture by clicking the camera icon on their profile card (if available) or by contacting their administrator for other profile changes. Profile pictures help personalize the user experience.',
    category: 'general'
  },
  {
    id: '6',
    question: 'How can teachers create assessments?',
    answer: 'Teachers can create assessments by navigating to the "Assessments" section from the sidebar. Select "Create Assessment", choose reading materials, set questions and criteria, and assign to students.',
    category: 'teachers'
  },
  {
    id: '7',
    question: 'What should I do if I forget my password?',
    answer: 'If you forget your password, contact your system administrator. They can reset your password or provide you with a temporary password to regain access to your account.',
    category: 'general'
  },
  {
    id: '8',
    question: 'How can administrators manage users?',
    answer: 'Administrators can manage users by accessing the "Users" section from the sidebar. Here you can view all users, add new users, edit user information, and manage user roles and permissions.',
    category: 'admin'
  },
  {
    id: '9',
    question: 'How do students track their reading goals?',
    answer: 'Students can track their reading goals through the dashboard statistics and progress reports. The system shows completed tasks, average scores, and progress towards reading milestones.',
    category: 'students'
  },
  {
    id: '10',
    question: 'How can teachers view student reports?',
    answer: 'Teachers can view student reports by accessing the "Reports" section from the sidebar. This provides detailed analytics on student performance, reading progress, and assessment results.',
    category: 'teachers'
  }
]

export const FAQ = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const toggleItem = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const filteredFAQs = selectedCategory === 'all'
    ? faqData
    : faqData.filter(item => item.category === selectedCategory)

  const categories = [
    { value: 'all', label: 'All Questions' },
    { value: 'general', label: 'General' },
    { value: 'students', label: 'Students' },
    { value: 'teachers', label: 'Teachers' },
    { value: 'admin', label: 'Administrators' }
  ]

  return (
    <DashboardLayout>
      <div className="dashboard-container">
        <Header
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about using FocusRead"
        />

        <div className="faq-container">
          <div className="faq-filters">
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category.value}
                  className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="faq-list">
            {filteredFAQs.map(item => (
              <Card key={item.id} className="faq-item">
                <div className="faq-question" onClick={() => toggleItem(item.id)}>
                  <div className="faq-question-content">
                    <HelpCircle size={20} className="faq-icon" />
                    <h4>{item.question}</h4>
                  </div>
                  {expandedItems.has(item.id) ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>
                {expandedItems.has(item.id) && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                    <span className={`faq-category category-${item.category}`}>
                      {categories.find(cat => cat.value === item.category)?.label}
                    </span>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <Card className="faq-empty">
              <p className="text-secondary">No questions found for the selected category.</p>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
