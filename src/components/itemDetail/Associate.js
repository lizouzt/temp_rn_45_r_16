import React, {Component} from 'react';

const generateItem = (item, num) => {
	return (
		<a 
			key={"ida_i" + num}
			className="ida_i"
			href={item.link}>

			<div className="idai_w c_pic">
				<img src={item.img}/>
			</div>
			<div className="idai_r">
				<div className="r_title">{item.title}</div>
				<div className="r_ctrl">
					<div>
						<i className="c_i i_user"></i>
						<span>{item.user_nick}</span>
					</div>
					<div>
						<i className="c_i i_comment"></i>
						<span>{item.com_count}</span>
					</div>
				</div>
			</div>
		</a>
	)
}

export default class Associate extends Component {
	render() {
		const {assList} = this.props;
		const assItems	= assList.map(generateItem);

		return (
			<div className="id_ass">
				<div className="ida_nav"><span>装备测评</span></div>
				{assItems}
			</div>
		);
	}
}