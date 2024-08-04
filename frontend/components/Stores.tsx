import { IoStorefrontSharp } from 'react-icons/io5';
import style from './styles/stores.module.scss';
import Link from 'next/link';

interface Store{
    name: string,
    locale: string
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
                <IoStorefrontSharp/>
                <div className={style.text}>
                    <p className={style.name}>{store.name}</p>
                    <p className={style.locale}>{store.locale}</p>
                </div>
            </Link>
        ))}
      </div>
    )
}