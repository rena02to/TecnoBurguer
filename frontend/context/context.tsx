'use client'
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface ContextProviderProps{
    children: ReactNode;
}

interface ContextType{
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    type: string;
    setType: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ( { children } : ContextProviderProps ) => {
    const [ name, setName ] = useState('');
    const [ type, setType ] = useState('');

    useEffect(() => {
        const fetchData = async() => {
            const token = Cookies.get('token');
            if(token){
                try{
                    const response = await fetch('https://tecnoburguer.onrender.com/api/user/get_user_from_token',{
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    })
                    if(response.ok){
                        const data = await response.json();
                        setName(data.name);
                        setType(data.type);
                    }
                }catch(error){
                    console.log(error);
                }
            }
        }
        fetchData();
    }, [])

    return(
        <Context.Provider value={{ name, setName, type, setType }}>
            {children}
        </Context.Provider>
    );
}

export const useContexts = () : ContextType => {
    const context = useContext(Context);
    if(!context){
        throw new Error("useMyContext deve ser usado dentro de um ContextProvider");
    }
    return context;
}

export default Context;