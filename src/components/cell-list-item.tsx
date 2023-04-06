import { Cell } from '../state';

interface CellListItemProps {
  cell: Cell;
}
export const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return <div>{cell.id}</div>;
};
