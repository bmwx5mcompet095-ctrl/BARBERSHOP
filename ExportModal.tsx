const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const JSZip = __vite__cjsImport2_jszip;const _jsxDEV = __vite__cjsImport3_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport3_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=4e619415";
import { X, Download, Check, FolderArchive, Terminal, Sparkles } from "/node_modules/.vite/deps/lucide-react.js?v=02397d92";
import __vite__cjsImport2_jszip from "/node_modules/.vite/deps/jszip.js?v=6aca0f38";
var _jsxFileName = "/app/applet/src/components/ExportModal.tsx";
import __vite__cjsImport3_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=4e619415";
export const ExportModal = ({ isOpen, onClose }) => {
	const [isZipping, setIsZipping] = useState(false);
	const [downloadProgress, setDownloadProgress] = useState("");
	const [isDone, setIsDone] = useState(false);
	const [copiedCmd, setCopiedCmd] = useState(null);
	if (!isOpen) return null;
	const copyToClipboard = (text, id) => {
		navigator.clipboard.writeText(text);
		setCopiedCmd(id);
		setTimeout(() => setCopiedCmd(null), 2e3);
	};
	const handleDownloadZip = async () => {
		try {
			setIsZipping(true);
			setDownloadProgress("Подготовка файлов проекта...");
			const zip = new JSZip();
			// List of project source files to package
			const filesToFetch = [
				"index.html",
				"package.json",
				"tsconfig.json",
				"vite.config.ts",
				"src/main.tsx",
				"src/App.tsx",
				"src/index.css",
				"src/components/BarberImage.tsx",
				"src/components/BarberPole3D.tsx",
				"src/components/BarberToolsSVG.tsx",
				"src/components/GalleryModal.tsx",
				"src/components/LogoVB.tsx",
				"src/components/RevealOnScroll.tsx",
				"src/components/AudioPlayer.tsx",
				"src/components/ExportModal.tsx",
				"metadata.json"
			];
			for (let i = 0; i < filesToFetch.length; i++) {
				const filePath = filesToFetch[i];
				setDownloadProgress(`Упаковка: ${filePath} (${i + 1}/${filesToFetch.length})`);
				try {
					const res = await fetch(`/${filePath}`);
					if (res.ok) {
						const text = await res.text();
						zip.file(filePath, text);
					}
				} catch {}
			}
			// Add comprehensive README.md
			const readmeContent = `# Барбершоп «Вне времени» (Пермь, Комсомольский пр., 87)

Официальный лендинг барбершопа «Вне времени» на React 19, TypeScript, Vite и Tailwind CSS.

## Быстрый запуск

1. Установите зависимости:
\`\`\`bash
npm install
\`\`\`

2. Запустите локальный сервер разработки:
\`\`\`bash
npm run dev
\`\`\`
Сайт откроется по адресу: http://localhost:5173

3. Сборка для публикации на любом хостинге (Vercel, Netlify, Beget, Timeweb, Nginx):
\`\`\`bash
npm run build
\`\`\`
Готовые файлы для загрузки появятся в папке **dist/**.
`;
			zip.file("README.md", readmeContent);
			setDownloadProgress("Сжатие архива в .ZIP...");
			const blob = await zip.generateAsync({ type: "blob" });
			// Trigger browser file download
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "vne-vremeni-barbershop.zip";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
			setIsDone(true);
			setDownloadProgress("Архив успешно скачан!");
			setTimeout(() => {
				setIsZipping(false);
			}, 1500);
		} catch (err) {
			setDownloadProgress("Ошибка при создании архива. Попробуйте еще раз.");
			setIsZipping(false);
		}
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none",
		onClick: onClose,
		role: "dialog",
		"aria-modal": "true",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "relative max-w-xl w-full bg-[#111111] text-white border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-between pb-4 border-b border-white/10",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "w-10 h-10 rounded-xl bg-[#C8102E] flex items-center justify-center text-white shadow-md",
							children: /* @__PURE__ */ _jsxDEV(FolderArchive, { className: "w-5 h-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 129,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 128,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "font-display text-lg sm:text-xl text-white",
							children: "Экспорт и скачивание сайта"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 132,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-white/60 text-xs",
							children: "Все исходные файлы и инструкции по развёртыванию"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: onClose,
						className: "p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer",
						"aria-label": "Закрыть",
						children: /* @__PURE__ */ _jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 141,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 136,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "mt-6 p-5 bg-white/5 border border-white/10 rounded-xl flex flex-col gap-3",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "font-semibold text-sm text-white",
								children: "1. Скачать готовый ZIP-архив"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "text-[11px] font-mono px-2 py-0.5 bg-[#C8102E]/20 text-[#FF5C6C] rounded border border-[#C8102E]/30",
								children: "В один клик"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 147,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-white/70 text-xs leading-relaxed",
							children: [
								"Нажмите кнопку ниже, чтобы упаковать все файлы сайта (компоненты React, стили Tailwind, скрипты, конфиги Vite) в единый архив ",
								/* @__PURE__ */ _jsxDEV("code", { children: "vne-vremeni-barbershop.zip" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 154,
									columnNumber: 139
								}, this),
								"."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 153,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: handleDownloadZip,
							disabled: isZipping,
							className: "btn-barber w-full py-3.5 bg-[#C8102E] hover:bg-[#a60b24] text-white font-display text-xs sm:text-sm tracking-wider uppercase rounded-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.98] disabled:opacity-50",
							children: isDone ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-4 h-4 text-green-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Архив скачан!" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 165,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 163,
								columnNumber: 15
							}, this) : isZipping ? /* @__PURE__ */ _jsxDEV("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ _jsxDEV("span", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 169,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: downloadProgress || "Упаковка..." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 170,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 168,
								columnNumber: 15
							}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Скачать проект (.ZIP)" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 173,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 11
						}, this),
						downloadProgress && !isDone && /* @__PURE__ */ _jsxDEV("span", {
							className: "text-[11px] text-white/60 font-mono text-center block mt-1",
							children: downloadProgress
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 181,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 146,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "mt-4 p-4 bg-white/5 border border-white/10 rounded-xl",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 text-white font-semibold text-xs sm:text-sm mb-1.5",
							children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-4 h-4 text-[#FF5C6C]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Где кнопка экспорта в интерфейсе Google AI Studio?" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 191,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-white/70 text-xs leading-relaxed",
							children: "В верхней правой панели самого окна AI Studio (над окном предпросмотра):"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 193,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("ul", {
							className: "text-white/70 text-xs list-disc list-inside mt-1.5 space-y-1",
							children: [
								/* @__PURE__ */ _jsxDEV("li", { children: [
									"Кнопка ",
									/* @__PURE__ */ _jsxDEV("strong", { children: "Share" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 197,
										columnNumber: 24
									}, this),
									" (Поделиться ссылкой на работающий сайт)."
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 197,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("li", { children: [
									"Кнопка меню ",
									/* @__PURE__ */ _jsxDEV("strong", { children: "⋯ (три точки)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 198,
										columnNumber: 29
									}, this),
									" → ",
									/* @__PURE__ */ _jsxDEV("em", { children: "Download project" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 198,
										columnNumber: 62
									}, this),
									" или ",
									/* @__PURE__ */ _jsxDEV("em", { children: "Export to GitHub" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 198,
										columnNumber: 92
									}, this),
									"."
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 198,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("li", { children: "Если окно свёрнуто или на мобильном, она спрятана в выпадающем меню в правом углу." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 199,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 188,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "mt-4 p-4 bg-black/60 border border-white/10 rounded-xl",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between text-xs font-mono text-white/80 mb-2",
						children: [/* @__PURE__ */ _jsxDEV("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ _jsxDEV(Terminal, { className: "w-3.5 h-3.5 text-[#FF5C6C]" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 207,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Команды для запуска у себя" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 208,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 206,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => copyToClipboard("npm install && npm run build", "cmd"),
							className: "text-[#FF5C6C] hover:underline cursor-pointer",
							children: copiedCmd === "cmd" ? "Скопировано!" : "Копировать"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 210,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 205,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("pre", {
						className: "text-[11px] font-mono text-white/90 bg-black p-2.5 rounded border border-white/5 overflow-x-auto",
						children: "npm install && npm run build"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 204,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "mt-6 text-center",
					children: /* @__PURE__ */ _jsxDEV("button", {
						onClick: onClose,
						className: "text-xs text-white/50 hover:text-white underline cursor-pointer",
						children: "Закрыть окно"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 224,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 223,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 121,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 115,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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QUQ7T0FBSSxXQUFVO2lCQUFkO1FBQ0Usd0JBQUMsTUFBRDtTQUFJO1NBQU8sd0JBQUMsVUFBRCxZQUFRLFFBQWE7Ozs7O1NBQUM7UUFBNkM7Ozs7O1FBQzlFLHdCQUFDLE1BQUQ7U0FBSTtTQUFZLHdCQUFDLFVBQUQsWUFBUSxnQkFBcUI7Ozs7O1NBQUM7U0FBRyx3QkFBQyxNQUFELFlBQUksbUJBQW9COzs7OztTQUFDO1NBQUssd0JBQUMsTUFBRCxZQUFJLG1CQUFvQjs7Ozs7U0FBQztRQUFLOzs7OztRQUM3Ryx3QkFBQyxNQUFELFlBQUkscUZBQXNGOzs7OztPQUN4Rjs7Ozs7O0tBQ0Q7Ozs7OztJQUdMLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWYsQ0FDRSx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFBZixDQUNFLHdCQUFDLFFBQUQ7T0FBTSxXQUFVO2lCQUFoQixDQUNFLHdCQUFDLFVBQUQsRUFBVSxXQUFVLDZCQUE4Qjs7OztpQkFDbEQsd0JBQUMsUUFBRCxZQUFNLDZCQUFnQzs7OztlQUNsQzs7Ozs7Z0JBQ04sd0JBQUMsVUFBRDtPQUNFLGVBQWUsZ0JBQWdCLGdDQUFnQyxLQUFLO09BQ3BFLFdBQVU7aUJBRVQsY0FBYyxRQUFRLGlCQUFpQjtNQUNsQzs7OztjQUNMOzs7OztlQUNMLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUFtRztLQUU3Rzs7OzthQUNGOzs7Ozs7SUFHTCx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUNiLHdCQUFDLFVBQUQ7TUFDRSxTQUFTO01BQ1QsV0FBVTtnQkFDWDtLQUVPOzs7OztJQUNMOzs7OztHQUNGOzs7Ozs7Q0FDRjs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJFeHBvcnRNb2RhbC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgWCwgRG93bmxvYWQsIENoZWNrLCBGb2xkZXJBcmNoaXZlLCBUZXJtaW5hbCwgRXh0ZXJuYWxMaW5rLCBTcGFya2xlcyB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnO1xuXG5pbnRlcmZhY2UgRXhwb3J0TW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IEV4cG9ydE1vZGFsOiBSZWFjdC5GQzxFeHBvcnRNb2RhbFByb3BzPiA9ICh7IGlzT3Blbiwgb25DbG9zZSB9KSA9PiB7XG4gIGNvbnN0IFtpc1ppcHBpbmcsIHNldElzWmlwcGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtkb3dubG9hZFByb2dyZXNzLCBzZXREb3dubG9hZFByb2dyZXNzXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbaXNEb25lLCBzZXRJc0RvbmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY29waWVkQ21kLCBzZXRDb3BpZWRDbWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGNvcHlUb0NsaXBib2FyZCA9ICh0ZXh0OiBzdHJpbmcsIGlkOiBzdHJpbmcpID0+IHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KTtcbiAgICBzZXRDb3BpZWRDbWQoaWQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkQ21kKG51bGwpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZFppcCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgc2V0SXNaaXBwaW5nKHRydWUpO1xuICAgICAgc2V0RG93bmxvYWRQcm9ncmVzcygn0J/QvtC00LPQvtGC0L7QstC60LAg0YTQsNC50LvQvtCyINC/0YDQvtC10LrRgtCwLi4uJyk7XG4gICAgICBjb25zdCB6aXAgPSBuZXcgSlNaaXAoKTtcblxuICAgICAgLy8gTGlzdCBvZiBwcm9qZWN0IHNvdXJjZSBmaWxlcyB0byBwYWNrYWdlXG4gICAgICBjb25zdCBmaWxlc1RvRmV0Y2ggPSBbXG4gICAgICAgICdpbmRleC5odG1sJyxcbiAgICAgICAgJ3BhY2thZ2UuanNvbicsXG4gICAgICAgICd0c2NvbmZpZy5qc29uJyxcbiAgICAgICAgJ3ZpdGUuY29uZmlnLnRzJyxcbiAgICAgICAgJ3NyYy9tYWluLnRzeCcsXG4gICAgICAgICdzcmMvQXBwLnRzeCcsXG4gICAgICAgICdzcmMvaW5kZXguY3NzJyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0JhcmJlckltYWdlLnRzeCcsXG4gICAgICAgICdzcmMvY29tcG9uZW50cy9CYXJiZXJQb2xlM0QudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0JhcmJlclRvb2xzU1ZHLnRzeCcsXG4gICAgICAgICdzcmMvY29tcG9uZW50cy9HYWxsZXJ5TW9kYWwudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0xvZ29WQi50c3gnLFxuICAgICAgICAnc3JjL2NvbXBvbmVudHMvUmV2ZWFsT25TY3JvbGwudHN4JyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0F1ZGlvUGxheWVyLnRzeCcsXG4gICAgICAgICdzcmMvY29tcG9uZW50cy9FeHBvcnRNb2RhbC50c3gnLFxuICAgICAgICAnbWV0YWRhdGEuanNvbicsXG4gICAgICBdO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzVG9GZXRjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVzVG9GZXRjaFtpXTtcbiAgICAgICAgc2V0RG93bmxvYWRQcm9ncmVzcyhg0KPQv9Cw0LrQvtCy0LrQsDogJHtmaWxlUGF0aH0gKCR7aSArIDF9LyR7ZmlsZXNUb0ZldGNoLmxlbmd0aH0pYCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goYC8ke2ZpbGVQYXRofWApO1xuICAgICAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBhd2FpdCByZXMudGV4dCgpO1xuICAgICAgICAgICAgemlwLmZpbGUoZmlsZVBhdGgsIHRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLy8gaWdub3JlIGluZGl2aWR1YWwgbWlzc2luZyBzY3JhdGNoIGZpbGVzXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQWRkIGNvbXByZWhlbnNpdmUgUkVBRE1FLm1kXG4gICAgICBjb25zdCByZWFkbWVDb250ZW50ID0gYCMg0JHQsNGA0LHQtdGA0YjQvtC/IMKr0JLQvdC1INCy0YDQtdC80LXQvdC4wrsgKNCf0LXRgNC80YwsINCa0L7QvNGB0L7QvNC+0LvRjNGB0LrQuNC5INC/0YAuLCA4Nylcblxu0J7RhNC40YbQuNCw0LvRjNC90YvQuSDQu9C10L3QtNC40L3QsyDQsdCw0YDQsdC10YDRiNC+0L/QsCDCq9CS0L3QtSDQstGA0LXQvNC10L3QuMK7INC90LAgUmVhY3QgMTksIFR5cGVTY3JpcHQsIFZpdGUg0LggVGFpbHdpbmQgQ1NTLlxuXG4jIyDQkdGL0YHRgtGA0YvQuSDQt9Cw0L/Rg9GB0LpcblxuMS4g0KPRgdGC0LDQvdC+0LLQuNGC0LUg0LfQsNCy0LjRgdC40LzQvtGB0YLQuDpcblxcYFxcYFxcYGJhc2hcbm5wbSBpbnN0YWxsXG5cXGBcXGBcXGBcblxuMi4g0JfQsNC/0YPRgdGC0LjRgtC1INC70L7QutCw0LvRjNC90YvQuSDRgdC10YDQstC10YAg0YDQsNC30YDQsNCx0L7RgtC60Lg6XG5cXGBcXGBcXGBiYXNoXG5ucG0gcnVuIGRldlxuXFxgXFxgXFxgXG7QodCw0LnRgiDQvtGC0LrRgNC+0LXRgtGB0Y8g0L/QviDQsNC00YDQtdGB0YM6IGh0dHA6Ly9sb2NhbGhvc3Q6NTE3M1xuXG4zLiDQodCx0L7RgNC60LAg0LTQu9GPINC/0YPQsdC70LjQutCw0YbQuNC4INC90LAg0LvRjtCx0L7QvCDRhdC+0YHRgtC40L3Qs9C1IChWZXJjZWwsIE5ldGxpZnksIEJlZ2V0LCBUaW1ld2ViLCBOZ2lueCk6XG5cXGBcXGBcXGBiYXNoXG5ucG0gcnVuIGJ1aWxkXG5cXGBcXGBcXGBcbtCT0L7RgtC+0LLRi9C1INGE0LDQudC70Ysg0LTQu9GPINC30LDQs9GA0YPQt9C60Lgg0L/QvtGP0LLRj9GC0YHRjyDQsiDQv9Cw0L/QutC1ICoqZGlzdC8qKi5cbmA7XG4gICAgICB6aXAuZmlsZSgnUkVBRE1FLm1kJywgcmVhZG1lQ29udGVudCk7XG5cbiAgICAgIHNldERvd25sb2FkUHJvZ3Jlc3MoJ9Ch0LbQsNGC0LjQtSDQsNGA0YXQuNCy0LAg0LIgLlpJUC4uLicpO1xuICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHppcC5nZW5lcmF0ZUFzeW5jKHsgdHlwZTogJ2Jsb2InIH0pO1xuXG4gICAgICAvLyBUcmlnZ2VyIGJyb3dzZXIgZmlsZSBkb3dubG9hZFxuICAgICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICBsaW5rLmRvd25sb2FkID0gJ3ZuZS12cmVtZW5pLWJhcmJlcnNob3AuemlwJztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuXG4gICAgICBzZXRJc0RvbmUodHJ1ZSk7XG4gICAgICBzZXREb3dubG9hZFByb2dyZXNzKCfQkNGA0YXQuNCyINGD0YHQv9C10YjQvdC+INGB0LrQsNGH0LDQvSEnKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRJc1ppcHBpbmcoZmFsc2UpO1xuICAgICAgfSwgMTUwMCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBzZXREb3dubG9hZFByb2dyZXNzKCfQntGI0LjQsdC60LAg0L/RgNC4INGB0L7Qt9C00LDQvdC40Lgg0LDRgNGF0LjQstCwLiDQn9C+0L/RgNC+0LHRg9C50YLQtSDQtdGJ0LUg0YDQsNC3LicpO1xuICAgICAgc2V0SXNaaXBwaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctYmxhY2svODUgYmFja2Ryb3AtYmx1ci1tZCBwLTQgc2VsZWN0LW5vbmVcIlxuICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgICAgYXJpYS1tb2RhbD1cInRydWVcIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWF4LXcteGwgdy1mdWxsIGJnLVsjMTExMTExXSB0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItd2hpdGUvMTUgcm91bmRlZC0yeGwgcC02IHNtOnAtOCBzaGFkb3ctMnhsIG92ZXJmbG93LWhpZGRlblwiXG4gICAgICAgIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgPlxuICAgICAgICB7LyogVG9wIGhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItNCBib3JkZXItYiBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLXhsIGJnLVsjQzgxMDJFXSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXdoaXRlIHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgICA8Rm9sZGVyQXJjaGl2ZSBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtZGlzcGxheSB0ZXh0LWxnIHNtOnRleHQteGwgdGV4dC13aGl0ZVwiPtCt0LrRgdC/0L7RgNGCINC4INGB0LrQsNGH0LjQstCw0L3QuNC1INGB0LDQudGC0LA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlLzYwIHRleHQteHNcIj7QktGB0LUg0LjRgdGF0L7QtNC90YvQtSDRhNCw0LnQu9GLINC4INC40L3RgdGC0YDRg9C60YbQuNC4INC/0L4g0YDQsNC30LLRkdGA0YLRi9Cy0LDQvdC40Y48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtZnVsbCBob3ZlcjpiZy13aGl0ZS8xMCB0ZXh0LXdoaXRlLzcwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cItCX0LDQutGA0YvRgtGMXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIDEtQ2xpY2sgWklQIERvd25sb2FkIGJ1dHRvbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC02IHAtNSBiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bCBmbGV4IGZsZXgtY29sIGdhcC0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbSB0ZXh0LXdoaXRlXCI+MS4g0KHQutCw0YfQsNGC0Ywg0LPQvtGC0L7QstGL0LkgWklQLdCw0YDRhdC40LI8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgYmctWyNDODEwMkVdLzIwIHRleHQtWyNGRjVDNkNdIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1bI0M4MTAyRV0vMzBcIj5cbiAgICAgICAgICAgICAg0JIg0L7QtNC40L0g0LrQu9C40LpcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlLzcwIHRleHQteHMgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICDQndCw0LbQvNC40YLQtSDQutC90L7Qv9C60YMg0L3QuNC20LUsINGH0YLQvtCx0Ysg0YPQv9Cw0LrQvtCy0LDRgtGMINCy0YHQtSDRhNCw0LnQu9GLINGB0LDQudGC0LAgKNC60L7QvNC/0L7QvdC10L3RgtGLIFJlYWN0LCDRgdGC0LjQu9C4IFRhaWx3aW5kLCDRgdC60YDQuNC/0YLRiywg0LrQvtC90YTQuNCz0LggVml0ZSkg0LIg0LXQtNC40L3Ri9C5INCw0YDRhdC40LIgPGNvZGU+dm5lLXZyZW1lbmktYmFyYmVyc2hvcC56aXA8L2NvZGU+LlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkWmlwfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzWmlwcGluZ31cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1iYXJiZXIgdy1mdWxsIHB5LTMuNSBiZy1bI0M4MTAyRV0gaG92ZXI6YmctWyNhNjBiMjRdIHRleHQtd2hpdGUgZm9udC1kaXNwbGF5IHRleHQteHMgc206dGV4dC1zbSB0cmFja2luZy13aWRlciB1cHBlcmNhc2Ugcm91bmRlZC1sZyBzaGFkb3ctbGcgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi10cmFuc2Zvcm0gYWN0aXZlOnNjYWxlLVswLjk4XSBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aXNEb25lID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZ3JlZW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj7QkNGA0YXQuNCyINGB0LrQsNGH0LDQvSE8L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IGlzWmlwcGluZyA/IChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTQgaC00IGJvcmRlci0yIGJvcmRlci13aGl0ZS8zMCBib3JkZXItdC13aGl0ZSByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57ZG93bmxvYWRQcm9ncmVzcyB8fCAn0KPQv9Cw0LrQvtCy0LrQsC4uLid9PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj7QodC60LDRh9Cw0YLRjCDQv9GA0L7QtdC60YIgKC5aSVApPC9zcGFuPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7ZG93bmxvYWRQcm9ncmVzcyAmJiAhaXNEb25lICYmIChcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtd2hpdGUvNjAgZm9udC1tb25vIHRleHQtY2VudGVyIGJsb2NrIG10LTFcIj5cbiAgICAgICAgICAgICAge2Rvd25sb2FkUHJvZ3Jlc3N9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFdoZXJlIGlzIEFJIFN0dWRpbyBidXR0b24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBwLTQgYmctd2hpdGUvNSBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCB0ZXh0LXhzIHNtOnRleHQtc20gbWItMS41XCI+XG4gICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LVsjRkY1QzZDXVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj7Qk9C00LUg0LrQvdC+0L/QutCwINGN0LrRgdC/0L7RgNGC0LAg0LIg0LjQvdGC0LXRgNGE0LXQudGB0LUgR29vZ2xlIEFJIFN0dWRpbz88L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC13aGl0ZS83MCB0ZXh0LXhzIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAg0JIg0LLQtdGA0YXQvdC10Lkg0L/RgNCw0LLQvtC5INC/0LDQvdC10LvQuCDRgdCw0LzQvtCz0L4g0L7QutC90LAgQUkgU3R1ZGlvICjQvdCw0LQg0L7QutC90L7QvCDQv9GA0LXQtNC/0YDQvtGB0LzQvtGC0YDQsCk6XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlLzcwIHRleHQteHMgbGlzdC1kaXNjIGxpc3QtaW5zaWRlIG10LTEuNSBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgIDxsaT7QmtC90L7Qv9C60LAgPHN0cm9uZz5TaGFyZTwvc3Ryb25nPiAo0J/QvtC00LXQu9C40YLRjNGB0Y8g0YHRgdGL0LvQutC+0Lkg0L3QsCDRgNCw0LHQvtGC0LDRjtGJ0LjQuSDRgdCw0LnRgikuPC9saT5cbiAgICAgICAgICAgIDxsaT7QmtC90L7Qv9C60LAg0LzQtdC90Y4gPHN0cm9uZz7ii68gKNGC0YDQuCDRgtC+0YfQutC4KTwvc3Ryb25nPiDihpIgPGVtPkRvd25sb2FkIHByb2plY3Q8L2VtPiDQuNC70LggPGVtPkV4cG9ydCB0byBHaXRIdWI8L2VtPi48L2xpPlxuICAgICAgICAgICAgPGxpPtCV0YHQu9C4INC+0LrQvdC+INGB0LLRkdGA0L3Rg9GC0L4g0LjQu9C4INC90LAg0LzQvtCx0LjQu9GM0L3QvtC8LCDQvtC90LAg0YHQv9GA0Y/RgtCw0L3QsCDQsiDQstGL0L/QsNC00LDRjtGJ0LXQvCDQvNC10L3RjiDQsiDQv9GA0LDQstC+0Lwg0YPQs9C70YMuPC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRGVwbG95IGNvbW1hbmRzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcC00IGJnLWJsYWNrLzYwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC14bFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vIHRleHQtd2hpdGUvODAgbWItMlwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8VGVybWluYWwgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1bI0ZGNUM2Q11cIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj7QmtC+0LzQsNC90LTRiyDQtNC70Y8g0LfQsNC/0YPRgdC60LAg0YMg0YHQtdCx0Y88L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGNvcHlUb0NsaXBib2FyZCgnbnBtIGluc3RhbGwgJiYgbnBtIHJ1biBidWlsZCcsICdjbWQnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bI0ZGNUM2Q10gaG92ZXI6dW5kZXJsaW5lIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NvcGllZENtZCA9PT0gJ2NtZCcgPyAn0KHQutC+0L/QuNGA0L7QstCw0L3QviEnIDogJ9Ca0L7Qv9C40YDQvtCy0LDRgtGMJ31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtd2hpdGUvOTAgYmctYmxhY2sgcC0yLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXdoaXRlLzUgb3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgICBucG0gaW5zdGFsbCAmJiBucG0gcnVuIGJ1aWxkXG4gICAgICAgICAgPC9wcmU+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDbG9zZSBmb290ZXIgYnV0dG9uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTYgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXdoaXRlLzUwIGhvdmVyOnRleHQtd2hpdGUgdW5kZXJsaW5lIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDQl9Cw0LrRgNGL0YLRjCDQvtC60L3QvlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==