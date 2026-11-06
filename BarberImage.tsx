const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=4e619415";
import { Scissors } from "/node_modules/.vite/deps/lucide-react.js?v=02397d92";
var _jsxFileName = "/app/applet/src/components/BarberImage.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=4e619415";
export const BarberImage = ({ src, alt, className = "", containerClassName = "", showSpinner = true, style, ...props }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);
	return /* @__PURE__ */ _jsxDEV("div", {
		className: `relative overflow-hidden ${containerClassName}`,
		children: [!isLoaded && !hasError && /* @__PURE__ */ _jsxDEV("div", {
			className: "absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/6 select-none",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer",
				style: {
					animationDuration: "1.5s",
					animationIterationCount: "infinite"
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 30,
				columnNumber: 11
			}, this), showSpinner && /* @__PURE__ */ _jsxDEV("div", {
				className: "relative z-10 flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "w-8 h-8 rounded-full p-[2.5px] animate-spin shadow-sm",
					style: {
						background: "conic-gradient(from 0deg, #C8102E 0deg 90deg, #FFFFFF 90deg 180deg, #12306B 180deg 270deg, #FFFFFF 270deg 360deg)",
						animationDuration: "1.1s"
					},
					children: /* @__PURE__ */ _jsxDEV("div", {
						className: "w-full h-full bg-[#111111] rounded-full flex items-center justify-center",
						children: /* @__PURE__ */ _jsxDEV(Scissors, { className: "w-3.5 h-3.5 text-white animate-pulse -rotate-45" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 46,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 45,
						columnNumber: 17
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 15
				}, this), /* @__PURE__ */ _jsxDEV("span", {
					className: "text-[10px] font-mono tracking-wider text-black/50 uppercase",
					children: "Загрузка"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 36,
				columnNumber: 13
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 28,
			columnNumber: 9
		}, this), /* @__PURE__ */ _jsxDEV("img", {
			src,
			alt,
			loading: "lazy",
			onLoad: () => setIsLoaded(true),
			onError: () => setHasError(true),
			className: `w-full h-full object-cover transition-all duration-500 ease-out ${isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-102 blur-sm"} ${className}`,
			style,
			...props
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 58,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 25,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLGdCQUFnQjtBQUNoQyxTQUFTLGdCQUFnQjs7O0FBVXpCLE9BQU8sTUFBTSxlQUEyQyxFQUN0RCxLQUNBLEtBQ0EsWUFBWSxJQUNaLHFCQUFxQixJQUNyQixjQUFjLE1BQ2QsT0FDQSxHQUFHLFlBQ0M7Q0FDSixNQUFNLENBQUMsVUFBVSxlQUFlLFNBQVMsS0FBSztDQUM5QyxNQUFNLENBQUMsVUFBVSxlQUFlLFNBQVMsS0FBSztDQUU5QyxPQUNFLHdCQUFDLE9BQUQ7RUFBSyxXQUFXLDRCQUE0QjtZQUE1QyxDQUVHLENBQUMsWUFBWSxDQUFDLFlBQ2Isd0JBQUMsT0FBRDtHQUFLLFdBQVU7YUFBZixDQUVFLHdCQUFDLE9BQUQ7SUFDRSxXQUFVO0lBQ1YsT0FBTztLQUFFLG1CQUFtQjtLQUFRLHlCQUF5QjtJQUFXO0dBQ3pFOzs7O2FBRUEsZUFDQyx3QkFBQyxPQUFEO0lBQUssV0FBVTtjQUFmLENBQ0Usd0JBQUMsT0FBRDtLQUNFLFdBQVU7S0FDVixPQUFPO01BQ0wsWUFDRTtNQUNGLG1CQUFtQjtLQUNyQjtlQUVBLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUNiLHdCQUFDLFVBQUQsRUFBVSxXQUFVLGtEQUFtRDs7Ozs7S0FDcEU7Ozs7O0lBQ0Y7Ozs7Y0FDTCx3QkFBQyxRQUFEO0tBQU0sV0FBVTtlQUErRDtJQUV6RTs7OztZQUNIOzs7OztXQUVKOzs7OztZQUlQLHdCQUFDLE9BQUQ7R0FDTztHQUNBO0dBQ0wsU0FBUTtHQUNSLGNBQWMsWUFBWSxJQUFJO0dBQzlCLGVBQWUsWUFBWSxJQUFJO0dBQy9CLFdBQVcsbUVBQ1QsV0FBVyxpQ0FBaUMsOEJBQzdDLEdBQUc7R0FDRztHQUNQLEdBQUk7RUFDTDs7OztVQUNFOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJCYXJiZXJJbWFnZS50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2Npc3NvcnMgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbnRlcmZhY2UgQmFyYmVySW1hZ2VQcm9wcyBleHRlbmRzIFJlYWN0LkltZ0hUTUxBdHRyaWJ1dGVzPEhUTUxJbWFnZUVsZW1lbnQ+IHtcbiAgc3JjOiBzdHJpbmc7XG4gIGFsdDogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGNvbnRhaW5lckNsYXNzTmFtZT86IHN0cmluZztcbiAgc2hvd1NwaW5uZXI/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY29uc3QgQmFyYmVySW1hZ2U6IFJlYWN0LkZDPEJhcmJlckltYWdlUHJvcHM+ID0gKHtcbiAgc3JjLFxuICBhbHQsXG4gIGNsYXNzTmFtZSA9ICcnLFxuICBjb250YWluZXJDbGFzc05hbWUgPSAnJyxcbiAgc2hvd1NwaW5uZXIgPSB0cnVlLFxuICBzdHlsZSxcbiAgLi4ucHJvcHNcbn0pID0+IHtcbiAgY29uc3QgW2lzTG9hZGVkLCBzZXRJc0xvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtoYXNFcnJvciwgc2V0SGFzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2ByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gJHtjb250YWluZXJDbGFzc05hbWV9YH0+XG4gICAgICB7LyogTG9hZGluZyBTa2VsZXRvbiAmIFNoaW1tZXIgKi99XG4gICAgICB7IWlzTG9hZGVkICYmICFoYXNFcnJvciAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTEwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzYgc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgICB7LyogQW5pbWF0ZWQgc2hpbW1lciBncmFkaWVudCAqL31cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXIgZnJvbS10cmFuc3BhcmVudCB2aWEtd2hpdGUvNDAgdG8tdHJhbnNwYXJlbnQgLXRyYW5zbGF0ZS14LWZ1bGwgYW5pbWF0ZS1zaGltbWVyXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IGFuaW1hdGlvbkR1cmF0aW9uOiAnMS41cycsIGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiAnaW5maW5pdGUnIH19XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIHtzaG93U3Bpbm5lciAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1mdWxsIHAtWzIuNXB4XSBhbmltYXRlLXNwaW4gc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDpcbiAgICAgICAgICAgICAgICAgICAgJ2NvbmljLWdyYWRpZW50KGZyb20gMGRlZywgI0M4MTAyRSAwZGVnIDkwZGVnLCAjRkZGRkZGIDkwZGVnIDE4MGRlZywgIzEyMzA2QiAxODBkZWcgMjcwZGVnLCAjRkZGRkZGIDI3MGRlZyAzNjBkZWcpJyxcbiAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAnMS4xcycsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBiZy1bIzExMTExMV0gcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8U2Npc3NvcnMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC13aGl0ZSBhbmltYXRlLXB1bHNlIC1yb3RhdGUtNDVcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRyYWNraW5nLXdpZGVyIHRleHQtYmxhY2svNTAgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAg0JfQsNCz0YDRg9C30LrQsFxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBJbWFnZSB3aXRoIHNtb290aCBmYWRlLWluICovfVxuICAgICAgPGltZ1xuICAgICAgICBzcmM9e3NyY31cbiAgICAgICAgYWx0PXthbHR9XG4gICAgICAgIGxvYWRpbmc9XCJsYXp5XCJcbiAgICAgICAgb25Mb2FkPXsoKSA9PiBzZXRJc0xvYWRlZCh0cnVlKX1cbiAgICAgICAgb25FcnJvcj17KCkgPT4gc2V0SGFzRXJyb3IodHJ1ZSl9XG4gICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTUwMCBlYXNlLW91dCAke1xuICAgICAgICAgIGlzTG9hZGVkID8gJ29wYWNpdHktMTAwIHNjYWxlLTEwMCBibHVyLTAnIDogJ29wYWNpdHktMCBzY2FsZS0xMDIgYmx1ci1zbSdcbiAgICAgICAgfSAke2NsYXNzTmFtZX1gfVxuICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19