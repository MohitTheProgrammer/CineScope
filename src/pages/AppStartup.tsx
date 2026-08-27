import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { useUser } from "../context/UserContext";
import SplashScreen from "./SplashScreen";

interface AppStartupProps {
    children: ReactNode;
}

const AppStartup = ({ children }: AppStartupProps) => {
    const { loading } = useUser();

    const [splashFinished, setSplashFinished] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSplashFinished(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (loading || !splashFinished) {
        return <SplashScreen />;
    }

    return <>{children}</>;
};

export default AppStartup;