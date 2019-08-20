import React, {Component} from 'react';
import {connect, mapStateToProps} from '../../store/mapstate';

class IndexCompontent extends Component {
    constructor (props) {
	   	super(props)
	   	this.state = {};

	   	this.goDetail = this.goDetail.bind(this);
    }
    goDetail () {
      this.props.dispatch({type:'CHANGE_USERNAME'});
      this.props.history.push('/Detail');
    }
    render () {
   	  return (
   	  	  <div>
   	  	      <button onClick={this.goDetail}>index_GO..</button>
   	  	  </div>
   	  	)
    }
}
export default connect(mapStateToProps, null)(IndexCompontent);