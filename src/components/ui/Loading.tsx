import {
  FulfillingBouncingCircleSpinner,
  SelfBuildingSquareSpinner
} from 'react-epic-spinners';
import {colors} from '../../constants';
import {T_loading} from '../../types';

function Loading({type}: {type: T_loading}) {
  return(
    <div style={{
      position: 'absolute',
      left: '50%',
    }}>
      <div style={{
        position: 'relative',
        left: '-50%',
        marginTop: '50%',
        zIndex: 100
      }}>
        {type === 'form' 
          ? <FulfillingBouncingCircleSpinner color={colors.green[1]} />
          : <SelfBuildingSquareSpinner color={colors.purple[1]} />
        }
      </div>
    </div>
  );
}

export default Loading;