const CreateInputs = ({ amount, onAmountChange }) => {
	return (
		<div className="col">
			<input id="input" type="number" className="form-control"
				onChange={e => onAmountChange(e.target.value)} value={amount} />
		</div>
	);
}

export { CreateInputs }

