'use client'
import { IoSearch, IoStorefrontSharp } from 'react-icons/io5';
import style from './styles/stores.module.scss';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface OpeningHoursType {
    status: string;
    hours_open: string;
    day: string;
    hours_close: string;
}

interface Store {
    id: number;
    name: string;
    min_order: number;
    average_rating: number;
    opening_hours?: OpeningHoursType;
}

export default function Stores() {
    const [ stores, setStores ] = useState<Store[]>([]);
    const t = useTranslations('HomePage.Stores');
    const days : {[key : string] : string} = {
        monday: t('monday'),
        tuesday: t('tuesday'),
        wednesday: t('wednesday'),
        thursday: t('thursday'),
        friday: t('friday'),
        saturday: t('saturday'),
        sunday: t('sunday'),
        tomorrow: t('tomorrow'),
        today: t('today')
    };
    //const options{}

    useEffect(() => {
        const fetchData = async() => {
            try{
                const response = await fetch('http://localhost:8000/api/stores/open');
                if (response.ok) {
                    const stores = await response.json();
                    setStores(stores)
                } else {
                    console.error('Network response was not ok');
                    setStores([]);
                }
            }catch(error){
                console.error(error);
                setStores([]);
            }
        }
        fetchData();
    }, [])

    return (
        <div className={style.main}>
            <div className={style.filters}>
                <div className={style.input}>
                    <input type="text" name="search" id="search" placeholder={t('search')}/>
                    <button type='button'><IoSearch/></button>
                    {/*fazer a busca no banco de dados*/}
                </div>
                {/*filtros*/}
            </div>
            <div className={style.stores}>
                {stores.map((store, index) => (
                    <Link href={`/store/${store.id}`} className={style.store} key={index}>
                        <div className={style.top}>
                            <IoStorefrontSharp />
                            <p className={style.name}>{store.name}</p>
                        </div>
                        <div className={style.infos}>
                            <span>
                                <p className={style.assessments}><FaStar/>{store.average_rating.toFixed(1)}</p>
                                <p className={style.min}>{t('min')}: R$ {store.min_order}</p>
                            </span>
                            {store.opening_hours?.status === 'close week' && <p className={style.status}>{t('close.week')}</p>}
                            {store.opening_hours?.status === 'not hours' && <p className={style.status}>{t('nothours')}</p>}
                            {store.opening_hours?.status === 'close' && <p className={style.status}>{t('close.today')} {days[store.opening_hours.day]} {store.opening_hours.hours_open}</p>}
                            {store.opening_hours?.status === 'open' && <p className={style.status}>{t('open')} {store.opening_hours.hours_close}</p>}
                            {/*taxa de entrega && tempo de entrega*/}
                            <p className={style.delivery}>{t('delivery.unavaliable')}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}