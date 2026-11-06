const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport1_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=4e619415";
var _jsxFileName = "/app/applet/src/components/RevealOnScroll.tsx";
import __vite__cjsImport1_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=4e619415";
export const RevealOnScroll = ({ children, className = "", delay = 0, direction = "up", threshold = .15, as: Component = "div" }) => {
	const [isVisible, setIsVisible] = useState(false);
	const domRef = useRef(null);
	useEffect(() => {
		// Check for reduced motion preference
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setIsVisible(true);
			return;
		}
		const currentRef = domRef.current;
		if (!currentRef) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				observer.unobserve(currentRef);
			}
		}, {
			threshold,
			rootMargin: "0px 0px -40px 0px"
		});
		observer.observe(currentRef);
		return () => {
			if (currentRef) observer.unobserve(currentRef);
		};
	}, [threshold]);
	const transformStyle = direction === "up" ? isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0" : isVisible ? "opacity-100" : "opacity-0";
	return /* @__PURE__ */ _jsxDEV(Component, {
		ref: domRef,
		style: { transitionDelay: `${delay}ms` },
		className: `transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${transformStyle} ${className}`,
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 62,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLFdBQVcsUUFBUSxnQkFBZ0I7OztBQVduRCxPQUFPLE1BQU0sa0JBQWlELEVBQzVELFVBQ0EsWUFBWSxJQUNaLFFBQVEsR0FDUixZQUFZLE1BQ1osWUFBWSxLQUNaLElBQUksWUFBWSxZQUNaO0NBQ0osTUFBTSxDQUFDLFdBQVcsZ0JBQWdCLFNBQVMsS0FBSztDQUNoRCxNQUFNLFNBQVMsT0FBMkIsSUFBSTtDQUU5QyxnQkFBZ0I7O0VBRWQsSUFBSSxPQUFPLFdBQVcsa0NBQWtDLENBQUMsQ0FBQyxTQUFTO0dBQ2pFLGFBQWEsSUFBSTtHQUNqQjtFQUNGO0VBRUEsTUFBTSxhQUFhLE9BQU87RUFDMUIsSUFBSSxDQUFDLFlBQVk7RUFFakIsTUFBTSxXQUFXLElBQUksc0JBQ2xCLENBQUMsV0FBVztHQUNYLElBQUksTUFBTSxnQkFBZ0I7SUFDeEIsYUFBYSxJQUFJO0lBQ2pCLFNBQVMsVUFBVSxVQUFVO0dBQy9CO0VBQ0YsR0FDQTtHQUNFO0dBQ0EsWUFBWTtFQUNkLENBQ0Y7RUFFQSxTQUFTLFFBQVEsVUFBVTtFQUUzQixhQUFhO0dBQ1gsSUFBSSxZQUFZLFNBQVMsVUFBVSxVQUFVO0VBQy9DO0NBQ0YsR0FBRyxDQUFDLFNBQVMsQ0FBQztDQUVkLE1BQU0saUJBQWlCLGNBQWMsT0FDakMsWUFDRSw4QkFDQSw0QkFDRixZQUNBLGdCQUNBO0NBRUosT0FDRSx3QkFBQyxXQUFEO0VBQ0UsS0FBSztFQUNMLE9BQU8sRUFDTCxpQkFBaUIsR0FBRyxNQUFNLElBQzVCO0VBQ0EsV0FBVyx3RkFBd0YsZUFBZSxHQUFHO0VBRXBIO0NBQ1E7Ozs7O0FBRWYiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiUmV2ZWFsT25TY3JvbGwudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmludGVyZmFjZSBSZXZlYWxPblNjcm9sbFByb3BzIHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBkZWxheT86IG51bWJlcjsgLy8gRGVsYXkgaW4gbWlsbGlzZWNvbmRzIChlLmcuIDAsIDE1MCwgMzAwKVxuICBkaXJlY3Rpb24/OiAndXAnIHwgJ25vbmUnO1xuICB0aHJlc2hvbGQ/OiBudW1iZXI7XG4gIGFzPzogJ2RpdicgfCAnaDEnIHwgJ2gyJyB8ICdoMycgfCAncCcgfCAnc3Bhbic7XG59XG5cbmV4cG9ydCBjb25zdCBSZXZlYWxPblNjcm9sbDogUmVhY3QuRkM8UmV2ZWFsT25TY3JvbGxQcm9wcz4gPSAoe1xuICBjaGlsZHJlbixcbiAgY2xhc3NOYW1lID0gJycsXG4gIGRlbGF5ID0gMCxcbiAgZGlyZWN0aW9uID0gJ3VwJyxcbiAgdGhyZXNob2xkID0gMC4xNSxcbiAgYXM6IENvbXBvbmVudCA9ICdkaXYnLFxufSkgPT4ge1xuICBjb25zdCBbaXNWaXNpYmxlLCBzZXRJc1Zpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBkb21SZWYgPSB1c2VSZWY8SFRNTEVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIENoZWNrIGZvciByZWR1Y2VkIG1vdGlvbiBwcmVmZXJlbmNlXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcbiAgICAgIHNldElzVmlzaWJsZSh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50UmVmID0gZG9tUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjdXJyZW50UmVmKSByZXR1cm47XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihcbiAgICAgIChbZW50cnldKSA9PiB7XG4gICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICAgIHNldElzVmlzaWJsZSh0cnVlKTtcbiAgICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoY3VycmVudFJlZik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRocmVzaG9sZCxcbiAgICAgICAgcm9vdE1hcmdpbjogJzBweCAwcHggLTQwcHggMHB4JyxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShjdXJyZW50UmVmKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoY3VycmVudFJlZikgb2JzZXJ2ZXIudW5vYnNlcnZlKGN1cnJlbnRSZWYpO1xuICAgIH07XG4gIH0sIFt0aHJlc2hvbGRdKTtcblxuICBjb25zdCB0cmFuc2Zvcm1TdHlsZSA9IGRpcmVjdGlvbiA9PT0gJ3VwJ1xuICAgID8gaXNWaXNpYmxlXG4gICAgICA/ICd0cmFuc2xhdGUteS0wIG9wYWNpdHktMTAwJ1xuICAgICAgOiAndHJhbnNsYXRlLXktOCBvcGFjaXR5LTAnXG4gICAgOiBpc1Zpc2libGVcbiAgICA/ICdvcGFjaXR5LTEwMCdcbiAgICA6ICdvcGFjaXR5LTAnO1xuXG4gIHJldHVybiAoXG4gICAgPENvbXBvbmVudFxuICAgICAgcmVmPXtkb21SZWYgYXMgYW55fVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgdHJhbnNpdGlvbkRlbGF5OiBgJHtkZWxheX1tc2AsXG4gICAgICB9fVxuICAgICAgY2xhc3NOYW1lPXtgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzAwIGVhc2UtW2N1YmljLWJlemllcigwLjIyLDEsMC4zNiwxKV0gd2lsbC1jaGFuZ2UtdHJhbnNmb3JtICR7dHJhbnNmb3JtU3R5bGV9ICR7Y2xhc3NOYW1lfWB9XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvQ29tcG9uZW50PlxuICApO1xufTtcbiJdfQ==