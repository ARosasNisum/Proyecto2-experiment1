import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import axios from "axios";

interface AuthContextType {
    isAuthenticated: boolean
    username: string | null
    login: (username: string, password: string) => Promise<boolean>
    logout: () => void
}

interface IProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: IProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const storeAuth = localStorage.getItem('isAuthenticated')
        return storeAuth == 'true'
    })
    const [username, setUsername] = useState<string | null>(() => {
        return localStorage.getItem('username')
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', String(isAuthenticated));
        localStorage.setItem('username', username || '');
    }, [isAuthenticated, username]);

    const login = async (username: string, password: string): Promise<boolean> => {
        // Simple authentication logic for demonstration
        const response = await axios.post('http://localhost:8080/login?username=' + username + '&password=' + password, {})

        if ( response.status === 200 ) {
            setIsAuthenticated(true)
            setUsername(username)
            return true
        }

        setIsAuthenticated(false)
        setUsername('')

        return false
    };

    const logout = () => {
        setIsAuthenticated(false)
        setUsername(null)
        localStorage.clear()
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, username, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
};