import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import SessionProvider from "../utilsfunctions/sessionProvider";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Provider from "../utilsfunctions/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Torus 9X App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head> */}
      <body className={inter.className}>
        <Provider>
          <SessionProvider>{children}</SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
