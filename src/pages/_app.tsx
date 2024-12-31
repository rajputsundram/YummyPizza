import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Layout  from '@/components/layouts/Layout'
import { CartProvider } from "@/utils/ContextReducer";

export default function App({ Component, pageProps }: AppProps) {
  return(
  <ThemeProvider attribute="class">
    <CartProvider>
    <Layout>
   <Component {...pageProps} />
   </Layout>
   </CartProvider>
   </ThemeProvider>
   )
}
