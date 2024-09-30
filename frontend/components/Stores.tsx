import style from './styles/stores.module.scss';
import Filters from './Filters';
import { IoStorefrontSharp } from 'react-icons/io5';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';
import Image from 'next/image';
import { useContexts } from '@/context/context';
import { getUserLocale } from '@/services/locale';
import { getLocale } from 'next-intl/server';

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

async function getTranslations( locale: string ){
    const messages = (await import(`../messages/${locale}.json`)).default;
    return messages['HomePage']?.['Stores'];
}

export default async function Stores(){
    let stores = [];
    try{
        const response = await fetch('https://tecnoburguer.onrender.com/api/stores/');
        stores = await response.json();
    }catch{
        stores = [];
    }
    const language = await getUserLocale();
    const t = await getTranslations(language);
    
    const days : {[key : string] : string} = {
        monday: t['monday'],
        tuesday: t['tuesday'],
        wednesday: t['wednesday'],
        thursday: t['thursday'],
        friday: t['friday'],
        saturday: t['saturday'],
        sunday: t['sunday'],
        tomorrow: t['tomorrow'],
        today: t['today']
    };

    return (
        <div className={style.main}>
            <Filters filters={false}/>
            <div className={style.stores}>
                {stores.length === 0 ? (
                    <div className={style.noresults}>
                        <p className={style.title}>{t['closed']}</p>
                        <Image src='/Images/close.png' width={300} height={300} alt='All stores close'/>
                    </div>
                ) : (
                    stores.map((store: Store) => (
                        <Link href={`/store/${store.id}`} className={style.store} key={store.id}>
                            <div className={style.top}>
                                <p className={style.name}><IoStorefrontSharp />{store.name}</p>
                            </div>
                            <div className={style.infos}>
                                <span>
                                    <p className={style.assessments}><FaStar className={store.average_rating !== 0.0 ? style.yes : style.no}/>{store.average_rating.toFixed(1)}</p>
                                    <p className={style.min}>{t['min']}: R$ {store.min_order}</p>
                                </span>
                                {store.opening_hours?.status === 'close week' && <p className={style.status}>{t['close.week']}</p>}
                                {store.opening_hours?.status === 'not hours' && <p className={style.status}>{t['nothours']}</p>}
                                {store.opening_hours?.status === 'close' && <p className={style.status}>{t['close.today']} {days[store.opening_hours.day]} {store.opening_hours.hours_open}</p>}
                                {store.opening_hours?.status === 'open' && <p className={style.status}>{t['open']} {store.opening_hours.hours_close}</p>}
                                <p className={style.delivery}><MdDeliveryDining/>00-00 min | R$0.0</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}