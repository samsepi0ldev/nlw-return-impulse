import { ArrowLeft } from 'phosphor-react'
import { FormEvent, useCallback, useState } from 'react'
import { FeedbackType, feedbackTypes } from '..'
import { api } from '../../../services/api'
import { CloseButton } from '../../CloseButton'
import { Loading } from '../../Loading'
import { ScreenshotButton } from '../ScreenshotButton'

interface FeedbackContentStepProps {
  feedbackType: FeedbackType
  onFeedbackSent: () => void
  onFeedbackRestartRequested: () => void
}

export function FeedbackContentStep ({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  async function handleSubmitFeedback (e: FormEvent){
    e.preventDefault()

    setIsSendingFeedback(true)

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot
    })
    
    setIsSendingFeedback(false)
    onFeedbackSent()
  }

  const feedbackTypInfo = feedbackTypes[feedbackType]

  return (
    <>
      <header>
        <button
        type='button'
        className='absolute top-5 left-5 text-zinc-400 hover:text-zinc-100'
        onClick={onFeedbackRestartRequested}>

          <ArrowLeft weight='bold' className='w-4 h-4'  />
        </button>

        <span className='text-xl leading-6 flex items-center justify-center gap-2'>
          <img src={feedbackTypInfo.image.source} alt={feedbackTypInfo.image.alt} className='w-6 h-6' />
          {feedbackTypInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className='my-4 w-full'>
        <textarea
          onChange={e => setComment(e.target.value)}
          className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-x-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
          placeholder='Conte com detalhes oque está acontecendo...'
        />
        <footer className='flex gap-2 mt-2'>
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTool={setScreenshot} />

          <button
            disabled={!comment.length || isSendingFeedback}
            type='submit'
            className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:bg-brand-500 disabled:cursor-not-allowed'>
            { isSendingFeedback ? <Loading /> : 'Enviar feedback' }
          </button>
        </footer>
      </form>
    </>
  )
}
