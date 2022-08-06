import { memo } from "react";


const CreateSelects = memo(({ currency, onCurrencyChange, currencies }) => {
	return (
		<select className="form-control" id="exampleFormControlSelect1"
			value={currency} onChange={e => onCurrencyChange(e.target.value)} >
			{currencies.map((currency, index) => (
				<option key={index} value={currency}>{currency}</option>
			))}
		</select>
	);
});

export { CreateSelects };