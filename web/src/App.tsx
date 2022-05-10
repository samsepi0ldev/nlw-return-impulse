import { AuthProvider } from './context/auth'
import { Widget } from './components/Widget'
import { Header } from './components/Header'


export function App () {
  return (
    <AuthProvider>
      <Header />
      <main className='w-full px-6 pt-6 text-center md:text-left md:pt-12 md:px-40'>
        <div className='bg-zinc-800 py-12 px-14 rounded-md text-zinc-400'>
          Experimente enviar um feedback de um <i>bug</i> na aplicação 🐛 
        </div>
      </main>
      <Widget />
    </AuthProvider>
  )
}
