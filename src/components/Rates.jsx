/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from "react";

const CreacteRates = memo(() => {
	const [courses, setCourses] = useState({ USD: 0, EUR: 0 });


	const getCourses = async () => {
		try {
			const response = await fetch(
				"https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json"
			);
			const data = await response.json();
			const USD = data.find(item => item.cc === "USD");
			const EUR = data.find(item => item.cc === "EUR");
			setCourses({ USD: USD.rate, EUR: EUR.rate });
		} catch (err) {
			alert(err);
		}
	}

	useEffect(() => {
		getCourses();
	}, []);

	return (
		<div className="courses">
			<div className="course-item card card-body">
				<div className="course-item-title">USD</div>
				<div className="course-item-value" data-value="USD">{courses.USD}</div>
			</div>
			<div className="course-item card card-body">
				<div className="course-item-title">EUR</div>
				<div className="course-item-value" data-value="EUR">{courses.EUR}</div>
			</div>
		</div>
	);
})

export { CreacteRates };