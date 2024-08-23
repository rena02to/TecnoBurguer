'use client';
import style from './../styles/search.module.scss';
import Filters from "@/components/Filters";
import ImageTop from "@/components/ImageTop";
import { useTranslations } from "next-intl";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';
import { MdAttachMoney, MdDeliveryDining } from 'react-icons/md';
import { RiLoader2Line } from 'react-icons/ri';

interface Food{
    id: number;
    name: string;
    value: string;
    image: string;
}

interface OpeningHoursType {
    status: string;
}

interface Store{
    id: number;
    name: string;
    min_order: number;
    average_rating: number;
    is_open_now: boolean;
    foods: Food[];
    opening_hours?: OpeningHoursType;
}

export default function Search(){
    const t = useTranslations('Search');
    const [ loading, setLoading ] = useState(true);
    const searchParams = useSearchParams();
    const [ storesOpen, setStoresOpen ] = useState<Store[]>([]);
    const [ storesClose, setStoresClose ] = useState<Store[]>([]);
    const query = searchParams.get('q') || '';
    const o = searchParams.get('order') || 'default';
    const r = searchParams.get('rate') || '';
    const filter = searchParams.get('filter') || '';
    const [ itemsOrStores, setItemsOrStores ] = useState('stores');

    useEffect(() => {
        if(query){
            document.title = `${query} - TecnoBurguer`;
            setItemsOrStores(filter)
            const fetchData = async() => {
                setLoading(true);
                try{
                    let url = `http://localhost:8000/api/stores/search?q=${query}&filter=${filter}`
                    if(o !== 'default'){
                        url += `&order=${o}`;
                    }
                    if(r !== ''){
                        url += `&rate=${r}`;
                    }
                    const response = await fetch(url);
                    if(response.ok) {
                        const stores = await response.json();
                        setStoresOpen(stores.open);
                        setStoresClose(stores.close);
                    }else {
                        console.error('Network response was not ok');
                        setStoresOpen([]);
                        setStoresClose([]);
                    }
                }catch(error){
                    console.error(error);
                    setStoresOpen([]);
                    setStoresClose([]);
                }finally{
                    setLoading(false);
                }
            }
            fetchData();
        }else{
            window.location.href = '/';
        }
    }, [ query, filter ]);

    const handleFilter = ( value: string ) => {
        if(value !== itemsOrStores){
            let url = `/search?q=${query}&filter=${value}`
            if(o !== 'default'){
                url += `&order=${o}`;
            }
            if(r !== ''){
                url += `&rate=${r}`;
            }
            window.location.href = url;
        }
    }

    return(
        <div className={style.search}>
            <ImageTop/>
            <Filters filters={true}/>
            <div className={style.resultsContainer}>
                {loading && <p className={style.load}>{t('load')}<RiLoader2Line/></p>}
                <div className={style.results}>
                    {!loading &&
                        <>
                            <h1>{t('resultsfor')}<span>{query}</span></h1>
                            <div className={style.itemsOrStores}>
                                <button type="button" className={itemsOrStores === 'stores' ? style.activated : style.desactivated} onClick={() => {handleFilter('stores')}}>Lojas</button>
                                <button type="button" className={itemsOrStores === 'items' ? style.activated : style.desactivated} onClick={() => {handleFilter('items')}}>Itens</button>
                            </div>
                            {storesOpen.length <= 0 && storesClose.length <= 0 ?
                                <div className={style.image}>
                                    <h1>{t('notresults')}</h1>
                                    <Image src='/Images/noresults.png' width={300} height={300} alt='No resulta image'/>
                                </div>
                                :
                                <>
                                    {itemsOrStores === 'stores' ? 
                                        <div className={style.stores}>
                                            {storesOpen.map((store) => (
                                                <div className={style.store}>
                                                    <div className={style.image}>
                                                        <Image src='/Images/icon-simplified.svg' width={75} height={75} alt='Image from store'/>
                                                    </div>
                                                    <div className={style.infos}>
                                                        <h2>{store.name}</h2>
                                                        <span>
                                                            <p>{store.opening_hours?.status}</p>
                                                            <p><FaStar/></p>
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                            {storesClose.map((store) => (
                                               <p>{store.name}</p> 
                                            ))}
                                        </div>
                                        : 
                                        <div className={style.items}></div>
                                    }
                                </>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}