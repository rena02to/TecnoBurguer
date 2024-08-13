'use client';
import Filters from "@/components/Filters";
import ImageTop from "@/components/ImageTop";
import { useSearchParams } from "next/navigation";

export default function Search(){
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';

    return(
        <>
            <ImageTop/>
            <Filters value={query}/>
        </>
    )
}