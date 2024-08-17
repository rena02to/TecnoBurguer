'use client';
import style from './../styles/search.module.scss';
import Filters from "@/components/Filters";
import ImageTop from "@/components/ImageTop";
import { useTranslations } from "next-intl";
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

interface Store{
    id: number;
    name: string;
    min_order: number;
    average_rating: number;
    is_open_now: boolean;
    foods: Food[];
}

export default function Search(){
    const t = useTranslations('Search');
    const [ loading, setLoading ] = useState(true);
    const searchParams = useSearchParams();
    const [ storesOpen, setStoresOpen ] = useState<Store[]>([]);
    const [ storesClose, setStoresClose ] = useState<Store[]>([]);
    const query = searchParams.get('q') || '';

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            setStoresOpen([]);
            setStoresClose([]);
            try{
                const response = await fetch(`https://tecnoburguer.onrender.com/api/stores/search?q=${query}`);
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
                setStoresClose([])
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [ query ]);

    return(
        <div className={style.search}>
            <ImageTop/>
            <Filters value={query} filters={true}/>
            <div className={style.resultsContainer}>
                {loading ? <p className={style.load}>{t('load')}<RiLoader2Line/></p> : (storesOpen.length <= 0 && storesClose.length <= 0 ? <p className={style.notresults}>{t('notresults')}</p> : null )}
                <div className={style.results}>
                    {storesOpen.length > 0 ? <h1 className={style.legend}>{t('legends.open')}</h1> : null}
                    {storesOpen.map((store) => (
                        <div key={store.id} className={style.result}>
                            <Link href={`/store/${store.id}`} className={style.store}>
                                <div className={style.image}></div>
                                <div className={style.infos}>
                                    <p className={style.name}>{store.name}</p>
                                    <span>
                                        {store.is_open_now ? <p className={style.open}>{t('Stores.open')}</p> : <p className={style.close}>{t('Stores.close')}</p>}
                                        <p className={style.assessments}><FaStar className={store.average_rating !== 0.0 ? style.yes : style.no}/>{store.average_rating !== 0 ? store.average_rating.toFixed(1) : '-'}</p>
                                        <p className={style.min}><MdAttachMoney/>R$ {store.min_order}</p>
                                        <span className={style.delivery}><MdDeliveryDining/><p>-</p></span>
                                    </span>
                                    {/*taxa de entrega && tempo de entrega*/}
                                </div>
                            </Link>
                            
                            {store.foods.length > 0 &&
                                <div className={style.foods}>
                                    {store.foods.map((food) => (
                                        <Link href={`/store/${store.id}/food/${food.id}`} className={style.food} key={food.id}>
                                            <img height={125} width={125} src={food.image} alt={food.name}/>
                                            <div className={style.infos}>
                                                <p className={style.name}>{food.name}</p>
                                                <p className={style.value}>R$ {parseFloat(food.value).toFixed(2).replace('.', ',')}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            }
                        </div>
                    ))}
                    
                    {storesOpen.length > 0 && storesClose.length > 0? <span className={style.line}></span> : null}
                    {storesClose.length > 0? <h1 className={style.legend}>{t('legends.closed')}</h1> : null}
                    {storesClose.map((store) => (
                        <div key={store.id} className={style.result}>
                            <Link href={`/store/${store.id}`} className={style.storeClosed}>
                                <div className={style.image}></div>
                                <div className={style.infos}>
                                    <p className={style.name}>{store.name}</p>
                                    <span>
                                        {store.is_open_now ? <p className={style.open}>{t('Stores.open')}</p> : <p className={style.close}>{t('Stores.close')}</p>}
                                        <p className={style.assessments}><FaStar className={store.average_rating !== 0.0 ? style.yes : style.no}/>{store.average_rating !== 0 ? store.average_rating.toFixed(1) : '-'}</p>
                                        <p className={style.min}><MdAttachMoney/>R$ {store.min_order}</p>
                                        <span className={style.delivery}><MdDeliveryDining/><p>-</p></span>
                                    </span>
                                    {/*taxa de entrega && tempo de entrega*/}
                                </div>
                            </Link>

                            {store.foods.length > 0 &&
                                <div className={style.foods}>
                                    {store.foods.map((food) => (
                                        <Link href={`/store/${store.id}/food/${food.id}`} className={style.foodClose} key={food.id}>
                                            <img height={125} width={125} src={food.image} alt={food.name}/>
                                            <div className={style.infos}>
                                                <p className={style.name}>{food.name}</p>
                                                <p className={style.value}>R$ {parseFloat(food.value).toFixed(2).replace('.', ',')}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}