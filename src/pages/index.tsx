import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

import { countries } from "@/lib/countries"
import { useState } from "react";


export async function getServerSideProps() {
	const conversion_table = { ...(await getData()), "USD": 1 }
	return {
		props: {
			conversion_table
		}
	}
};

async function getData() {
	let data = await (await fetch("https://api.frankfurter.app/latest?base=usd", { next: { revalidate: 3600 } })).json();
	return data.rates
}

const Home: React.FC<{ conversion_table: any }> = ({ conversion_table }) => {
	let [fromCurrency, setFromCurrency] = useState("INR");
	let [fromValue, setFromValue] = useState(1.0);
	let [toCurrency, setToCurrency] = useState("USD");
	let [toValue, setToValue] = useState(1 / conversion_table["INR"] * conversion_table["USD"]);

	return (
		<>
			<div className=" flex flex-row w-full item-center justify-center p-3">
				<div className=" flex flex-row items-end  p-2  " >
					<div className="flex flex-col">
						{/* <div className=" p-4 border-slate-200  border-2 rounded-lg "> */}
						<div>
							<Input
								type="text"
								value={fromValue == 0 ? "" : fromValue.toString()}
								className=" border-2 border-slate-200 rounded-lg p-2 "
								onChange={
									(e) => {
										// debugger;
										const regex = new RegExp('[0-9.]*', 'm')
										const whitespace = new RegExp('/^ *$/mg', 'gm')
										if (whitespace.exec(e.target.value) !== null || e.target.value == "") {
											console.log("`` in 'from' value");
											setFromValue(0)
											setToValue(0)
										}
										else if (regex.exec(e.target.value) !== null) {
											const from = e.target.value;
											setFromValue(parseFloat(from));
											const to_value = parseFloat(from) / conversion_table[fromCurrency] * conversion_table[toCurrency];
											if (to_value.toString() != "NaN") {
												setToValue(to_value);
											}
											else {
												setToValue(0);
											}
										}
										else {
											console.log("NaN in 'from' value");
										}
										// debugger;
									}
								} />
						</div>
						<Select onValueChange={(x ) => {
							setFromCurrency(x);
							setToValue(fromValue / conversion_table[x] * conversion_table[toCurrency]);
						}}
							value={fromCurrency}
						>
							<SelectTrigger className=" w-full">
								<SelectValue placeholder="Currency" />
							</SelectTrigger>
							<SelectContent className=" bg-white h-40 w-full">
								{countries.map((x) =>
									<SelectItem value={x}
										className=" w-full ">{x}</SelectItem>
								)}
							</SelectContent>
						</Select>

					</div>
					<div className=" p-2 ">
						<button onClick={() => {
							setToCurrency(fromCurrency);
							setFromCurrency(toCurrency);
						}}>Switch</button>
					</div>
					<div className="flex flex-col">
						<div className="">
							<Input
								type="text"
								value={toValue == 0 ? "" : toValue.toString()}
								className=" border-2 border-slate-200 rounded-lg p-2 "
								onChange={
									(e) => {
										if (!e.target.value.match(/^[0-9]*([.,][0-9]+)?$/)) {
											// setFromValue(parseFloat(e.target.value));
											// setToValue(fromValue / conversion_table.rates[fromCurrency] * conversion_table.rates[toCurrency]);
										}
										else {
											console.log("NaN in 'to' value");
										}
									}
								} />
						</div>
						<Select onValueChange={(x) => {
							setToCurrency(x);
							setToValue(fromValue / conversion_table[fromCurrency] * conversion_table[x]);
						}}
							value={toCurrency}
						>
							<SelectTrigger className=" w-full p-2  bg-zinc-200 ">
								<SelectValue placeholder="Currency" />
							</SelectTrigger>
							<SelectContent className=" bg-white h-40 w-full" >
								{countries.map((x) =>
									<SelectItem value={x}
										className="  ">{x}</SelectItem>
								)}
							</SelectContent>
						</Select>
					</div>

				</div>
			</div>
		</>
	);
}
export default Home;
