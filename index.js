const express = require("express");
const app = express();
const SplitCalculation = require("./services/split");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/split-payments/compute", (req, res) => {
	console.log(req.body);
	const { ID, Amount, SplitInfo } = req.body;
	var flatResult = SplitCalculation.flat(Amount, SplitInfo);
	var percentageResult = SplitCalculation.percentage(
		flatResult.balance,
		SplitInfo
	);
	var ratioResult = SplitCalculation.ratio(
		percentageResult.balance,
		SplitInfo
	);

	res.status(200).json({
		ID,
		Balance: ratioResult.balance,
		SplitBreakdown: [
			...flatResult.breakdown,
			...percentageResult.breakdown,
			...ratioResult.breakdown,
		],
	});
});

app.listen(process.env.PORT || 5000, () => {
	console.log("Server started on port 5000");
});