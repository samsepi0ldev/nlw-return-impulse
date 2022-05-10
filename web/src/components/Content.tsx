import { FeedbackData } from '../App'
import { useAuth } from '../context/auth'
import { feedbackTypes } from './WidgetForm'

interface ContentProps {
  feedbacks: FeedbackData[]
}

export function Content ({ feedbacks }: ContentProps) {
  const { signed } = useAuth()

  return (
    <main className='w-full px-6 pt-6 text-center md:text-left md:pt-12 md:px-40'>
      <div className='bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-500 py-12 px-14 rounded-md text-zinc-400'>
        Experimente enviar um feedback de um <i>bug</i> na aplicação 🐛
      </div>
      <div id='container-feedbacks' className='mt-8 grid grid-cols-3 gap-8'>
        {signed
          ? feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className='relative group dark:bg-zinc-100 transition-all h-[310px] border-2 hover:border-brand-500 border-transparent bg-zinc-800 rounded-md flex flex-col items-center justify-center px-8'>
                <img
                className='w-32 shrink-0'
                  src={feedbackTypes[feedback.type].image.source}
                  alt={feedbackTypes[feedback.type].image.alt} />

                <h1 className='text-2xl mt-4'>{feedback.type}</h1>
                <p className='text-zinc-400 dark:text-zinc-500 text-center mt-4'>{feedback.comment}</p>
                {feedback.screenshot ? (
                  <div 
                    className='w-full h-full block bg-[length:0px_0px] opacity-0 group-hover:opacity-20 dark:group-hover:opacity-0 transition-opacity group-hover:bg-cover absolute top-0 left-0 -z-0'
                    style={{
                    backgroundImage: `url(${feedback.screenshot})`,
                    backgroundPosition: 'right bottom'
                    }}></div>
                ): null}
              </div>
            ))
          : Array.from({ length: 5 }, (_, i) => (
              <div key={i} className='h-[310px] bg-zinc-800 dark:bg-zinc-100 rounded-md'></div>
            ))}
      </div>
    </main>
  )
}
