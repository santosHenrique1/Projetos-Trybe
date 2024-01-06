// Remova os comentários a medida que for implementando as funções
const token = import.meta.env.VITE_TOKEN;

export async function searchCities(term) {
  const API_URL = await fetch(`http://api.weatherapi.com/v1/search.json?lang=pt&key=${token}&q=${term}`);
  const data = await API_URL.json();
  if (data.length === 0) {
    return window.alert('Nenhuma cidade encontrada');
  }
  return data;
}

export async function getWeatherByCity(cityURL) {
  const API_URL = await fetch(`http://api.weatherapi.com/v1/current.json?lang=pt&key=${token}&q=${cityURL}`);
  const data = await API_URL.json();

  return {
    name: data.location.name,
    temp: data.current.temp_c,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
    country: data.location.country,
    url: cityURL,
  };
}
