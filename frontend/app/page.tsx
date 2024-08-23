import ImageTop from "@/components/ImageTop";
import NavBar from "@/components/NavBar";
import Stores from "@/components/Stores";
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