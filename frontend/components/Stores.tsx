import { IoStorefrontSharp } from 'react-icons/io5';
import style from './styles/stores.module.scss';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa6';

interface Store{
    name: string,
    locale: string,
    min_order: number
}

async function getStoresOpen(){
    const response = await fetch('http://localhost:8000/api/stores/open');
    if(response.ok){
        const stores = await response.json();
        return stores;
    }else{
        console.error('Network response was not ok');
    }
}

export default async function Main(){
    const stores : Store[] = await getStoresOpen();
    return (
      <div className={style.main}>
        {stores.map((store, index) => (
            <Link href='##' className={style.store} key={index}>
                <div className={style.top}>
                    <IoStorefrontSharp/>
                    <p className={style.name}>{store.name}</p>
                </div>
                <div className={style.infos}>
                    <span>
                        <p className={style.assessments}><FaStar/>4.2</p>
                        <p className={style.min}>Mín.: R$ {store.min_order}</p>
                    </span>
                    <p className={style.status}>Aberta agora - Fecha 23h</p>
                    <p className={style.locale}>{store.locale}</p>
                </div>
            </Link>
        ))}
      </div>
    )
}