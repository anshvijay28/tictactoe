import React from "react";
import Button from "@mui/material/Button";

class Cell extends React.Component {
	state = { option: null, id: null };

	doTurn = (e) => {
		if (e.type === "contextmenu") {
			e.preventDefault();
			this.setState({ option: "O", id: this.props.id });
		} else if (e.type === "click") {
			this.setState({ option: "X", id: this.props.id });
		}
	};
	//create ongoing list of all state changes and if a state is alr in that list don't sendInfo??????

	componentDidUpdate(prevProps, prevState) {
		if (prevState.option !== this.state.option) {
			setTimeout(() => {
				this.props.sendInfo(this.state);
			}, 100);
		}
	}

	render() {
		return (
			<div>
				<Button
					onClick={this.doTurn}
					onContextMenu={this.doTurn}
					varient="contained"
					id={this.props.id}
					sx={{
						color: "lightblue",
						bgcolor: "info.main",
						fontSize: "50px",
						width: "200px",
						height: "200px",
						"&:hover": {
							bgcolor: "info.main",
						},
					}}
				>
					{this.state.option}
				</Button>
			</div>
		);
	}
}

export default Cell;
