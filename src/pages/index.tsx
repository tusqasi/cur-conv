import { Bubblegum_Sans } from "next/font/google";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LoopIcon } from "@radix-ui/react-icons";
import { countries } from "@/lib/countries";
import { JSX, SVGProps, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Head from "next/head";

const bubblegum_sans = Bubblegum_Sans({
	weight: "400",
	subsets: ["latin"],
});

export async function getServerSideProps() {
	const conversion_table = { ...(await getData()), USD: 1 };
	return {
		props: {
			conversion_table,
		},
	};
}

async function getData() {
	let data = {
		AUD: 0,
		BGN: 0,
		BRL: 0,
		CAD: 0,
		CHF: 0,
		CNY: 0,
		CZK: 0,
		DKK: 0,
		EUR: 0,
		GBP: 0,
		HKD: 0,
		HUF: 0,
		IDR: 0,
		ILS: 0,
		INR: 0,
		ISK: 0,
		JPY: 0,
		KRW: 0,
		MXN: 0,
		MYR: 0,
		NOK: 0,
		NZD: 0,
		PHP: 0,
		PLN: 0,
		RON: 0,
		SEK: 0,
		SGD: 0,
		THB: 0,
		TRY: 0,
		ZAR: 0,
	};
	data = (
		await (
			await fetch("https://api.frankfurter.app/latest?base=usd", {
				next: { revalidate: Number.POSITIVE_INFINITY },
			})
		).json()
	).rates;
	return data;
}
function GithubIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
			<path d="M9 18c-4.51 2-5-2-7-2" />
		</svg>
	);
}

function LinkedinIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
			<rect width="4" height="12" x="2" y="9" />
			<circle cx="4" cy="4" r="2" />
		</svg>
	);
}

function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
		</svg>
	);
}

