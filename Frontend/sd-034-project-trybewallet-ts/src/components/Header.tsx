import { useSelector } from 'react-redux';

function Header() {
  const email = useSelector((state: any) => state.user.email);
  const walletExpenses = useSelector((state: any) => state.wallet.expenses);
  console.log(walletExpenses);

  function soma() {
    if (walletExpenses.length > 0) {
      const walletValue = walletExpenses.map((element:any) => {
        const convertion = Number(element.exchangeRates[element.currency].ask);
        const valor = Number(element.value);
        const multiply = convertion * valor;
        return multiply;
      });
      console.log(walletValue);
      return walletValue
        .reduce((acumulador:number, atual:number) => acumulador + atual, 0).toFixed(2);
    }

    return (0).toFixed(2);
  }
  return (
    <header>
      <p data-testid="email-field">{email}</p>
      <p data-testid="total-field">{soma()}</p>
      <p data-testid="header-currency-field">BRL</p>
    </header>
  );
}

export default Header;
