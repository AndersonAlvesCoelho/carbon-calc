"use client";

import Button from "@/components/Button";
import { useStepContext } from "@/context/stepContext";

export default function StartStep() {
  const { setBreadcrumbs } = useStepContext();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Transporte: 🚗</h2>
      <p className="text-gray-800 text-base">
        Registre a distância média semanal percorrida em seu carro, indicando a
        eficiência do combustível (em km/litro) e o tipo de combustível
        utilizado. Para transporte público (ônibus/metrô), anote a distância e o
        número de viagens por semana. Se utiliza bicicleta ou caminha, estime a
        distância média percorrida semanalmente.
      </p>
      <h2 className="text-xl font-bold">Consumo de Energia: ⚡</h2>
      <p className="text-gray-800 text-base">
        Verifique suas contas de eletricidade para anotar o consumo médio mensal
        em kWh. Identifique a fonte de energia elétrica em sua região (renovável
        ou não renovável). Se houver consumo para aquecimento ou resfriamento,
        registre essa informação.
      </p>

      <h2 className="text-xl font-bold">Hábitos Alimentares: 🍛</h2>
      <p className="text-gray-800 text-base">
        Anote a quantidade média de carne consumida por semana (em gramas) e a
        quantidade média de vegetais consumida por semana (em gramas).
        <br />
        Esses passos simples permitirão a coleta de dados necessários para
        calcular sua pegada de carbono em cada categoria.
      </p>
      <Button label="Começar" type="submit" onClick={() => setBreadcrumbs(1)} />
    </div>
  );
}