const Home: React.FC<{ conversion_table: any }> = ({ conversion_table }) => {
	let [fromCurrency, setFromCurrency] = useState("INR");
	let [fromValue, setFromValue] = useState(1.0);
	let [toCurrency, setToCurrency] = useState("USD");
	let [toValue, setToValue] = useState(
		(1 / conversion_table["INR"]) * conversion_table["USD"]
	);

	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Set the logo as visible after a delay (you can adjust the delay as needed)
		const timeoutId = setTimeout(() => {
			setIsVisible(true);
		}, 500);

		// Clear the timeout on component unmount
		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<>
			<Head>
				<meta property="og:title" content="moneyconvert" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://moneyconvert.vercel.app" />
				<meta property="og:image" content="https://i.imgur.com/vuJxCal.png" />
			</Head>
			<div className=" h-[100svh]  lg:w-screen lg:h-screen  flex flex-col justify-center items-center ">
				<div className="  flex flex-col w-full h-full  items-center   justify-center  p-4  bg-white ">
					<div
						className={`logo-container ${isVisible ? "slide-in" : ""
							}   transition-transform scale-100 hover:scale-110   `}
					>
						<span className={cn(" text-5xl p-1   ", bubblegum_sans.className)}>
							{" "}
							Currency Converter
						</span>
					</div>
					<div className="  p-10 rounded-lg shadow-md  border-2  border-slate-100  flex flex-col items-start   bg-white ">
						<div className="  flex flex-row  item-center   ">
							<div className="  flex flex-row items-end      ">
								<div className="  flex flex-col  gap-4  w-32  lg:w-60 ">
									<div>
										<Input
											type=" text"
											value={fromValue == 0 ? "" : fromValue.toString()}
											className="  border border-slate-200 rounded-lg p-2  text-lg font-bold "
											onChange={(e) => {
												// debugger;
												const regex = new RegExp("[0-9.]*", "m");
												const whitespace = new RegExp("/^ *$/mg", "gm");
												if (
													whitespace.exec(e.target.value) !== null ||
													e.target.value == ""
												) {
													console.log("`` in 'from' value");
													setFromValue(0);
													setToValue(0);
												} else if (regex.exec(e.target.value) !== null) {
													const from = e.target.value;
													setFromValue(parseFloat(parseFloat(from).toFixed(2)));
													const to_value = parseFloat(
														(
															(parseFloat(from) /
																conversion_table[fromCurrency]) *
															conversion_table[toCurrency]
														).toFixed(2)
													);
													if (to_value.toString() != "NaN") {
														setToValue(to_value);
													} else {
														setToValue(0);
													}
												} else {
													console.log("NaN in 'from' value");
												}
												// debugger;
											}}
										/>
									</div>
									<div className="  w-full  ">
										<Select
											onValueChange={(x) => {
												setFromCurrency(x);
												setToValue(
													parseFloat(
														(
															(fromValue / conversion_table[x]) *
															conversion_table[toCurrency]
														).toFixed(2)
													)
												);
											}}
											value={fromCurrency}
										>
											<SelectTrigger className="   p-1 bg-zinc-100  border border-zinc-200 rounded-lg   ">
												<SelectValue placeholder=" Currency" />
											</SelectTrigger>
											<SelectContent className="  bg-white h-40 w-full ">
												{Object.entries(countries).map(([code, name], _idx) => (
													<SelectItem key={code} value={code}>
														{code}
														<span className="hidden lg:contents ">
															{" "}
															— {name}
														</span>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="  pl-4 pr-4  ">
									<button
										onClick={() => {
											setToCurrency(fromCurrency);
											setFromCurrency(toCurrency);
											setToValue(parseFloat(fromValue.toFixed(2)));
											setFromValue(parseFloat(toValue.toFixed(2)));
											// __AUTO_GENERATED_PRINTF_START__
											console.log("Home#(anon) 1"); // __AUTO_GENERATED_PRINTF_END__
										}}
									>
										<LoopIcon />
									</button>
								</div>
								<div className="  flex flex-col  gap-4 w-32  lg:w-60  ">
									<div>
										<Input
											type=" text"
											value={toValue == 0 ? "" : toValue.toFixed(2).toString()}
											className="  border border-slate-200 rounded-lg p-2 text-lg font-bold "
											onChange={(e) => {
												if (!e.target.value.match(/^[0-9]*([.,][0-9]+)?$/)) {
													// setFromValue(parseFloat(e.target.value));
													// setToValue(fromValue / conversion_table.rates[fromCurrency] * conversion_table.rates[toCurrency]);
												} else {
													console.log("NaN in 'to' value");
												}
											}}
										/>
									</div>
									<div className="  w-full  ">
										<Select
											onValueChange={(x) => {
												setToCurrency(x);
												setToValue(
													(fromValue / conversion_table[fromCurrency]) *
													conversion_table[x]
												);
											}}
											value={toCurrency}
											autoComplete="true"
										>
											<SelectTrigger className="  w-full p-1 bg-zinc-100  border border-zinc-200 rounded-lg   ">
												<SelectValue
													placeholder=" Currency"
													className=" items-end"
												/>
											</SelectTrigger>
											<SelectContent className="  bg-white h-40 w-full rounded-lg   ">
												{Object.entries(countries).map(([code, name]) => (
													<SelectItem key={code} value={code}>
														{code}
														<span className="hidden lg:contents ">
															{" "}
															— {name}
														</span>{" "}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						</div>
						<span className=" text-gray-500  text-sm  pt-4 font-mono ">
							1 {fromCurrency} ≈{" "}
							{(conversion_table[toCurrency] / conversion_table[fromCurrency])
								.toFixed(2)
								.toString()}{" "}
							{toCurrency}
						</span>
					</div>
				</div>
				<footer className="mt-auto py-4 gap-8 flex justify-evenly w-max pb-5 ">
					<Link
						aria-label="Twitter"
						href="https://twitter.com/tusharkuntawar"
						target="_blank"
						className=" transition-transform  scale-100 hover:scale-11  "
					>
						<div className="bg-black rounded-full text-slate-300 p-3">
							<TwitterIcon className="w-4 h-4" />
						</div>
					</Link>
					<Link
						aria-label="LinkedIn"
						href="https://www.linkedin.com/in/tushar-kuntawar-9a7b8923b/"
						target="_blank"
						className=" transition-transform  scale-100 hover:scale-110  "
					>
						<div className="bg-black rounded-full text-slate-300 p-3">
							<LinkedinIcon className="w-4 h-4" />
						</div>
					</Link>
					<Link
						aria-label="GitHub"
						href="https://github.com/tusqasi/cur-conv"
						target="_blank"
						className=" transition-transform  scale-100 hover:scale-110  "
					>
						<div className="bg-black rounded-full text-slate-300 p-3">
							<GithubIcon className="w-4 h-4" />
						</div>
					</Link>
				</footer>
			</div>
		</>
	);
};
export default Home;
