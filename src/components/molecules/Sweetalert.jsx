import { memo } from "react";
import Backdrop from "../atoms/Backdrop";
import Card from "./Card";

function Alert({ message, className, children }) {
	return (
		<Card className="bg-white">
			<div className={className}>
				<p className="font-bold">{message}</p>
				{children}
			</div>
		</Card>
	);
}

function Sweetalert({ message, isOpen, className, children }) {
	return (
		<Backdrop>
			{isOpen && (
				<Alert message={message} className={className}>
					{children}
				</Alert>
			)}
		</Backdrop>
	);
}

export default memo(Sweetalert);
