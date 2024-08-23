import style from './styles/filters.module.scss';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { IoClose, IoLocationOutline, IoSearch } from 'react-icons/io5';
import { useTranslations } from 'next-intl';
import { FaArrowDownWideShort, FaStarHalfStroke } from 'react-icons/fa6';
import { LuAlarmClock, LuArrowUpDown } from 'react-icons/lu';
import { MdAttachMoney, MdDeliveryDining } from 'react-icons/md';
import { useSearchParams } from 'next/navigation';

interface Props{
    filters: boolean;
}

export default function Filters( {filters} : Props){
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState('');
    const t = useTranslations('Filters');
    const menuRef = useRef<HTMLDivElement>(null);
    const [ menuFilters, setMenuFilters ] = useState(false);
    const [ order, setOrder ] = useState('default');
    const [ rate, setRate ] = useState('');
    const [ filtersActived, setFiltersActived ] = useState(false);
    const q = searchParams.get('q') || '';
    const o = searchParams.get('order') || 'default';
    const r = searchParams.get('rate') || '';

    useEffect(() => {
        setSearchValue(q);
        setOrder(o);
        setRate(r);
        if(o !== 'default' || r){
            setFiltersActived(true);
        }
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && menuFilters){
                setMenuFilters(false);
                setOrder('default');
                setRate('');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuFilters, q])

    const handleSearch = () => {
        //pegar os valores de order e rate pela url
        const searchInput = document.getElementById('search') as HTMLInputElement;
        let url = `/search?q=${searchInput.value}&filter=stores`;
        setMenuFilters(false);
        
        if(searchInput.value){
            if(order !== 'default'){
                url += `&order=${order}`;
            }
            if(rate !== ''){
                url += `&rate=${rate}`;
            }
            window.location.href = url;
        }else{
            setFiltersActived(false);
            setRate('');
            setOrder('default');
            window.location.href = '/';
        }
    }

    const handleKeyDown = ( event : KeyboardEvent<HTMLInputElement> ) => {
        if(event.key === 'Enter'){
            handleSearch();
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
                        <p>{t('title')}</p>
                        <FaArrowDownWideShort/>
                    </button>
                    : null
                }
            </div>
            {menuFilters ?
                <div className={style.menuFilter}>
                    <div className={style.menu} ref={menuRef}>
                        <button type="button" className={style.close} onClick={() => {setMenuFilters(!menuFilters)}}><IoClose/></button>
                        <h1 className={style.title}>{t('title')}</h1>
                        <div className={style.order}>
                            <h2 className={style.legend}>{t('sort.title')}</h2>
                            <div className={style.ordersButtons}>
                                <button type="button" className={order === 'default' ? style.selected : style.notSelected} onClick={() => {setOrder('default')}}>
                                    <LuArrowUpDown/>
                                    <p>{t('sort.default')}</p>
                                </button>
                                <button type="button" className={order === 'value' ? style.selected : style.notSelected} onClick={() => {setOrder('value')}}>
                                    <MdAttachMoney/>
                                    <p>{t('sort.price')}</p>
                                </button>
                                <button type="button" className={order === 'assessment' ? style.selected : style.notSelected} onClick={() => {setOrder('assessment')}}>
                                    <FaStarHalfStroke/>
                                    <p>{t('sort.assessments')}</p>
                                </button>
                                <button type="button" className={order === 'time' ? style.selected : style.notSelected} onClick={() => {setOrder('time')}}>
                                    <LuAlarmClock/>
                                    <p>{t('sort.time')}</p>
                                </button>
                                <button type="button" className={order === 'rate' ? style.selected : style.notSelected} onClick={() => {setOrder('rate')}}>
                                    <MdDeliveryDining/>
                                    <p>{t('sort.rate')}</p>
                                </button>
                                <button type="button" className={order === 'distance' ? style.selected : style.notSelected} onClick={() => {setOrder('distance')}}>
                                    <IoLocationOutline/>
                                    <p>{t('sort.distance')}</p>
                                </button>
                            </div>
                        </div>

                        <div className={style.rate}>
                            <h2 className={style.legend}>{t('rate.title')}</h2>
                            <div className={style.rateButtons}>
                                <button type="button" className={rate === 'free' ? style.selected : style.notSelected} onClick={() => {setRate('free')}}>
                                    {t('rate.free')}
                                </button>
                                <button type="button" className={rate === '5' ? style.selected : style.notSelected} onClick={() => {setRate('5')}}>
                                    {t('rate.until')} R$5,00
                                </button>
                                <button type="button" className={rate === '10' ? style.selected : style.notSelected} onClick={() => {setRate('10')}}>
                                    {t('rate.until')} R$10,00
                                </button>
                            </div>
                        </div>

                        <div className={style.buttons}>
                            <button type="button" className={style.clear} disabled={rate === '' && order === 'default'} onClick={() => {setRate(''); setOrder('default')}}>
                                {t('buttons.clear')}
                            </button>
                            <button type="button" className={style.filter} onClick={() => handleSearch()}>
                                {t('buttons.filter')}
                            </button>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}