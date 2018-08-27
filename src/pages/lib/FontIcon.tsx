
interface IconProps {
	name: string,
	size?: number,
	color?: string,
	className?: string,
	style?: React.CSSProperties
}

export class Icon extends Component<IconProps, {}>{
	render() {
		let { className = 'iconfont', name, color = '#000', size = 16, style = {} } = this.props
		return (
			<i className={`${className} ${name}`} style={{ color, fontSize: size, ...style }}></i>
		)
	}
}