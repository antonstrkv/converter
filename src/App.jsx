/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { CreacteRates } from "./components/Rates";
import { CreateInputs } from "./components/Inputs";
import { CreateSelects } from "./components/Selects";


function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('UAH');
  const [currency2, setCurrency2] = useState('USD');
  const [rates, setRates] = useState([]);

  const getRates = async () => {
    try {
      const data = await fetch(
        'https://api.apilayer.com/fixer/latest?base=UAH&apikey=lYjik8c7qGfWghIPqmJynSxwtx7FRbNt'
      );
      const response = await data.json();
      setRates(response.rates);
      console.log(response);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    getRates();
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [rates]);


  const format = (number) => {
    return number.toFixed(4);
  }

  const handleAmount1Change = (amount1) => {
    setAmount2(format(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  const handleCurrency1Change = (currency1) => {
    setAmount1(format(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  const handleAmount2Change = (amount2) => {
    setAmount1(format(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  const handleCurrency2Change = (currency2) => {
    setAmount2(format(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <div className="container pt-5 pb-5">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="card p-3">
            <form>
              <h1 className="h2 mb-4">Currency converter</h1>

              <CreacteRates />

              <div className="row mb-1">
                <div className="col">
                  <label htmlFor="name">Give:</label>

                  <CreateSelects onCurrencyChange={handleCurrency1Change}
                    currencies={Object.keys(rates)}
                    currency={currency1} />

                </div>
                <div className="col">
                  <label htmlFor="name">Get:</label>

                  <CreateSelects onCurrencyChange={handleCurrency2Change}
                    currencies={Object.keys(rates)}
                    currency={currency2} />

                </div>
              </div>
              <div className="row">

                <CreateInputs onAmountChange={handleAmount1Change} amount={amount1} />

                <CreateInputs onAmountChange={handleAmount2Change} amount={amount2} />

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
