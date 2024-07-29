import style from './styles/infos.module.scss';

export default function Infos(){
    return(
        <div className={style.top}>
            <div className={style.infos}>
                <button type='button' className={style.user}>
                    <p>Bem vindo, Fulano</p>
                    <p>Rua x, travessa y, maceio, al</p>
                    <p>Entrega: R$15 - 40min a 50min</p>
                </button>
                <button type='button' className={style.shop}>
                    <p>TecnoBurguer - Aeroporto</p>
                    <p>Aberto agora - Fecha 23:00h</p>
                    <p>Rua z, travessa m, maceio, al</p>
                </button>
            </div>
            <div className={style.search}>
                <input type="text" name="search" id="search"/>
            </div>
            <div className={style.class}>
                <p>Scroll lateral com as classes de lanches</p>
            </div>
        </div>
    )
}