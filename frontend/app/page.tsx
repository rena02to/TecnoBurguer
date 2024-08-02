import HomeSelector from "@/components/HomeSelector";
import TopHomePage from "@/components/TopHomePage";

export const metadata = {
  title: 'TecnoBurguer'
};

export default function Home() {
  return (
    <>
      <TopHomePage/>
      <HomeSelector/>
    </>
  );
}