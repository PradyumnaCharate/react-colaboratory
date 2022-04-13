import { Fragment } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list-item';
import AddCell from './add-cell';
import { Cell } from '../redux';

const CellList: React.FC = () => {
  //redux selectors are getters for redux state.selectors encapsulate structure of state and are reuusable.
//selectors ca also compute derived properties
//so selector is function that accepts redux state as an argument and returns data that is derived from 
//that state
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id:string) => data[id])
  );

  const renderedCells = cells.map((cell:Cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-list'>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
