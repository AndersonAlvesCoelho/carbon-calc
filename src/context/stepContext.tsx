"use client";

// IMPORTS
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface TransportCo2Props {
  checkbox1: boolean;
  checkbox2: boolean;
  checkbox3: boolean;
  busKm: number;
  carKm: number;
  efficiencyKm: number;
}

interface ElectricityCo2Props {
  biomass: boolean;
  biomassInput?: string;
  coal: boolean;
  coalInput?: string;
  fuelOil: boolean;
  fuelOilInput?: string;
  general: boolean;
  generalInput?: string;
  heatingCooling: boolean;
  heatingCoolingInput?: string;
  naturalGas: boolean;
  naturalGasInput?: string;
  nuclear: boolean;
  nuclearInput?: string;
  renewable: boolean;
  renewableInput?: string;
}

interface EatingHabitsProps {
  checkbox1: boolean;
  checkbox2: boolean;
  meat: number;
  vegetables: number;
}

export interface DataFormsProps {
  transportCo2?: TransportCo2Props;
  electricityCo2?: ElectricityCo2Props;
  eatingHabitsCo2?: EatingHabitsProps;
}

interface StepContextProps {
  breadcrumbs: number;
  errorFormAnimation: boolean;
  dataForm: DataFormsProps;

  setDataForm: (value: DataFormsProps) => void;
  setBreadcrumbs: (value: number) => void;
  setErrorFormAnimation: (value: boolean) => void;
}

const StepContext = createContext<StepContextProps>({
  breadcrumbs: 0,
  errorFormAnimation: false,
  dataForm: {},

  setDataForm: () => {},
  setBreadcrumbs: () => {},
  setErrorFormAnimation: () => {},
});

interface Props {
  children: ReactNode;
}

function StepContextProvider({ children }: Props) {
  const [dataForm, setDataForm] = useState<DataFormsProps>({});

  const [breadcrumbs, setBreadcrumbs] = useState<number>(0);
  const [errorFormAnimation, setErrorFormAnimation] = useState<boolean>(false);

  useEffect(() => {
    if (errorFormAnimation) {
      setTimeout(() => {
        setErrorFormAnimation(false);
      }, 1000);
    }
  }, [errorFormAnimation]);

  return (
    <StepContext.Provider
      value={{
        breadcrumbs,
        errorFormAnimation,
        dataForm,

        setDataForm,
        setErrorFormAnimation,
        setBreadcrumbs,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

const useStepContext = () => useContext(StepContext);

export { StepContextProvider, useStepContext };
