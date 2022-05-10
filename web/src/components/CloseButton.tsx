import { Popover } from '@headlessui/react'
import { X } from 'phosphor-react'

export function CloseButton () {
  return (
    <Popover.Button className='absolute top-5 right-5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-100 dark:hover:text-zinc-800' title='Fechar Formulário'>
      <X weight='bold' className='w-4 h-4' />
    </Popover.Button>
  )
}
