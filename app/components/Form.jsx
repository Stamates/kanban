import React from 'react';

export default class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false,
			qty: '',
			prod_name: '',
			price: ''
		};
	}

	render() {
		return this.renderForm();
	}


	renderForm = () => {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
	 				<input type="text" placeholder="Qty" value={this.state.qty} onChange={this.qtyEdit} />
	 				<input type="text" placeholder="Product" value={this.state.prod_name} onChange={this.nameEdit} />
	 				<input type="text" placeholder="Price" value={this.state.price} onChange={this.priceEdit} />
	 				<input type="submit" value="Add" />
	 			</form>
 			</div>
		);
	};

	qtyEdit = (e) => {
		this.setState({qty: e.target.value});
	};

	nameEdit = (e) => {
		this.setState({prod_name: e.target.value});
	};

	priceEdit = (e) => {
		this.setState({price: e.target.value});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		var qty = this.state.qty;
		var name = this.state.prod_name;
		var price = this.state.price;
		if (!name || !price || !qty) {
		  return;
		}
		this.props.addProduct(qty, name, price);
		this.setState({qty: '', prod_name: '', price: ''});
	};
}
