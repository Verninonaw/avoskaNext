import { Header } from "../components/header"
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="bg-white">
          <Header />

          <main>
            {children}
          </main>

          <footer className="p-5 text-center text-gray-400 border-t">
            Авоська
          </footer>
      </body>
    </html>
  );
}
