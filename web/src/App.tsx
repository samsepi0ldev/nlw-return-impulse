import { AuthProvider, useAuth } from './context/auth'
import { Widget } from './components/Widget'
import { Header } from './components/Header'
import { FeedbackType } from './components/WidgetForm'
import { useEffect, useState } from 'react'
import { Content } from './components/Content'

export interface FeedbackData {
  id: string
  type: FeedbackType
  comment: string
  screenshot: string | null
}

export function App () {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([])

  return (
    <AuthProvider>
      <Header feedbacksParamSetter={setFeedbacks} />
      <Content feedbacks={feedbacks} />
      <Widget />
    </AuthProvider>
  )
}
