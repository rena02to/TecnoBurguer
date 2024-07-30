import Image from 'next/image';
import style from './styles/main.module.scss';

export default function Main(){
    return(
        <div className={style.top}>
            <div className={style.image}></div>
            <div className={style.profileShop}>
                <div className={style.photo}>
                    <Image src='/Images/TecnoBurguer.svg' alt='TecnoBurguer' width={10} height={10}></Image>
                </div>
            </div>
        </div>
    )
}