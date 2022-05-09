import { CloseButton } from '../CloseButton'

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { useCallback, useState } from 'react'
import { FeedbackTypeStep } from './steps/FeedbackTypeStep'
import { FeedbackContentStep } from './steps/FeedbackContentStep'
import { FeedbackSuccessStep } from './steps/FeedbackSuccessStep'

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lâmpada'
    }
  },
  THOUGHT: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de um balão de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm () {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)
  const feedbackRestartOnRequested = useCallback(() => {
    setFeedbackSent(false)
    setFeedbackType(null)
  }, [])

  return (
    <div className='relative bg-zinc-900 rounded-2xl p-4 mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2.5rem)] md:w-auto'>
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequested={feedbackRestartOnRequested} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={feedbackRestartOnRequested}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer>
        <span className='text-xs text-neutral-400'>
          Feito com ♥ por <a href='#' className='underline underline-offset-2'>Elivelton S.</a>
        </span>
      </footer>
    </div>
  )
}
