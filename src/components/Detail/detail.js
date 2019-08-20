import React, {Component} from 'react';
import {connect, mapStateToProps} from '../../store/mapstate';

class DetailComponent extends Component {
	constructor(props){
		super(props);
		this.state = {}
	}
	render () {
	   return (
	   	  <div>
	   	     <h1>{this.props.store.count}</h1>
	   	  </div>
	   	)
	}
}

export default connect(mapStateToProps, null)(DetailComponent);