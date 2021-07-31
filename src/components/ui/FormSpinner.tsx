import {FulfillingBouncingCircleSpinner} from 'react-epic-spinners';
import {colors} from '../../constants/colors';

function FormSpinner() {
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
        <FulfillingBouncingCircleSpinner color={colors.green[1]} />
      </div>
    </div>
  );
}

export default FormSpinner;