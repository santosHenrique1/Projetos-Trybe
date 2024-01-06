import { useContext } from 'react';
import {
  TableStyle,
  TableHeader,
  TableRow,
  TableCell,
} from './styledTable';
import { th } from '../services/th';
import ApiDataContext from '../context/apiDataContext';

function FilterTable() {
  const { apiData } = useContext(ApiDataContext);
  return (
    <TableStyle>
      <thead>
        <TableRow>
          {th.map((element: any, index: any) => (
            <TableHeader key={ index }>{element}</TableHeader>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {apiData.length !== 0
          && apiData.map((element: any, index: any) => (
            <TableRow key={ index }>
              <TableCell data-testid="planet-name">{element.name}</TableCell>
              <TableCell>{element.rotation_period}</TableCell>
              <TableCell>{element.orbital_period}</TableCell>
              <TableCell>{element.diameter}</TableCell>
              <TableCell>{element.climate}</TableCell>
              <TableCell>{element.gravity}</TableCell>
              <TableCell>{element.terrain}</TableCell>
              <TableCell>{element.surface_water}</TableCell>
              <TableCell>{element.population}</TableCell>
              <TableCell>{element.films}</TableCell>
              <TableCell>{element.created}</TableCell>
              <TableCell>{element.edited}</TableCell>
              <TableCell>{element.url}</TableCell>
            </TableRow>
          ))}
      </tbody>
    </TableStyle>
  );
}
export default FilterTable;
