import './assets/css/reset.css';
import './assets/css/index.css';

import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from 'react-icons/io';
import TotalContext from './contexts/TotalContext';
import formatToBrl from './utils/formatCurrency';

function App() {
  const [coinsCount, setCoinsCount] = useState({
    '1': 0,
    '0.5': 0,
    '0.25': 0,
    '0.10': 0,
    '0.05': 0
  });

  function calculateTotal() {
    const values = Object.entries(coinsCount).map(([key, value]) => {
      return Number(key) * value;
    });

    return values.reduce((accumulator, current) => accumulator + current, 0);
  }

  const coinsTotal = formatToBrl(calculateTotal());

  return (
    <Container>
      <Title>Contador de Moedas</Title>
      <Total>Total: {coinsTotal}</Total>

      <CoinModifiersContainer>
        <TotalContext.Provider value={{ coinsCount, setCoinsCount }}>
          <CoinModifier coinValue={1} />
          <CoinModifier coinValue={0.5} />
          <CoinModifier coinValue={0.25} />
          <CoinModifier coinValue={0.10} />
          <CoinModifier coinValue={0.05} />
        </TotalContext.Provider>
      </CoinModifiersContainer>
    </Container>
  );
}

function CoinModifier({ coinValue }) {
  const { setCoinsCount } = useContext(TotalContext);

  const [value, setValue] = useState(0);

  useEffect(() => {
    setCoinsCount((prev) => ({ ...prev, [coinValue.toString()]: value }));
  }, [value]);

  function handleChange(event) {
    const { value: newValue } = event.target;

    if (isValidCount(newValue)) {
      setValue(value === '' ? 0 : newValue);
    }
  }

  function isValidCount(value) {
    return /^[0-9]+$/.test(value);
  }

  function incrementValue() {
    setValue(prev => ++prev);
  }

  function decrementValue() {
    setValue(prev => {
      if (prev > 0) {
        return --prev;
      }

      return prev;
    });
  }

  return (
    <CoinModifierContainer>
      <IoIosArrowDropupCircle color={'#5837D0'} size={25} onClick={incrementValue} />
      <input type="number" value={value} onChange={handleChange} />
      <IoIosArrowDropdownCircle color={'#5837D0'} size={25} onClick={decrementValue} />
      {formatToBrl(coinValue)}
    </CoinModifierContainer>
  );
}

const Container = styled.div`
  width: 100vw;
  /* color: #5837D0; */
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.6em;
  font-weight: bold;
  margin: 35px 0;
`;

const Total = styled.h2`
  font-size: 1.8em;
`;

const CoinModifiersContainer = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 30px;

  :not(input){
    cursor: pointer;
  }
`;

const CoinModifierContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  input {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    text-align: center;
  }
`;

export default App;
