import Footer from '@/components/Footer/Footer'
import './globals.css'
import Navbar from '@/components/Navbar/Navbar'
import Footer2 from '@/components/Footer/Footer2'
import ForgentisAnimation from '@/components/forgentisAnimation/mainAnimation'

export const metadata = {
  title: 'Forgentis Fabrication - Sharp Cuts | Perfect Form',
  description: 'A diversified manufacturing group: precision metalwork, high-definition print and packaging, and consumer design brands.',
  icons: {
    icon: '/ForgentisLogo1.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <ForgentisAnimation/>
        <main>{children}</main>
        {/* <Footer/> */}
        <Footer2/>
      </body>
    </html>
  )
}