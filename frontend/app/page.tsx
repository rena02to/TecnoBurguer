import Footer from "@/components/Footer";
import ImageTop from "@/components/ImageTop";
import NavBar from "@/components/NavBar";
import Stores from "@/components/Stores";

export const metadata = {
  title: 'TecnoBurguer'
};

export default function Home(){
  return (
    <>
      <NavBar/>
      <main>
        <ImageTop/>
        <Stores/>
      </main>
      <Footer/>
    </>
  );
}