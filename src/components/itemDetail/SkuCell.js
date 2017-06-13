import React, {Component} from 'react';

export default class ItemCell extends Component {
    render() : ?ReactElement {
        const {item} = this.props;
        const isActive = this.props.curId == item.sku_id;
        return (
            <li 
                className={item.left_count > 0 ? (isActive ? 'active' : '') : 'disable'}
                onClick={this.changeSKU}>
                {item.title}
            </li>
        );
    }

    changeSKU = () => {
        this.props.onChangeSKU(this.props.item);
    }
}