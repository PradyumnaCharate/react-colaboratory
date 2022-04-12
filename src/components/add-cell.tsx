import './add-cell.css';
import { useActions } from '../hooks/use-actions';

interface AddCellProps {
  previousCellId: string | null;
  //we have 0 opacity for add cell or text buttons it changes to 1 only if we hover over it
  //but if there are no cells it become strange empty page uuse may not know to hover over that buttons
  //so we are receiving thuis prop if there are no cells in notebook then we will change opacity to 1
  //and this is optional prop
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
  const { insertCellAfter } = useActions();

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, 'code')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellAfter(previousCellId, 'text')}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
