'use client';
import style from './../styles/search.module.scss';
import Filters from "@/components/Filters";
import Footer from '@/components/Footer';
import ImageTop from "@/components/ImageTop";
import { useTranslations } from "next-intl";
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaStar } from 'react-icons/fa';
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
                    let url = `https://tecnoburguer.onrender.com/api/stores/search?q=${query}&filter=${filter}`
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
    }, [ query, filter, o, r ]);

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
            <main>
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
                                                {storesOpen.map((store, index) => (
                                                    <Link href={`/store/${store.id}`} className={style.store} key={index}>
                                                        <div className={style.image}>
                                                            <Image src='/Images/icon-simplified.svg' width={60} height={60} alt='Image from store'/>
                                                        </div>
                                                        <div className={style.infos}>
                                                            <h2>{store.name}</h2>
                                                            <span>
                                                                {store.opening_hours?.status === 'open' ? <p className={style.status}>{t('Stores.open')}</p> : <p className={style.status}>{t('Stores.close')}</p>}
                                                                <p className={style.assessments}><FaStar className={store.average_rating !== 0.0 ? style.yes : style.no}/>{store.average_rating.toFixed(1)}</p>
                                                                <p>0.0 Km</p>
                                                            </span>
                                                            <span>
                                                                <p className={style.time}>00 - 00 min</p>
                                                                <p>R$ 0.0</p>
                                                            </span>
                                                        </div>
                                                    </Link>
                                                ))}
                                                {storesClose.map((store, index) => (
                                                <Link href={`/store/${store.id}`} className={style.storeClose} key={index}>
                                                        <div className={style.image}>
                                                            <Image src='/Images/icon-simplified.svg' width={60} height={60} alt='Image from store'/>
                                                        </div>
                                                        <div className={style.infos}>
                                                            <h2>{store.name}</h2>
                                                            <span>
                                                                {store.opening_hours?.status === 'open' ? <p className={style.status}>{t('Stores.open')}</p> : <p className={style.status}>{t('Stores.close')}</p>}
                                                                <p className={style.assessments}><FaStar className={store.average_rating !== 0.0 ? style.yes : style.no}/> {store.average_rating.toFixed(1)}</p>
                                                                <p>0.0 Km</p>
                                                            </span>
                                                            <span>
                                                                <p className={style.time}>00 - 00 min</p>
                                                                <p>R$ 0.0</p>
                                                            </span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                            : 
                                            <div className={style.items}>
                                                {storesOpen.map((store, index) => (
                                                    <div className={style.item} key={index}>
                                                        <Link href={`/store/${store.id}`} className={style.store}>
                                                            <div className={style.image}>
                                                                <Image src='/Images/icon-simplified.svg' width={45} height={45} alt='Image from store'/>
                                                            </div>
                                                            <div className={style.infos}>
                                                                <h2>{store.name}</h2>
                                                                <span>
                                                                    {store.opening_hours?.status === 'open' ? <p className={style.status}>{t('Stores.open')}</p> : <p className={style.status}>{t('Stores.close')}</p>}
                                                                    <p className={style.assessments}><FaStar className={store.average_rating !== 0.0 ? style.yes : style.no}/>{store.average_rating.toFixed(1)}</p>
                                                                    <p>0.0 Km</p>
                                                                </span>
                                                                <span>
                                                                    <p className={style.time}>00 - 00 min</p>
                                                                    <p>R$ 0.0</p>
                                                                </span>
                                                            </div>
                                                        </Link>
                                                        <div className={style.foods}>
                                                            {store.foods.map((food, index) => (
                                                                <Link href={`/store/${store.id}/item/${food.id}`} key={index} className={style.food}>
                                                                    <img src={food.image} width={140} height={140} alt='Image from store'/>
                                                                    <h3>{food.name}</h3>
                                                                    <p>R$ {food.value.replace('.', ',')}</p>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                                {storesClose.map((store, index) => (
                                                    <div className={style.itemClose} key={index}>
                                                        <Link href={`/store/${store.id}`} className={style.store}>
                                                            <div className={style.image}>
                                                                <Image src='/Images/icon-simplified.svg' width={45} height={45} alt='Image from store'/>
                                                            </div>
                                                            <div className={style.infos}>
                                                                <h2>{store.name}</h2>
                                                                <span>
                                                                    {store.opening_hours?.status === 'open' ? <p className={style.status}>{t('Stores.open')}</p> : <p className={style.status}>{t('Stores.close')}</p>}
                                                                    <p className={style.assessments}><FaStar className={store.average_rating !== 0.0 ? style.yes : style.no}/>{store.average_rating.toFixed(1)}</p>
                                                                    <p>0.0 Km</p>
                                                                </span>
                                                                <span>
                                                                    <p className={style.time}>00 - 00 min</p>
                                                                    <p>R$ 0.0</p>
                                                                </span>
                                                            </div>
                                                        </Link>
                                                        <div className={style.foods}>
                                                            {store.foods.map((food, index) => (
                                                                <Link href={`/store/${store.id}/item/${food.id}`} key={index} className={style.food}>
                                                                    <img src={food.image} width={140} height={140} alt='Image from store'/>
                                                                    <h3>{food.name}</h3>
                                                                    <p>R$ {food.value.replace('.', ',')}</p>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}