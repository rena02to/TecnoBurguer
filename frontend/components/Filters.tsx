import style from './styles/filters.module.scss';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoClose, IoLocationOutline, IoSearch } from 'react-icons/io5';
import { useTranslations } from 'next-intl';
import { FaArrowDownWideShort, FaStarHalfStroke } from 'react-icons/fa6';
import { LuAlarmClock, LuArrowUpDown } from 'react-icons/lu';
import { MdAttachMoney, MdDeliveryDining } from 'react-icons/md';

interface Props{
    value: string,
    filters: boolean;
}

export default function Filters( {value, filters} : Props){
    const [ distance, setDistance ] = useState('20');
    const [searchValue, setSearchValue] = useState(value);
    const t = useTranslations('Filters');
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);
    const [ menuFilters, setMenuFilters ] = useState(false);
    const [ order, setOrder ] = useState('default');
    const [ rate, setRate ] = useState('');
    const [ filtersActived, setFiltersActived ] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && menuFilters){
                setMenuFilters(false);
                setDistance('20');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuFilters])

    const handleSearch = () => {
        const searchInput = document.getElementById('search') as HTMLInputElement;
        if(searchInput.value){
            router.push(`/search?q=${searchInput.value}`);
        }else{
            router.push('/');
        }
    }

    const handleKeyDown = ( event : KeyboardEvent<HTMLInputElement> ) => {
        if(event.key === 'Enter'){
            handleSearch();
        }
    }

    const handleFilter = () => {
        setMenuFilters(false);
        if(distance !== '20' || order !== 'default' || rate !== ''){
            setFiltersActived(true);
        }else{
            setFiltersActived(false);
        }
    }

    return(
        <>
            <div className={style.filters}>
                <div className={style.input}>
                    <input type="text" name="search" id="search" placeholder={t('search')} onKeyDown={(event) => handleKeyDown(event)} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    <button type='button' onClick={handleSearch}><IoSearch/></button>
                </div>
                {filters ?
                    <button type='button' className={filtersActived ? style.filterActived : style.filter} onClick={() => {setMenuFilters(!menuFilters)}}>
                        <p>Filtros</p>
                        <FaArrowDownWideShort/>
                    </button>
                    : null
                }
            </div>
            {menuFilters ?
                <div className={style.menuFilter}>
                    <div className={style.menu} ref={menuRef}>
                        <button type="button" className={style.close} onClick={() => {setMenuFilters(!menuFilters); setDistance('20');}}><IoClose/></button>
                        <h1 className={style.title}>Filtros</h1>
                        <div className={style.order}>
                            <h2 className={style.legend}>Ordenar por:</h2>
                            <div className={style.ordersButtons}>
                                <button type="button" className={order === 'default' ? style.selected : style.notSelected} onClick={() => {setOrder('default')}}>
                                    <LuArrowUpDown/>
                                    <p>Padrão</p>
                                </button>
                                <button type="button" className={order === 'value' ? style.selected : style.notSelected} onClick={() => {setOrder('value')}}>
                                    <MdAttachMoney/>
                                    <p>Preço</p>
                                </button>
                                <button type="button" className={order === 'assessment' ? style.selected : style.notSelected} onClick={() => {setOrder('assessment')}}>
                                    <FaStarHalfStroke/>
                                    <p>Avaliação</p>
                                </button>
                                <button type="button" className={order === 'time' ? style.selected : style.notSelected} onClick={() => {setOrder('time')}}>
                                    <LuAlarmClock/>
                                    <p>Tempo de entrega</p>
                                </button>
                                <button type="button" className={order === 'rate' ? style.selected : style.notSelected} onClick={() => {setOrder('rate')}}>
                                    <MdDeliveryDining/>
                                    <p>Taxa de entrega</p>
                                </button>
                                <button type="button" className={order === 'distance' ? style.selected : style.notSelected} onClick={() => {setOrder('distance')}}>
                                    <IoLocationOutline/>
                                    <p>Distância</p>
                                </button>
                            </div>
                        </div>

                        <div className={style.distance}>
                            <h2 className={style.legend}>Distância</h2>
                            <p>menos de {distance} km</p>
                            <span><p>1 km</p><p>20 km</p></span>
                            <input type="range" id="distance" defaultValue={20} min={1} max={20} step={1} value={distance} onChange={(event) => {setDistance(event.target.value)}}/>
                        </div>

                        <div className={style.rate}>
                            <h2 className={style.legend}>Taxa de entrega</h2>
                            <div className={style.rateButtons}>
                                <button type="button" className={rate === 'free' ? style.selected : style.notSelected} onClick={() => {setRate('free')}}>
                                    Grátis
                                </button>
                                <button type="button" className={rate === '5' ? style.selected : style.notSelected} onClick={() => {setRate('5')}}>
                                    Até R$5,00
                                </button>
                                <button type="button" className={rate === '10' ? style.selected : style.notSelected} onClick={() => {setRate('10')}}>
                                    Até R$10,00
                                </button>
                            </div>
                        </div>

                        <div className={style.buttons}>
                            <button type="button" className={style.clear} disabled={rate === '' && order === 'default' && distance === '20'} onClick={() => {setRate(''); setOrder('default'); setDistance('20')}}>
                                Limpar
                            </button>
                            <button type="button" className={style.filter} onClick={() => handleFilter()}>
                                Filtrar
                            </button>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}