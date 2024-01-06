import { useContext, useState } from 'react';
import {
  CenteredInputContainer,
  TextInput,
  StyledButton,
  StyledSelect,
  StyledOption,
  StyledLabel,
} from './styledTable';
import { GlobalStyle } from './globalStyled';
import { optionsColumns, optionsThan } from '../services/th';
import ApiDataContext from '../context/apiDataContext';
import FilterTable from './FilterTable';

function Table() {
  const { apiData, setApiData, apiDataBackup } = useContext(ApiDataContext);
  const [planetName, setPlanetName] = useState('');
  const [operation, setOperation] = useState('maior que');
  const [inputNumber, setInputNumber] = useState('0');
  const [filterArray, setFilterArray] = useState<any[]>([]);
  const [optionsColumnsState, setOptionColumnsState] = useState(optionsColumns);
  const [columns, setColumns] = useState(optionsColumnsState[0]);
  const [radioButton, setRadioButton] = useState({
    column: 'population', sort: 'ASC',
  });
  function handleFilterClick(
    newColumns: string,
    newOperation:string,
    newInputNumber:string,
  ) {
    const someArray = filterArray.some((element:any) => element.columns === newColumns);
    if (someArray) {
      const mapColumns = filterArray.map((element:any) => {
        if (element.columns === newColumns) {
          return { columns: newColumns,
            operation: newOperation,
            inputNumber: newInputNumber };
        }
        return element;
      });
      setFilterArray(mapColumns);
    } else {
      setFilterArray([
        ...filterArray,
        { columns: newColumns, operation: newOperation, inputNumber: newInputNumber },
      ]);
      const filterOpitionColumns = optionsColumnsState
        .filter((element:any) => element !== newColumns);
      setOptionColumnsState(filterOpitionColumns);
      setColumns(filterOpitionColumns[0]);
    }
    const resultFilter = apiData.filter((planet: any) => {
      if (newOperation === 'maior que') {
        return Number(planet[newColumns]) > Number(newInputNumber);
      } if (newOperation === 'menor que') {
        return Number(planet[newColumns]) < Number(newInputNumber);
      }
      return Number(planet[newColumns]) === Number(newInputNumber);
    });
    setApiData(resultFilter);
  }
  function handleRemoveFilter(deleteColumns:string) {
    const filterDelete = filterArray
      .filter((element) => element.columns !== deleteColumns);
    setFilterArray(filterDelete);
    if (filterDelete.length === 0) {
      setApiData(apiDataBackup);
    } else {
      filterDelete.forEach((filter) => {
        const resultFilter = apiDataBackup.filter((planet) => {
          if (filter.operation === 'maior que') {
            return Number(planet[filter.columns]) > Number(filter.inputNumber);
          } if (filter.operation === 'menor que') {
            return Number(planet[filter.columns]) < Number(filter.inputNumber);
          }
          return Number(planet[filter.columns]) === Number(filter.inputNumber);
        });
        setApiData(resultFilter);
        setOptionColumnsState([deleteColumns, ...optionsColumnsState]);
        setColumns(optionsColumns[0]);
      });
    }
  }
  function handleChangeName(e: any) {
    setPlanetName(e.target.value);
    if (e.target.value !== '') {
      const filterPlanetName = apiData
        .filter((element:any) => element.name.toLowerCase().includes(e.target.value));
      setApiData(filterPlanetName);
    } else {
      setApiData(apiDataBackup);
    }
  }
  function handleRemoveAllFilter() {
    setFilterArray([]);
    setApiData(apiDataBackup);
    setOptionColumnsState(optionsColumns);
  }
  function handleTargetSelect(e:any) {
    setRadioButton({ ...radioButton, column: e.target.value });
  }
  function handleTargetRadioButton(e:any) {
    setRadioButton({ ...radioButton, sort: e.target.value });
  }
  function handleClickSort() {
    const sortedArrayPlanet = apiData.sort((a: any, b: any) => {
      if (radioButton.sort === 'ASC') {
        if (a[radioButton.column] === 'unknown') {
          return 1;
        }
        if (b[radioButton.column] === 'unknown') {
          return -1;
        }
        return a[radioButton.column] - b[radioButton.column];
      }
      if (a[radioButton.column] === 'unknown') {
        return 1;
      }
      if (b[radioButton.column] === 'unknown') {
        return -1;
      }
      return b[radioButton.column] - a[radioButton.column];
    });
    setApiData([...sortedArrayPlanet]);
  }
  return (
    <div>
      <GlobalStyle />
      <CenteredInputContainer>
        <TextInput
          data-testid="name-filter"
          type="text"
          placeholder="Digite aqui..."
          value={ planetName }
          onChange={ (e) => handleChangeName(e) }
        />
      </CenteredInputContainer>
      <div>
        <StyledLabel htmlFor="">
          Colunas
          <StyledSelect
            data-testid="column-filter"
            value={ columns }
            onChange={ (event) => setColumns(event.target.value) }
          >
            {optionsColumnsState.map((element, index) => (
              <StyledOption key={ index }>{element}</StyledOption>
            ))}
          </StyledSelect>
        </StyledLabel>
        <StyledLabel>
          Operador
          <StyledSelect
            data-testid="comparison-filter"
            value={ operation }
            onChange={ (event) => setOperation(event.target.value) }
          >
            {optionsThan.map((element, index) => {
              return (
                <StyledOption key={ index }>{element}</StyledOption>
              );
            })}
          </StyledSelect>
        </StyledLabel>
        <TextInput
          data-testid="value-filter"
          type="number"
          value={ inputNumber }
          onChange={ (event) => setInputNumber(event.target.value) }
        />
        <StyledButton
          type="button"
          data-testid="button-filter"
          onClick={ () => handleFilterClick(columns, operation, inputNumber) }
        >
          Filtrar
        </StyledButton>
        {filterArray.map((element) => (
          <p data-testid="filter" key={ element.columns }>
            { `${element.columns} 
          ${element.operation} 
          ${element.inputNumber}`}
            <StyledButton
              onClick={ () => handleRemoveFilter(element.columns) }
            >
              X
            </StyledButton>
          </p>
        ))}
        <StyledLabel>
          Ordenar
          <StyledSelect
            data-testid="column-sort"
            onChange={ (e) => handleTargetSelect(e) }
            value={ radioButton.column }
          >
            {optionsColumns.map((element, index) => (
              <StyledOption key={ index }>{element}</StyledOption>
            ))}
          </StyledSelect>
        </StyledLabel>
        <StyledButton
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleClickSort() }
        >
          Ordenar
        </StyledButton>
        <StyledLabel>
          Ascendente
          <input
            type="radio"
            data-testid="column-sort-input-asc"
            value="ASC"
            name="radio"
            onChange={ (e) => handleTargetRadioButton(e) }
          />
        </StyledLabel>
        <StyledLabel>
          Descendente
          <input
            type="radio"
            data-testid="column-sort-input-desc"
            value="DESC"
            name="radio"
            onChange={ (e) => handleTargetRadioButton(e) }
          />
        </StyledLabel>
        <StyledButton
          data-testid="button-remove-filters"
          onClick={ () => handleRemoveAllFilter() }
        >
          Remover todas filtragens
        </StyledButton>
      </div>
      <FilterTable />
    </div>
  );
}
export default Table;
