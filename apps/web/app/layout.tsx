import "./globals.css";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";

import { Toaster } from "react-hot-toast";

export default function RootLayout(
  {children}: Readonly<{children: React.ReactNode;}>
) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <Container>
          {children}
        </Container>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
