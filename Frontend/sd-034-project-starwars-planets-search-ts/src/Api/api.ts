export async function apiRequest() {
  const URL = 'https://swapi.dev/api/planets';
  const response = await fetch(URL);
  const data = await response.json();
  const filterData = data.results
    .map((element: any) => delete element.residents && element);
  return filterData;
}
