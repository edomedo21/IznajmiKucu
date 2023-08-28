import './globals.css'
import { Nunito } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/GetCurrentUser'
import RentModal from './components/modals/RentModal'
import Head from 'next/head'
import Footer from './components/Footer/Footer'

export const metadata = {
  title: 'Iznajmi kuću | vikendicu | apartman',
  description: 'Pronađi idealni posjed za odmor!',
}

const font = Nunito({
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/images/logo.png" />
      </Head>
      <body>
        <ClientOnly>
        <ToasterProvider />
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className='pb-20 pt-28'>
        {children}
        </div>
        <ClientOnly>
        <Footer />
        </ClientOnly>
        </body>
    </html>
  )
}
