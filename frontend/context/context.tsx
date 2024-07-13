import React, { createContext, ReactNode, useContext, useState } from "react";

interface ContextProviderProps{
    children: ReactNode;
}

interface ContextType{
    variable: string;
    setVariable: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ContextType | undefined>(undefined);

export const ContextProvider = ( { children } : ContextProviderProps ) => {
    const [ variable, setVariable ] = useState('estado-inicial');

    return(
        <Context.Provider value={{ variable, setVariable }}>
            { children }
        </Context.Provider>
    )
}

export const useContexts = () : ContextType => {
    const context = useContext(Context);
    if(!context){
        throw new Error("useMyContext deve ser usado dentro de um ContextProvider");
    }
    return context;
};

export default Context;