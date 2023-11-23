"use client"

// IMPORTS
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';


interface StepContextProps {
  breadcrumbs: number;
  errorFormAnimation: boolean

  setBreadcrumbs: (value: number) => void;
  setErrorFormAnimation: (value: boolean) => void
}

const StepContext = createContext<StepContextProps>({
  breadcrumbs: 2,
  errorFormAnimation: false,

  setBreadcrumbs: () => { },
  setErrorFormAnimation: () => { },
});

interface Props {
  children: ReactNode;
}

function StepContextProvider({ children }: Props) {
  const [breadcrumbs, setBreadcrumbs] = useState<number>(2);
  const [errorFormAnimation, setErrorFormAnimation] = useState<boolean>(false)


  useEffect(() => {
    if (errorFormAnimation) {
      setTimeout(() => {
        setErrorFormAnimation(false)
      }, 1000);
    }
  }, [errorFormAnimation])

  return (
    <StepContext.Provider
      value={{
        breadcrumbs,
        errorFormAnimation,

        setErrorFormAnimation,
        setBreadcrumbs,
      }}>
      {children}
    </StepContext.Provider>
  );
}

const useStepContext = () => useContext(StepContext);

export { StepContextProvider, useStepContext };