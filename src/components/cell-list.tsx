import { useTypedSelector } from '../hooks/use-typed-selector';
import { CellListItem } from './cell-list-item';

export const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const rederedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{rederedCells}</div>;
};
