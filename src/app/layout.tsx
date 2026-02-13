import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "n.sign | Gerador de Assinaturas NESS",
  description: "n.sign - Gerador de assinaturas de e-mail profissionais da NESS. Crie assinaturas elegantes com templates personalizados.",
  keywords: ["n.sign", "NESS", "assinatura", "email", "signature", "corporativo", "profissional"],
  authors: [{ name: "NESS" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' font-family='Arial' font-weight='bold' fill='white'>n<tspan fill='%2300ade8'>.</tspan></text></svg>",
  },
  openGraph: {
    title: "n.sign | Gerador de Assinaturas NESS",
    description: "Gerador de assinaturas de e-mail profissionais da NESS",
    url: "https://www.ness.com.br",
    siteName: "n.sign",
    type: "website",
  },
};

import { AuthProvider } from "@/hooks/use-auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} font-montserrat antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
