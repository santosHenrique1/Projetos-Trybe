import styled from 'styled-components';

export const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
`;

export const TableHeader = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

export const CenteredInputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:10px
`;

export const TextInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;
export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #f2f2f2;
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
export const StyledSelect = styled.select`
padding: 10px;
border: 1px solid #ccc;
border-radius: 4px;
`;
export const StyledOption = styled.option`
background-color: #f9f9f9;
color: #333;
`;
export const StyledLabel = styled.label`
font-weight: bold;
margin-bottom: 10px;
`;
