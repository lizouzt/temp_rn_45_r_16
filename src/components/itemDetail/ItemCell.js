import React, {Component} from 'react';

export default class ItemCell extends Component {
	state = {
		id: this.props.item.goods_id || '',
		name: this.props.item.name || '',
	}

    render() : ?ReactElement {
    	const {item} = this.props;
    	const isActive = this.props.curId == item.goods_id
        return (
            <li 
				className={isActive ? 'active' : ''}
				onClick={this.tryToChangeItem}>
				{item.name}
			</li>
        );
    }

    tryToChangeItem = () => {
    	this.props.onTryToChangeItem(this.state.id, this.state.name);
    	// this.setState({isActive: true});
    }
}