import HomeSelector from "@/components/HomeSelector";
import ImageTop from "@/components/ImageTop";
import NavBar from "@/components/NavBar";
import { ContextProvider } from "@/context/context";

export const metadata = {
  title: 'TecnoBurguer'
};

export default function Home() {
  return (
    <ContextProvider>
      <NavBar/>
      <ImageTop/>
      <HomeSelector/>
    </ContextProvider>
  );
}