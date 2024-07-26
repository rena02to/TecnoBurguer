import './styles/global.scss';
import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  description: "Management system developed for a restaurant with the aim of serving both customers and employees, facilitating registration, placing orders and internal management of the store.",
  title: 'TecnoBurguer'
};

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const locale = await getLocale();
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <ToastContainer position="bottom-right" autoClose={6000} closeOnClick/>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}