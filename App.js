import React from "react";
import Box from "@mui/material/Box";
import Cell from "./Cell";

class App extends React.Component {
	state = { cellList: [], numOptions: null, idTotal: null };

	win = (list) => {
		//return winner option
		const winningBoards = [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
			[1, 5, 9],
			[3, 5, 7],
		];
		for (const combo of winningBoards) {
			const cellOne = list[combo[0] - 1];
			const cellTwo = list[combo[1] - 1];
			const cellThree = list[combo[2] - 1];
			if (
				typeof cellOne === "object" &&
				typeof cellTwo === "object" &&
				typeof cellThree === "object"
			) {
				const player = cellOne.option;
				if (
					cellOne.option === cellTwo.option &&
					cellTwo.option === cellThree.option
				) {
					return player + " wins!";
				}
			}
		}
		return "no winner";
	};

	determinePlayed = (list) => {
		if (list.length < 9) {
			return false;
		} else {
			for (const item of list) {
				if (typeof item === "number") {
					return false;
				}
			}
			return true;
		}
	};

	addInts = (list) => {
		const newList = [];
		for (const cell of list) {
			const index = list.indexOf(cell);
			if (index > 0) {
				const prevCell = list[index - 1];
				const differenceInId = cell.id - prevCell.id;
				if (differenceInId > 1) {
					for (let i = prevCell.id + 1; i < cell.id; i++) {
						newList.push(i);
					}
				}
			}
			newList.push(cell);
		}
		if (newList.length < 9) {
			if (newList[0].id !== 1) {
				const firstCell = newList[0].id;
				for (let i = firstCell - 1; i > 0; i--) {
					newList.unshift(i);
				}
			}
			if (newList[newList.length - 1].id !== 9) {
				const lastCell = newList[newList.length - 1].id;
				for (let i = lastCell + 1; i <= 9; i++) {
					newList.push(i);
				}
			}
		}
		return newList;
	};

	foundItem = (list, item) => {
		for (let i = 0; i < list.length; i++) {
			if (list[i].id === item.id) {
				return i;
			}
		}
		return -1;
	};

	useInfo = (cellData) => {
		//if this.state.cellList.length > 0
		//take away all ints
		if (this.state.cellList.length > 0) {
			const deletedList = this.state.cellList.filter((item) => {
				return typeof item !== "number";
			});
			this.setState({ cellList: [...deletedList] });
		}
		//finds index of the cell who's option is getting switched
		//If a cell isn't getting it's item switched itll return -1
		const index = this.foundItem(this.state.cellList, cellData);
		//takes out old item
		const replacedCellList = this.state.cellList.filter((item) => {
			return item.id !== cellData.id;
		});
		//replaces old cellList with a list that has taken out cell who's option is getting switched
		if (index >= 0) {
			this.setState({ cellList: [...replacedCellList] });
		}
		//inputs new item
		this.setState({ cellList: [...this.state.cellList, cellData] });
		//sorts list by id in increasing order
		const sortedList = this.state.cellList.sort((a, b) => {
			return a.id - b.id;
		});
		//add ints in empty slots here
		const fullList = this.addInts(sortedList);
		this.setState({ cellList: [...fullList] });

		console.log(this.state.cellList);

		const message = this.win(this.state.cellList);

		if (message !== "no winner") {
			alert(message);
		}
		if (message === "no winner" && this.determinePlayed(this.state.cellList)) {
			alert("It's a tie!");
		}
	};

	render() {
		return (
			<div>
				<Box
					pt={10}
					pl={50}
					sx={{
						display: "inline-grid",
						gridTemplateColumns: "repeat(3, 1fr)",
						gridTemplateRows: "repeat(3, 1fr)",
						gap: 1,
						justifyContent: "center",
					}}
				>
					<Cell id={1} sendInfo={this.useInfo} />
					<Cell id={2} sendInfo={this.useInfo} />
					<Cell id={3} sendInfo={this.useInfo} />
					<Cell id={4} sendInfo={this.useInfo} />
					<Cell id={5} sendInfo={this.useInfo} />
					<Cell id={6} sendInfo={this.useInfo} />
					<Cell id={7} sendInfo={this.useInfo} />
					<Cell id={8} sendInfo={this.useInfo} />
					<Cell id={9} sendInfo={this.useInfo} />
				</Box>
			</div>
		);
	}
}

export default App;
