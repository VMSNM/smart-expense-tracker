const GridBackground = ({ children }) => {
	return (
		<div className='w-full bg-slate-200 text-white bg-grid-black/[0.2] relative'>
			<div className='absolute pointer-events-none inset-0 bg-slate-400 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,#fff)]'></div>
			{children}
		</div>
	);
};
export default GridBackground;