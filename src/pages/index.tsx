import { Bubblegum_Sans } from "next/font/google";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
	LoopIcon
} from "@radix-ui/react-icons"
import { countries } from "@/lib/countries"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const bubblegum_sans = Bubblegum_Sans({
	weight: "400",
	subsets: ["latin"]
});


export async function getServerSideProps() {
	const conversion_table = { ...(await getData()), "USD": 1 }
	return {
		props: {
			conversion_table
		}
	}
};

async function getData() {


	let data = { "AUD": 0, "BGN": 0, "BRL": 0, "CAD": 0, "CHF": 0, "CNY": 0, "CZK": 0, "DKK": 0, "EUR": 0, "GBP": 0, "HKD": 0, "HUF": 0, "IDR": 0, "ILS": 0, "INR": 0, "ISK": 0, "JPY": 0, "KRW": 0, "MXN": 0, "MYR": 0, "NOK": 0, "NZD": 0, "PHP": 0, "PLN": 0, "RON": 0, "SEK": 0, "SGD": 0, "THB": 0, "TRY": 0, "ZAR": 0 };
	data = (await (await fetch("https://api.frankfurter.app/latest?base=usd", { next: { revalidate: Number.POSITIVE_INFINITY } })).json()).rates;
	return data;
}


const Home: React.FC<{ conversion_table: any }> = ({ conversion_table }) => {
	let [fromCurrency, setFromCurrency] = useState("INR");
	let [fromValue, setFromValue] = useState(1.0);
	let [toCurrency, setToCurrency] = useState("USD");
	let [toValue, setToValue] = useState(1 / conversion_table["INR"] * conversion_table["USD"]);

	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Set the logo as visible after a delay (you can adjust the delay as needed)
		const timeoutId = setTimeout(() => {
			setIsVisible(true);
		}, 500);

		// Clear the timeout on component unmount
		return () => clearTimeout(timeoutId);
	}, []);


	return <>

		<div className="  flex flex-col   w-screen h-screen items-center   justify-center  p-4  gray-block diagonal-end">
			<div className=" gray-block__inner ">
				<div className={`logo-container ${isVisible ? 'slide-in' : ''}`}>
					<span className={cn(" text-5xl p-1   ", bubblegum_sans.className)} > Currency Converter</span>
				</div>
				<div className="  p-10 rounded-lg shadow-md  border-2 border-zinc-50  flex flex-col items-start    ">
					<div className="  flex flex-row  item-center   ">
						<div className="  flex flex-row items-end      ">
							<div className="  flex flex-col  gap-4    ">
								<div>
									<Input
										type=" text"
										value={fromValue == 0 ? "" : fromValue.toString()}
										className="  border-2 border-slate-200 rounded-lg p-2 "
										onChange={(e) => {
											// debugger;
											const regex = new RegExp('[0-9.]*', 'm');
											const whitespace = new RegExp('/^ *$/mg', 'gm');
											if (whitespace.exec(e.target.value) !== null || e.target.value == "") {
												console.log("`` in 'from' value");
												setFromValue(0);
												setToValue(0);
											}
											else if (regex.exec(e.target.value) !== null) {
												const from = e.target.value;
												setFromValue(parseFloat(parseFloat(from).toFixed(2)));
												const to_value = parseFloat((parseFloat(from)
													/ conversion_table[fromCurrency] * conversion_table[toCurrency]).toFixed(2));
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
										}} />
								</div>
								<div className="  w-full  ">
									<Select onValueChange={(x) => {
										setFromCurrency(x);
										setToValue(parseFloat((fromValue / conversion_table[x] * conversion_table[toCurrency]).toFixed(2)));
									}}
										value={fromCurrency}
									>
										<SelectTrigger className="   p-1 bg-zinc-100  border-2 border-zinc-200 rounded-lg   ">
											<SelectValue placeholder=" Currency" />
										</SelectTrigger>
										<SelectContent className="  bg-white h-40 w-full ">
											{
												Object.entries(countries).map(([code, name], _idx) =>
													<SelectItem key={code} value={code}>{code}
														<span className="hidden lg:contents "> - {name}
														</span></SelectItem>
												)}
										</SelectContent >
									</Select>
								</div>

							</div>
							<div className="  pl-4 pr-4  ">
								<button onClick={() => {
									setToCurrency(fromCurrency);
									setFromCurrency(toCurrency);
									setToValue(parseFloat(fromValue.toFixed(2)));
									setFromValue(parseFloat(toValue.toFixed(2)));
									// __AUTO_GENERATED_PRINTF_START__
									console.log("Home#(anon) 1"); // __AUTO_GENERATED_PRINTF_END__

								}}>
									<LoopIcon />
								</button>
							</div>
							<div className="  flex flex-col  gap-4    ">
								<div>
									<Input
										type=" text"
										value={toValue == 0 ? "" : toValue.toFixed(2).toString()}
										className="  border-2 border-slate-200 rounded-lg p-2 "
										onChange={(e) => {
											if (!e.target.value.match(/^[0-9]*([.,][0-9]+)?$/)) {
												// setFromValue(parseFloat(e.target.value));
												// setToValue(fromValue / conversion_table.rates[fromCurrency] * conversion_table.rates[toCurrency]);
											}
											else {
												console.log("NaN in 'to' value");
											}
										}} />
								</div>
								<div className="  w-full  ">
									<Select onValueChange={(x) => {
										setToCurrency(x);
										setToValue(fromValue / conversion_table[fromCurrency] * conversion_table[x]);
									}}
										value={toCurrency}
										autoComplete="true"
									>
										<SelectTrigger className="  w-full p-1 bg-zinc-100  border-2 border-zinc-200 rounded-lg   ">
											<SelectValue placeholder=" Currency" className=" items-end" />
										</SelectTrigger>
										<SelectContent className="  bg-white h-40 w-full rounded-lg   ">
											{
												Object.entries(countries).map(([code, name]) =>
													<SelectItem key={code} value={code}>
														{code}
														<span className="hidden lg:contents "> {name}</span> </SelectItem>
												)}
										</SelectContent>
									</Select>
								</div>
							</div>

						</div>
					</div>
					<span className=" text-gray-500  text-sm  pt-4 " >
						1 {fromCurrency} ≈ {(conversion_table[toCurrency] / conversion_table[fromCurrency]).toFixed(2).toString()} {toCurrency}
					</span>
				</div>
			</div >
		</div >
	</>;
}
export default Home
