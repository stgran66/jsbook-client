import './cell-list.css';
import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { CellListItem } from './cell-list-item';
import { AddCell } from './add-cell';

export const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const rederedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} prevCellId={null} />
      {rederedCells}
    </div>
  );
};
