const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=4e619415";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Scissors } from "/node_modules/.vite/deps/lucide-react.js?v=02397d92";
var _jsxFileName = "/app/applet/src/components/GalleryModal.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=4e619415";
export const GalleryModal = ({ images, initialIndex, isOpen, onClose }) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const [scale, setScale] = useState(1);
	const [dragY, setDragY] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const touchStartX = useRef(null);
	const touchStartY = useRef(null);
	const initialTouchDistance = useRef(null);
	const lastTapTime = useRef(0);
	useEffect(() => {
		setCurrentIndex(initialIndex);
		setScale(1);
		setDragY(0);
		setIsLoading(true);
	}, [initialIndex, isOpen]);
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!isOpen) return;
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") nextSlide();
			if (e.key === "ArrowLeft") prevSlide();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		isOpen,
		currentIndex,
		images.length
	]);
	if (!isOpen || images.length === 0) return null;
	const nextSlide = () => {
		setScale(1);
		setIsLoading(true);
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};
	const prevSlide = () => {
		setScale(1);
		setIsLoading(true);
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};
	const handleTouchStart = (e) => {
		if (e.touches.length === 2) {
			// Pinch zoom start
			const dx = e.touches[0].clientX - e.touches[1].clientX;
			const dy = e.touches[0].clientY - e.touches[1].clientY;
			initialTouchDistance.current = Math.hypot(dx, dy);
		} else if (e.touches.length === 1) {
			touchStartX.current = e.touches[0].clientX;
			touchStartY.current = e.touches[0].clientY;
			// Double-tap zoom detection
			const now = Date.now();
			if (now - lastTapTime.current < 300) {
				setScale((prev) => prev > 1 ? 1 : 2);
			}
			lastTapTime.current = now;
		}
	};
	const handleTouchMove = (e) => {
		if (e.touches.length === 2 && initialTouchDistance.current) {
			const dx = e.touches[0].clientX - e.touches[1].clientX;
			const dy = e.touches[0].clientY - e.touches[1].clientY;
			const distance = Math.hypot(dx, dy);
			const ratio = distance / initialTouchDistance.current;
			setScale(Math.max(1, Math.min(3, ratio)));
		} else if (e.touches.length === 1 && scale === 1 && touchStartY.current !== null) {
			const currentY = e.touches[0].clientY;
			const diffY = currentY - touchStartY.current;
			if (diffY > 0) {
				// Drag down to close
				setDragY(diffY);
			}
		}
	};
	const handleTouchEnd = (e) => {
		if (dragY > 120) {
			onClose();
			setDragY(0);
			return;
		}
		setDragY(0);
		if (scale > 1) {
			initialTouchDistance.current = null;
			return;
		}
		if (touchStartX.current !== null && e.changedTouches.length > 0) {
			const touchEndX = e.changedTouches[0].clientX;
			const diffX = touchStartX.current - touchEndX;
			if (diffX > 50) nextSlide();
			if (diffX < -50) prevSlide();
		}
		touchStartX.current = null;
		touchStartY.current = null;
		initialTouchDistance.current = null;
	};
	const current = images[currentIndex];
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none transition-opacity duration-300",
		style: { backgroundColor: `rgba(0, 0, 0, ${Math.max(.4, .95 - dragY / 400)})` },
		onClick: onClose,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Просмотр фотографии на весь экран",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "absolute top-4 inset-x-4 z-50 flex items-center justify-between pointer-events-auto",
				children: [/* @__PURE__ */ _jsxDEV("span", {
					className: "text-white/80 text-sm font-mono tracking-wider tabular-nums bg-black/40 px-3 py-1.5 rounded-full border border-white/10",
					children: [
						currentIndex + 1,
						" / ",
						images.length
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 135,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						onClick: (e) => {
							e.stopPropagation();
							setScale((prev) => prev > 1 ? 1 : 2);
						},
						className: "p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center border border-white/10",
						"aria-label": scale > 1 ? "Уменьшить" : "Увеличить",
						children: scale > 1 ? /* @__PURE__ */ _jsxDEV(ZoomOut, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 26
						}, this) : /* @__PURE__ */ _jsxDEV(ZoomIn, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 60
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 141,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: onClose,
						className: "p-3 rounded-full bg-white/10 hover:bg-[#C8102E] text-white transition-colors cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center border border-white/10",
						"aria-label": "Закрыть просмотр",
						children: /* @__PURE__ */ _jsxDEV(X, { className: "w-6 h-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 153,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 139,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 134,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("button", {
				onClick: (e) => {
					e.stopPropagation();
					prevSlide();
				},
				className: "hidden md:flex absolute left-6 p-4 rounded-full bg-white/10 hover:bg-[#C8102E] text-white transition-all cursor-pointer z-50 items-center justify-center min-h-[48px] min-w-[48px] border border-white/10",
				"aria-label": "Предыдущая фотография",
				children: /* @__PURE__ */ _jsxDEV(ChevronLeft, { className: "w-7 h-7" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 172,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 164,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("button", {
				onClick: (e) => {
					e.stopPropagation();
					nextSlide();
				},
				className: "hidden md:flex absolute right-6 p-4 rounded-full bg-white/10 hover:bg-[#C8102E] text-white transition-all cursor-pointer z-50 items-center justify-center min-h-[48px] min-w-[48px] border border-white/10",
				"aria-label": "Следующая фотография",
				children: /* @__PURE__ */ _jsxDEV(ChevronRight, { className: "w-7 h-7" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 183,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 175,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "relative max-w-4xl max-h-[85vh] w-full px-4 flex flex-col items-center justify-center transition-transform duration-200 ease-out",
				style: { transform: `translateY(${dragY}px)` },
				onClick: (e) => e.stopPropagation(),
				onTouchStart: handleTouchStart,
				onTouchMove: handleTouchMove,
				onTouchEnd: handleTouchEnd,
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "relative min-w-[280px] min-h-[360px] sm:min-w-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden rounded-xl shadow-2xl border border-white/15 bg-black/40 transition-transform duration-300 ease-out",
					style: { transform: `scale(${scale})` },
					children: [isLoading && /* @__PURE__ */ _jsxDEV("div", {
						className: "absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md transition-opacity duration-300 p-6 overflow-hidden",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none",
								style: { animationDuration: "1.6s" }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center",
								children: /* @__PURE__ */ _jsxDEV("div", {
									className: "w-full h-full rounded-full p-[3px] animate-spin",
									style: {
										background: "conic-gradient(from 0deg, #C8102E 0deg 90deg, #FFFFFF 90deg 180deg, #12306B 180deg 270deg, #FFFFFF 270deg 360deg)",
										animationDuration: "1.2s"
									},
									children: /* @__PURE__ */ _jsxDEV("div", {
										className: "w-full h-full bg-[#111111] rounded-full flex items-center justify-center",
										children: /* @__PURE__ */ _jsxDEV(Scissors, { className: "w-6 h-6 text-white animate-pulse -rotate-45" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 221,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 220,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 212,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 210,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-4 flex flex-col items-center gap-2 relative z-10",
								children: [
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-white font-display text-xs sm:text-sm tracking-widest uppercase",
										children: "Загрузка фотографии..."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 227,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-white/50 text-[11px] font-mono",
										children: [
											currentIndex + 1,
											" из ",
											images.length
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 230,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "w-32 h-1.5 bg-white/10 rounded-full overflow-hidden mt-1",
										children: /* @__PURE__ */ _jsxDEV("div", { className: "h-full barber-pole-stripe w-full" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 234,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 233,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 226,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("img", {
						src: current.src,
						alt: current.title,
						onLoad: () => setIsLoading(false),
						onError: () => setIsLoading(false),
						className: `max-h-[72vh] w-auto max-w-full object-contain pointer-events-none transition-all duration-400 ${isLoading ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100 blur-0"}`
					}, current.src, false, {
						fileName: _jsxFileName,
						lineNumber: 241,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 197,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "mt-4 text-center max-w-lg",
					children: [/* @__PURE__ */ _jsxDEV("h3", {
						className: "text-white font-display text-lg tracking-wide",
						children: current.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 255,
						columnNumber: 11
					}, this), current.master && /* @__PURE__ */ _jsxDEV("p", {
						className: "text-[#FF5C6C] font-semibold text-xs tracking-wider uppercase mt-1",
						children: ["Мастер: ", current.master]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 257,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 254,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 187,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 123,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLFVBQVUsV0FBVyxjQUFjO0FBQ25ELFNBQVMsR0FBRyxhQUFhLGNBQWMsUUFBUSxTQUFTLGdCQUFnQjs7O0FBU3hFLE9BQU8sTUFBTSxnQkFBNkMsRUFDeEQsUUFDQSxjQUNBLFFBQ0EsY0FDSTtDQUNKLE1BQU0sQ0FBQyxjQUFjLG1CQUFtQixTQUFTLFlBQVk7Q0FDN0QsTUFBTSxDQUFDLE9BQU8sWUFBWSxTQUFTLENBQUM7Q0FDcEMsTUFBTSxDQUFDLE9BQU8sWUFBWSxTQUFTLENBQUM7Q0FDcEMsTUFBTSxDQUFDLFdBQVcsZ0JBQWdCLFNBQVMsSUFBSTtDQUUvQyxNQUFNLGNBQWMsT0FBc0IsSUFBSTtDQUM5QyxNQUFNLGNBQWMsT0FBc0IsSUFBSTtDQUM5QyxNQUFNLHVCQUF1QixPQUFzQixJQUFJO0NBQ3ZELE1BQU0sY0FBYyxPQUFlLENBQUM7Q0FFcEMsZ0JBQWdCO0VBQ2QsZ0JBQWdCLFlBQVk7RUFDNUIsU0FBUyxDQUFDO0VBQ1YsU0FBUyxDQUFDO0VBQ1YsYUFBYSxJQUFJO0NBQ25CLEdBQUcsQ0FBQyxjQUFjLE1BQU0sQ0FBQztDQUV6QixnQkFBZ0I7RUFDZCxNQUFNLGlCQUFpQixNQUFxQjtHQUMxQyxJQUFJLENBQUMsUUFBUTtHQUNiLElBQUksRUFBRSxRQUFRLFVBQVUsUUFBUTtHQUNoQyxJQUFJLEVBQUUsUUFBUSxjQUFjLFVBQVU7R0FDdEMsSUFBSSxFQUFFLFFBQVEsYUFBYSxVQUFVO0VBQ3ZDO0VBQ0EsT0FBTyxpQkFBaUIsV0FBVyxhQUFhO0VBQ2hELGFBQWEsT0FBTyxvQkFBb0IsV0FBVyxhQUFhO0NBQ2xFLEdBQUc7RUFBQztFQUFRO0VBQWMsT0FBTztDQUFNLENBQUM7Q0FFeEMsSUFBSSxDQUFDLFVBQVUsT0FBTyxXQUFXLEdBQUcsT0FBTztDQUUzQyxNQUFNLGtCQUFrQjtFQUN0QixTQUFTLENBQUM7RUFDVixhQUFhLElBQUk7RUFDakIsaUJBQWlCLFVBQVUsT0FBTyxLQUFLLE9BQU8sTUFBTTtDQUN0RDtDQUVBLE1BQU0sa0JBQWtCO0VBQ3RCLFNBQVMsQ0FBQztFQUNWLGFBQWEsSUFBSTtFQUNqQixpQkFBaUIsVUFBVSxPQUFPLElBQUksT0FBTyxVQUFVLE9BQU8sTUFBTTtDQUN0RTtDQUVBLE1BQU0sb0JBQW9CLE1BQXdCO0VBQ2hELElBQUksRUFBRSxRQUFRLFdBQVcsR0FBRzs7R0FFMUIsTUFBTSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDO0dBQy9DLE1BQU0sS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQztHQUMvQyxxQkFBcUIsVUFBVSxLQUFLLE1BQU0sSUFBSSxFQUFFO0VBQ2xELE9BQU8sSUFBSSxFQUFFLFFBQVEsV0FBVyxHQUFHO0dBQ2pDLFlBQVksVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDO0dBQ25DLFlBQVksVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDOztHQUduQyxNQUFNLE1BQU0sS0FBSyxJQUFJO0dBQ3JCLElBQUksTUFBTSxZQUFZLFVBQVUsS0FBSztJQUNuQyxVQUFVLFNBQVUsT0FBTyxJQUFJLElBQUksQ0FBRTtHQUN2QztHQUNBLFlBQVksVUFBVTtFQUN4QjtDQUNGO0NBRUEsTUFBTSxtQkFBbUIsTUFBd0I7RUFDL0MsSUFBSSxFQUFFLFFBQVEsV0FBVyxLQUFLLHFCQUFxQixTQUFTO0dBQzFELE1BQU0sS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsQ0FBQztHQUMvQyxNQUFNLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUM7R0FDL0MsTUFBTSxXQUFXLEtBQUssTUFBTSxJQUFJLEVBQUU7R0FDbEMsTUFBTSxRQUFRLFdBQVcscUJBQXFCO0dBQzlDLFNBQVMsS0FBSyxJQUFJLEdBQUcsS0FBSyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7RUFDMUMsT0FBTyxJQUFJLEVBQUUsUUFBUSxXQUFXLEtBQUssVUFBVSxLQUFLLFlBQVksWUFBWSxNQUFNO0dBQ2hGLE1BQU0sV0FBVyxFQUFFLFFBQVEsRUFBRSxDQUFDO0dBQzlCLE1BQU0sUUFBUSxXQUFXLFlBQVk7R0FDckMsSUFBSSxRQUFRLEdBQUc7O0lBRWIsU0FBUyxLQUFLO0dBQ2hCO0VBQ0Y7Q0FDRjtDQUVBLE1BQU0sa0JBQWtCLE1BQXdCO0VBQzlDLElBQUksUUFBUSxLQUFLO0dBQ2YsUUFBUTtHQUNSLFNBQVMsQ0FBQztHQUNWO0VBQ0Y7RUFDQSxTQUFTLENBQUM7RUFFVixJQUFJLFFBQVEsR0FBRztHQUNiLHFCQUFxQixVQUFVO0dBQy9CO0VBQ0Y7RUFFQSxJQUFJLFlBQVksWUFBWSxRQUFRLEVBQUUsZUFBZSxTQUFTLEdBQUc7R0FDL0QsTUFBTSxZQUFZLEVBQUUsZUFBZSxFQUFFLENBQUM7R0FDdEMsTUFBTSxRQUFRLFlBQVksVUFBVTtHQUNwQyxJQUFJLFFBQVEsSUFBSSxVQUFVO0dBQzFCLElBQUksUUFBUSxDQUFDLElBQUksVUFBVTtFQUM3QjtFQUVBLFlBQVksVUFBVTtFQUN0QixZQUFZLFVBQVU7RUFDdEIscUJBQXFCLFVBQVU7Q0FDakM7Q0FFQSxNQUFNLFVBQVUsT0FBTztDQUV2QixPQUNFLHdCQUFDLE9BQUQ7RUFDRSxXQUFVO0VBQ1YsT0FBTyxFQUNMLGlCQUFpQixpQkFBaUIsS0FBSyxJQUFJLElBQUssTUFBTyxRQUFRLEdBQUcsRUFBRSxHQUN0RTtFQUNBLFNBQVM7RUFDVCxNQUFLO0VBQ0wsY0FBVztFQUNYLGNBQVc7WUFSYjtHQVdFLHdCQUFDLE9BQUQ7SUFBSyxXQUFVO2NBQWYsQ0FDRSx3QkFBQyxRQUFEO0tBQU0sV0FBVTtlQUFoQjtNQUNHLGVBQWU7TUFBRTtNQUFJLE9BQU87S0FDekI7Ozs7O2NBRU4sd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZixDQUVFLHdCQUFDLFVBQUQ7TUFDRSxVQUFVLE1BQU07T0FDZCxFQUFFLGdCQUFnQjtPQUNsQixVQUFVLFNBQVUsT0FBTyxJQUFJLElBQUksQ0FBRTtNQUN2QztNQUNBLFdBQVU7TUFDVixjQUFZLFFBQVEsSUFBSSxjQUFjO2dCQUVyQyxRQUFRLElBQUksd0JBQUMsU0FBRCxFQUFTLFdBQVUsVUFBVzs7OztpQkFBSSx3QkFBQyxRQUFELEVBQVEsV0FBVSxVQUFXOzs7OztLQUN0RTs7OztlQUdSLHdCQUFDLFVBQUQ7TUFDRSxTQUFTO01BQ1QsV0FBVTtNQUNWLGNBQVc7Z0JBRVgsd0JBQUMsR0FBRCxFQUFHLFdBQVUsVUFBVzs7Ozs7S0FDbEI7Ozs7YUFDTDs7Ozs7WUFDRjs7Ozs7O0dBR0wsd0JBQUMsVUFBRDtJQUNFLFVBQVUsTUFBTTtLQUNkLEVBQUUsZ0JBQWdCO0tBQ2xCLFVBQVU7SUFDWjtJQUNBLFdBQVU7SUFDVixjQUFXO2NBRVgsd0JBQUMsYUFBRCxFQUFhLFdBQVUsVUFBVzs7Ozs7R0FDNUI7Ozs7O0dBRVIsd0JBQUMsVUFBRDtJQUNFLFVBQVUsTUFBTTtLQUNkLEVBQUUsZ0JBQWdCO0tBQ2xCLFVBQVU7SUFDWjtJQUNBLFdBQVU7SUFDVixjQUFXO2NBRVgsd0JBQUMsY0FBRCxFQUFjLFdBQVUsVUFBVzs7Ozs7R0FDN0I7Ozs7O0dBR1Isd0JBQUMsT0FBRDtJQUNFLFdBQVU7SUFDVixPQUFPLEVBQ0wsV0FBVyxjQUFjLE1BQU0sS0FDakM7SUFDQSxVQUFVLE1BQU0sRUFBRSxnQkFBZ0I7SUFDbEMsY0FBYztJQUNkLGFBQWE7SUFDYixZQUFZO2NBUmQsQ0FVRSx3QkFBQyxPQUFEO0tBQ0UsV0FBVTtLQUNWLE9BQU8sRUFBRSxXQUFXLFNBQVMsTUFBTSxHQUFHO2VBRnhDLENBS0csYUFDQyx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFBZjtPQUVFLHdCQUFDLE9BQUQ7UUFDRSxXQUFVO1FBQ1YsT0FBTyxFQUFFLG1CQUFtQixPQUFPO09BQ3BDOzs7OztPQUVELHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUViLHdCQUFDLE9BQUQ7U0FDRSxXQUFVO1NBQ1YsT0FBTztVQUNMLFlBQ0U7VUFDRixtQkFBbUI7U0FDckI7bUJBRUEsd0JBQUMsT0FBRDtVQUFLLFdBQVU7b0JBQ2Isd0JBQUMsVUFBRCxFQUFVLFdBQVUsOENBQStDOzs7OztTQUNoRTs7Ozs7UUFDRjs7Ozs7T0FDRjs7Ozs7T0FFTCx3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFBZjtTQUNFLHdCQUFDLFFBQUQ7VUFBTSxXQUFVO29CQUF1RTtTQUVqRjs7Ozs7U0FDTix3QkFBQyxRQUFEO1VBQU0sV0FBVTtvQkFBaEI7V0FDRyxlQUFlO1dBQUU7V0FBSyxPQUFPO1VBQzFCOzs7Ozs7U0FDTix3QkFBQyxPQUFEO1VBQUssV0FBVTtvQkFDYix3QkFBQyxPQUFELEVBQUssV0FBVSxtQ0FBb0M7Ozs7O1NBQ2hEOzs7OztRQUNGOzs7Ozs7TUFDRjs7Ozs7ZUFJUCx3QkFBQyxPQUFEO01BRUUsS0FBSyxRQUFRO01BQ2IsS0FBSyxRQUFRO01BQ2IsY0FBYyxhQUFhLEtBQUs7TUFDaEMsZUFBZSxhQUFhLEtBQUs7TUFDakMsV0FBVyxpR0FDVCxZQUFZLCtCQUErQjtLQUU5QyxHQVJNLFFBQVE7Ozs7WUFRZCxDQUNFOzs7OztjQUdMLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWYsQ0FDRSx3QkFBQyxNQUFEO01BQUksV0FBVTtnQkFBaUQsUUFBUTtLQUFVOzs7O2VBQ2hGLFFBQVEsVUFDUCx3QkFBQyxLQUFEO01BQUcsV0FBVTtnQkFBYixDQUFrRixZQUN2RSxRQUFRLE1BQ2hCOzs7OzthQUVGOzs7OztZQUNGOzs7Ozs7RUFDRjs7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiR2FsbGVyeU1vZGFsLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgWCwgQ2hldnJvbkxlZnQsIENoZXZyb25SaWdodCwgWm9vbUluLCBab29tT3V0LCBTY2lzc29ycyB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBHYWxsZXJ5TW9kYWxQcm9wcyB7XG4gIGltYWdlczogeyBzcmM6IHN0cmluZzsgdGl0bGU6IHN0cmluZzsgbWFzdGVyPzogc3RyaW5nIH1bXTtcbiAgaW5pdGlhbEluZGV4OiBudW1iZXI7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IEdhbGxlcnlNb2RhbDogUmVhY3QuRkM8R2FsbGVyeU1vZGFsUHJvcHM+ID0gKHtcbiAgaW1hZ2VzLFxuICBpbml0aWFsSW5kZXgsXG4gIGlzT3BlbixcbiAgb25DbG9zZSxcbn0pID0+IHtcbiAgY29uc3QgW2N1cnJlbnRJbmRleCwgc2V0Q3VycmVudEluZGV4XSA9IHVzZVN0YXRlKGluaXRpYWxJbmRleCk7XG4gIGNvbnN0IFtzY2FsZSwgc2V0U2NhbGVdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtkcmFnWSwgc2V0RHJhZ1ldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICBjb25zdCB0b3VjaFN0YXJ0WCA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgdG91Y2hTdGFydFkgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGluaXRpYWxUb3VjaERpc3RhbmNlID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXN0VGFwVGltZSA9IHVzZVJlZjxudW1iZXI+KDApO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q3VycmVudEluZGV4KGluaXRpYWxJbmRleCk7XG4gICAgc2V0U2NhbGUoMSk7XG4gICAgc2V0RHJhZ1koMCk7XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICB9LCBbaW5pdGlhbEluZGV4LCBpc09wZW5dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKCFpc09wZW4pIHJldHVybjtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIG9uQ2xvc2UoKTtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93UmlnaHQnKSBuZXh0U2xpZGUoKTtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0Fycm93TGVmdCcpIHByZXZTbGlkZSgpO1xuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcbiAgfSwgW2lzT3BlbiwgY3VycmVudEluZGV4LCBpbWFnZXMubGVuZ3RoXSk7XG5cbiAgaWYgKCFpc09wZW4gfHwgaW1hZ2VzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgbmV4dFNsaWRlID0gKCkgPT4ge1xuICAgIHNldFNjYWxlKDEpO1xuICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICBzZXRDdXJyZW50SW5kZXgoKHByZXYpID0+IChwcmV2ICsgMSkgJSBpbWFnZXMubGVuZ3RoKTtcbiAgfTtcblxuICBjb25zdCBwcmV2U2xpZGUgPSAoKSA9PiB7XG4gICAgc2V0U2NhbGUoMSk7XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgIHNldEN1cnJlbnRJbmRleCgocHJldikgPT4gKHByZXYgLSAxICsgaW1hZ2VzLmxlbmd0aCkgJSBpbWFnZXMubGVuZ3RoKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVUb3VjaFN0YXJ0ID0gKGU6IFJlYWN0LlRvdWNoRXZlbnQpID0+IHtcbiAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgLy8gUGluY2ggem9vbSBzdGFydFxuICAgICAgY29uc3QgZHggPSBlLnRvdWNoZXNbMF0uY2xpZW50WCAtIGUudG91Y2hlc1sxXS5jbGllbnRYO1xuICAgICAgY29uc3QgZHkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WSAtIGUudG91Y2hlc1sxXS5jbGllbnRZO1xuICAgICAgaW5pdGlhbFRvdWNoRGlzdGFuY2UuY3VycmVudCA9IE1hdGguaHlwb3QoZHgsIGR5KTtcbiAgICB9IGVsc2UgaWYgKGUudG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRvdWNoU3RhcnRYLmN1cnJlbnQgPSBlLnRvdWNoZXNbMF0uY2xpZW50WDtcbiAgICAgIHRvdWNoU3RhcnRZLmN1cnJlbnQgPSBlLnRvdWNoZXNbMF0uY2xpZW50WTtcblxuICAgICAgLy8gRG91YmxlLXRhcCB6b29tIGRldGVjdGlvblxuICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGlmIChub3cgLSBsYXN0VGFwVGltZS5jdXJyZW50IDwgMzAwKSB7XG4gICAgICAgIHNldFNjYWxlKChwcmV2KSA9PiAocHJldiA+IDEgPyAxIDogMikpO1xuICAgICAgfVxuICAgICAgbGFzdFRhcFRpbWUuY3VycmVudCA9IG5vdztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG91Y2hNb3ZlID0gKGU6IFJlYWN0LlRvdWNoRXZlbnQpID0+IHtcbiAgICBpZiAoZS50b3VjaGVzLmxlbmd0aCA9PT0gMiAmJiBpbml0aWFsVG91Y2hEaXN0YW5jZS5jdXJyZW50KSB7XG4gICAgICBjb25zdCBkeCA9IGUudG91Y2hlc1swXS5jbGllbnRYIC0gZS50b3VjaGVzWzFdLmNsaWVudFg7XG4gICAgICBjb25zdCBkeSA9IGUudG91Y2hlc1swXS5jbGllbnRZIC0gZS50b3VjaGVzWzFdLmNsaWVudFk7XG4gICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguaHlwb3QoZHgsIGR5KTtcbiAgICAgIGNvbnN0IHJhdGlvID0gZGlzdGFuY2UgLyBpbml0aWFsVG91Y2hEaXN0YW5jZS5jdXJyZW50O1xuICAgICAgc2V0U2NhbGUoTWF0aC5tYXgoMSwgTWF0aC5taW4oMywgcmF0aW8pKSk7XG4gICAgfSBlbHNlIGlmIChlLnRvdWNoZXMubGVuZ3RoID09PSAxICYmIHNjYWxlID09PSAxICYmIHRvdWNoU3RhcnRZLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRZID0gZS50b3VjaGVzWzBdLmNsaWVudFk7XG4gICAgICBjb25zdCBkaWZmWSA9IGN1cnJlbnRZIC0gdG91Y2hTdGFydFkuY3VycmVudDtcbiAgICAgIGlmIChkaWZmWSA+IDApIHtcbiAgICAgICAgLy8gRHJhZyBkb3duIHRvIGNsb3NlXG4gICAgICAgIHNldERyYWdZKGRpZmZZKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG91Y2hFbmQgPSAoZTogUmVhY3QuVG91Y2hFdmVudCkgPT4ge1xuICAgIGlmIChkcmFnWSA+IDEyMCkge1xuICAgICAgb25DbG9zZSgpO1xuICAgICAgc2V0RHJhZ1koMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldERyYWdZKDApO1xuXG4gICAgaWYgKHNjYWxlID4gMSkge1xuICAgICAgaW5pdGlhbFRvdWNoRGlzdGFuY2UuY3VycmVudCA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRvdWNoU3RhcnRYLmN1cnJlbnQgIT09IG51bGwgJiYgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0b3VjaEVuZFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XG4gICAgICBjb25zdCBkaWZmWCA9IHRvdWNoU3RhcnRYLmN1cnJlbnQgLSB0b3VjaEVuZFg7XG4gICAgICBpZiAoZGlmZlggPiA1MCkgbmV4dFNsaWRlKCk7XG4gICAgICBpZiAoZGlmZlggPCAtNTApIHByZXZTbGlkZSgpO1xuICAgIH1cblxuICAgIHRvdWNoU3RhcnRYLmN1cnJlbnQgPSBudWxsO1xuICAgIHRvdWNoU3RhcnRZLmN1cnJlbnQgPSBudWxsO1xuICAgIGluaXRpYWxUb3VjaERpc3RhbmNlLmN1cnJlbnQgPSBudWxsO1xuICB9O1xuXG4gIGNvbnN0IGN1cnJlbnQgPSBpbWFnZXNbY3VycmVudEluZGV4XTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1ibGFjay85NSBiYWNrZHJvcC1ibHVyLW1kIHNlbGVjdC1ub25lIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0zMDBcIlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBgcmdiYSgwLCAwLCAwLCAke01hdGgubWF4KDAuNCwgMC45NSAtIGRyYWdZIC8gNDAwKX0pYCxcbiAgICAgIH19XG4gICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICBhcmlhLW1vZGFsPVwidHJ1ZVwiXG4gICAgICBhcmlhLWxhYmVsPVwi0J/RgNC+0YHQvNC+0YLRgCDRhNC+0YLQvtCz0YDQsNGE0LjQuCDQvdCwINCy0LXRgdGMINGN0LrRgNCw0L1cIlxuICAgID5cbiAgICAgIHsvKiBUb3AgYWN0aW9uIGJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTQgaW5zZXQteC00IHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBvaW50ZXItZXZlbnRzLWF1dG9cIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZS84MCB0ZXh0LXNtIGZvbnQtbW9ubyB0cmFja2luZy13aWRlciB0YWJ1bGFyLW51bXMgYmctYmxhY2svNDAgcHgtMyBweS0xLjUgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICB7Y3VycmVudEluZGV4ICsgMX0gLyB7aW1hZ2VzLmxlbmd0aH1cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICB7LyogWm9vbSB0b2dnbGUgYnV0dG9uICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIHNldFNjYWxlKChwcmV2KSA9PiAocHJldiA+IDEgPyAxIDogMikpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLWZ1bGwgYmctd2hpdGUvMTAgaG92ZXI6Ymctd2hpdGUvMjAgdGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciBtaW4taC1bNDhweF0gbWluLXctWzQ4cHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17c2NhbGUgPiAxID8gJ9Cj0LzQtdC90YzRiNC40YLRjCcgOiAn0KPQstC10LvQuNGH0LjRgtGMJ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7c2NhbGUgPiAxID8gPFpvb21PdXQgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+IDogPFpvb21JbiBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz59XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7LyogQ2xvc2UgYnV0dG9uICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC1mdWxsIGJnLXdoaXRlLzEwIGhvdmVyOmJnLVsjQzgxMDJFXSB0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIG1pbi1oLVs0OHB4XSBtaW4tdy1bNDhweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYm9yZGVyIGJvcmRlci13aGl0ZS8xMFwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwi0JfQsNC60YDRi9GC0Ywg0L/RgNC+0YHQvNC+0YLRgFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBOYXYgYnV0dG9ucyAoRGVza3RvcCkgKi99XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBwcmV2U2xpZGUoKTtcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmZsZXggYWJzb2x1dGUgbGVmdC02IHAtNCByb3VuZGVkLWZ1bGwgYmctd2hpdGUvMTAgaG92ZXI6YmctWyNDODEwMkVdIHRleHQtd2hpdGUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgei01MCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWluLWgtWzQ4cHhdIG1pbi13LVs0OHB4XSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCJcbiAgICAgICAgYXJpYS1sYWJlbD1cItCf0YDQtdC00YvQtNGD0YnQsNGPINGE0L7RgtC+0LPRgNCw0YTQuNGPXCJcbiAgICAgID5cbiAgICAgICAgPENoZXZyb25MZWZ0IGNsYXNzTmFtZT1cInctNyBoLTdcIiAvPlxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIG5leHRTbGlkZSgpO1xuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6ZmxleCBhYnNvbHV0ZSByaWdodC02IHAtNCByb3VuZGVkLWZ1bGwgYmctd2hpdGUvMTAgaG92ZXI6YmctWyNDODEwMkVdIHRleHQtd2hpdGUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgei01MCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWluLWgtWzQ4cHhdIG1pbi13LVs0OHB4XSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCJcbiAgICAgICAgYXJpYS1sYWJlbD1cItCh0LvQtdC00YPRjtGJ0LDRjyDRhNC+0YLQvtCz0YDQsNGE0LjRj1wiXG4gICAgICA+XG4gICAgICAgIDxDaGV2cm9uUmlnaHQgY2xhc3NOYW1lPVwidy03IGgtN1wiIC8+XG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgey8qIE1haW4gaW1hZ2UgY29udGFpbmVyIHdpdGggdG91Y2ggaGFuZGxpbmcgJiBGTElQIHNtb290aCB0cmFuc2l0aW9uICovfVxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtYXgtdy00eGwgbWF4LWgtWzg1dmhdIHctZnVsbCBweC00IGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTIwMCBlYXNlLW91dFwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgke2RyYWdZfXB4KWAsXG4gICAgICAgIH19XG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICBvblRvdWNoU3RhcnQ9e2hhbmRsZVRvdWNoU3RhcnR9XG4gICAgICAgIG9uVG91Y2hNb3ZlPXtoYW5kbGVUb3VjaE1vdmV9XG4gICAgICAgIG9uVG91Y2hFbmQ9e2hhbmRsZVRvdWNoRW5kfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWluLXctWzI4MHB4XSBtaW4taC1bMzYwcHhdIHNtOm1pbi13LVszODBweF0gc206bWluLWgtWzQ2MHB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC14bCBzaGFkb3ctMnhsIGJvcmRlciBib3JkZXItd2hpdGUvMTUgYmctYmxhY2svNDAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwIGVhc2Utb3V0XCJcbiAgICAgICAgICBzdHlsZT17eyB0cmFuc2Zvcm06IGBzY2FsZSgke3NjYWxlfSlgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7LyogQ3VzdG9tIEJhcmJlcnNob3AgTG9hZGluZyBTa2VsZXRvbiAmIEluZGljYXRvciAqL31cbiAgICAgICAgICB7aXNMb2FkaW5nICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTIwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzgwIGJhY2tkcm9wLWJsdXItbWQgdHJhbnNpdGlvbi1vcGFjaXR5IGR1cmF0aW9uLTMwMCBwLTYgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgIHsvKiBTaGltbWVyIGdyYWRpZW50IGxpbmUgKi99XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXIgZnJvbS10cmFuc3BhcmVudCB2aWEtd2hpdGUvMTAgdG8tdHJhbnNwYXJlbnQgLXRyYW5zbGF0ZS14LWZ1bGwgYW5pbWF0ZS1zaGltbWVyIHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGFuaW1hdGlvbkR1cmF0aW9uOiAnMS42cycgfX1cbiAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctMTYgaC0xNiBzbTp3LTIwIHNtOmgtMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICB7LyogUm90YXRpbmcgYmFyYmVyLXBvbGUgZ3JhZGllbnQgcmluZyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIHJvdW5kZWQtZnVsbCBwLVszcHhdIGFuaW1hdGUtc3BpblwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICAgICAgICAgICAgICdjb25pYy1ncmFkaWVudChmcm9tIDBkZWcsICNDODEwMkUgMGRlZyA5MGRlZywgI0ZGRkZGRiA5MGRlZyAxODBkZWcsICMxMjMwNkIgMTgwZGVnIDI3MGRlZywgI0ZGRkZGRiAyNzBkZWcgMzYwZGVnKScsXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbkR1cmF0aW9uOiAnMS4ycycsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBiZy1bIzExMTExMV0gcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTY2lzc29ycyBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtd2hpdGUgYW5pbWF0ZS1wdWxzZSAtcm90YXRlLTQ1XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTIgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1kaXNwbGF5IHRleHQteHMgc206dGV4dC1zbSB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICDQl9Cw0LPRgNGD0LfQutCwINGE0L7RgtC+0LPRgNCw0YTQuNC4Li4uXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGUvNTAgdGV4dC1bMTFweF0gZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICB7Y3VycmVudEluZGV4ICsgMX0g0LjQtyB7aW1hZ2VzLmxlbmd0aH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMyIGgtMS41IGJnLXdoaXRlLzEwIHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW4gbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLWZ1bGwgYmFyYmVyLXBvbGUtc3RyaXBlIHctZnVsbFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBQaG90byAqL31cbiAgICAgICAgICA8aW1nXG4gICAgICAgICAgICBrZXk9e2N1cnJlbnQuc3JjfVxuICAgICAgICAgICAgc3JjPXtjdXJyZW50LnNyY31cbiAgICAgICAgICAgIGFsdD17Y3VycmVudC50aXRsZX1cbiAgICAgICAgICAgIG9uTG9hZD17KCkgPT4gc2V0SXNMb2FkaW5nKGZhbHNlKX1cbiAgICAgICAgICAgIG9uRXJyb3I9eygpID0+IHNldElzTG9hZGluZyhmYWxzZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BtYXgtaC1bNzJ2aF0gdy1hdXRvIG1heC13LWZ1bGwgb2JqZWN0LWNvbnRhaW4gcG9pbnRlci1ldmVudHMtbm9uZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi00MDAgJHtcbiAgICAgICAgICAgICAgaXNMb2FkaW5nID8gJ29wYWNpdHktMCBzY2FsZS05NSBibHVyLXNtJyA6ICdvcGFjaXR5LTEwMCBzY2FsZS0xMDAgYmx1ci0wJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENhcHRpb24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCB0ZXh0LWNlbnRlciBtYXgtdy1sZ1wiPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtZGlzcGxheSB0ZXh0LWxnIHRyYWNraW5nLXdpZGVcIj57Y3VycmVudC50aXRsZX08L2gzPlxuICAgICAgICAgIHtjdXJyZW50Lm1hc3RlciAmJiAoXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsjRkY1QzZDXSBmb250LXNlbWlib2xkIHRleHQteHMgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIG10LTFcIj5cbiAgICAgICAgICAgICAg0JzQsNGB0YLQtdGAOiB7Y3VycmVudC5tYXN0ZXJ9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=