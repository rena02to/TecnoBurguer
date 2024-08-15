import style from './styles/filters.module.scss';
import { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoSearch } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

interface Props{
    value: string,
}

export default function Filters( {value} : Props){
    const [searchValue, setSearchValue] = useState(value);
    const t = useTranslations('Filters');
    const router = useRouter();
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

    return(
        <div className={style.filters}>
            <div className={style.input}>
                <input type="text" name="search" id="search" placeholder={t('search')} onKeyDown={(event) => handleKeyDown(event)} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                <button type='button' onClick={handleSearch}><IoSearch/></button>
            </div>
            {/*filtros*/}
        </div>
    )
}