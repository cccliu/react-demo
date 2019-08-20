// 映射redux中的数据
import {connect} from 'react-redux';

const mapStateToProps = (states, ownProps) => {
  const o = {};
    if (states) {
        for (let index in states) {
            for (let key in states[index]) {
              o[key] = states[index][key]
            }
        }
        return {
          store: o
        }
    }
};
export {
  connect,
  mapStateToProps
}