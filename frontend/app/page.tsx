import Infos from "@/components/Infos";
import Menu from "@/components/Menu";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: 'TecnoBurguer'
};

export default function Home() {
  return (
    <>
      <main>
        <NavBar/>
        <Infos/>
      </main>
    </>
  );
}