import ImageTop from "@/components/ImageTop";
import Stores from "@/components/Stores";
import NavBar from "@/components/NavBar";
import { ContextProvider } from "@/context/context";

export const metadata = {
  title: 'TecnoBurguer'
};

export default function Home() {
  return (
    <ContextProvider>
      <ImageTop/>
      <Stores/>
    </ContextProvider>
  );
}