var Button = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.type, type = _c === void 0 ? 'button' : _c, onClick = _a.onClick, children = _a.children;
    return (<button className={className} type={type} onClick={onClick}>
			{children}
		</button>);
};
export default Button;
