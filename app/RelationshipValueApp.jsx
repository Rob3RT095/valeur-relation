import { useState } from "react";

export default function RelationshipValueApp() {
  const [inputs, setInputs] = useState({
    T_disc: 0,
    C_total: 0,
    E_emo: 0,
    E_phys: 0,
    P_sex: 0,
    I_plaisir: 0,
    S_emotion: 0,
    Qualite_temps: 0,
  });
  const [result, setResult] = useState(null);

  const alpha = { T_disc: 1, C_total: 0.1, E_emo: 3, E_phys: 2 };
  const beta = { P_sex: 2, I_plaisir: 2, S_emotion: 1.5, Qualite_temps: 2 };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) });
  };

  const calculateVI = () => {
    const I =
      inputs.T_disc * alpha.T_disc +
      inputs.C_total * alpha.C_total +
      inputs.E_emo * alpha.E_emo +
      inputs.E_phys * alpha.E_phys;

    const R =
      inputs.P_sex * beta.P_sex +
      inputs.I_plaisir * beta.I_plaisir +
      inputs.S_emotion * beta.S_emotion +
      inputs.Qualite_temps * beta.Qualite_temps;

    const VI = (R / I) * 100;
    setResult(VI.toFixed(2));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 grid gap-6">
      <h1 className="text-2xl font-bold text-center">Valeur Intrinsèque d'une Relation</h1>
      <div className="bg-white shadow rounded p-4 space-y-4">
        <h2 className="text-xl font-semibold">Investissements</h2>
        {Object.keys(alpha).map((key) => (
          <div key={key}>
            <label className="block font-medium mb-1" htmlFor={key}>{key}</label>
            <input
              className="w-full border rounded px-2 py-1"
              id={key}
              name={key}
              type="number"
              step="0.1"
              value={inputs[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        <h2 className="text-xl font-semibold mt-4">Retours</h2>
        {Object.keys(beta).map((key) => (
          <div key={key}>
            <label className="block font-medium mb-1" htmlFor={key}>{key}</label>
            <input
              className="w-full border rounded px-2 py-1"
              id={key}
              name={key}
              type="number"
              step="0.1"
              value={inputs[key]}
              onChange={handleChange}
            />
          </div>
        ))}

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={calculateVI}
        >
          Calculer la Valeur
        </button>
        {result && (
          <div className="mt-4 text-lg text-center">
            Valeur Intrinsèque : <strong>{result}%</strong>
          </div>
        )}
      </div>
    </div>
  );
}
