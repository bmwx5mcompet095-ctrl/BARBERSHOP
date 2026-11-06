const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=4e619415";
import { VolumeX, X, Disc3 } from "/node_modules/.vite/deps/lucide-react.js?v=02397d92";
var _jsxFileName = "/app/applet/src/components/AudioPlayer.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=4e619415";
export const AudioPlayer = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastDismissed, setToastDismissed] = useState(false);
	const audioRef = useRef(null);
	const audioCtxRef = useRef(null);
	const beatTimerRef = useRef(null);
	const fadeIntervalRef = useRef(null);
	const isPlayingRef = useRef(false);
	useEffect(() => {
		try {
			const saved = localStorage.getItem("vne_vremeni_music_pref");
			if (saved === "dismissed") {
				setToastDismissed(true);
			}
		} catch {}
		const toastTimer = setTimeout(() => {
			if (!toastDismissed && !isPlayingRef.current) {
				setShowToast(true);
			}
		}, 3500);
		return () => clearTimeout(toastTimer);
	}, [toastDismissed]);
	// Handle visibilitychange to pause audio when tab is backgrounded
	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden && isPlayingRef.current) {
				pauseAudio();
			}
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
	}, []);
	// Tyga West Coast Rap Beat Synthesizer (Web Audio API)
	// ~98 BPM, punchy 808 sub bass, crisp trap claps on 2 & 4, hi-hat rolls, catchy synth riff
	const startTygaBeat = () => {
		try {
			const AudioCtx = window.AudioContext || window.webkitAudioContext;
			const ctx = new AudioCtx();
			audioCtxRef.current = ctx;
			const masterGain = ctx.createGain();
			masterGain.gain.setValueAtTime(.001, ctx.currentTime);
			masterGain.connect(ctx.destination);
			// Smooth fade-in to 0.35 volume over 1.5s
			masterGain.gain.exponentialRampToValueAtTime(.35, ctx.currentTime + 1.5);
			const bpm = 98;
			const beatDuration = 60 / bpm;
			const stepDuration = beatDuration / 4;
			let currentStep = 0;
			// 808 Kick Trigger
			const play808 = (time, freq = 55) => {
				const osc = ctx.createOscillator();
				const gain = ctx.createGain();
				// 808 Pitch Drop
				osc.frequency.setValueAtTime(freq * 2.8, time);
				osc.frequency.exponentialRampToValueAtTime(freq, time + .08);
				// Amplitude Envelope
				gain.gain.setValueAtTime(.9, time);
				gain.gain.exponentialRampToValueAtTime(.001, time + .45);
				// Soft saturation clipper
				const waveshaper = ctx.createWaveShaper();
				const curve = new Float32Array(256);
				for (let i = 0; i < 256; i++) {
					const x = i * 2 / 256 - 1;
					curve[i] = Math.tanh(x * 1.5);
				}
				waveshaper.curve = curve;
				osc.connect(waveshaper);
				waveshaper.connect(gain);
				gain.connect(masterGain);
				osc.start(time);
				osc.stop(time + .46);
			};
			// Crisp 808 Snare / Clap Trigger
			const playClap = (time) => {
				// Noise burst
				const bufferSize = ctx.sampleRate * .15;
				const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
				const data = noiseBuffer.getChannelData(0);
				for (let i = 0; i < bufferSize; i++) {
					data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * .04));
				}
				const noise = ctx.createBufferSource();
				noise.buffer = noiseBuffer;
				const filter = ctx.createBiquadFilter();
				filter.type = "bandpass";
				filter.frequency.setValueAtTime(1400, time);
				filter.Q.setValueAtTime(1.8, time);
				const gain = ctx.createGain();
				gain.gain.setValueAtTime(.7, time);
				gain.gain.exponentialRampToValueAtTime(.001, time + .14);
				noise.connect(filter);
				filter.connect(gain);
				gain.connect(masterGain);
				noise.start(time);
				// Snare body tone (200Hz pop)
				const toneOsc = ctx.createOscillator();
				const toneGain = ctx.createGain();
				toneOsc.frequency.setValueAtTime(220, time);
				toneOsc.frequency.exponentialRampToValueAtTime(120, time + .05);
				toneGain.gain.setValueAtTime(.5, time);
				toneGain.gain.exponentialRampToValueAtTime(.001, time + .07);
				toneOsc.connect(toneGain);
				toneGain.connect(masterGain);
				toneOsc.start(time);
				toneOsc.stop(time + .08);
			};
			// Crisp Trap Hi-Hat Trigger
			const playHiHat = (time, isAccent = false) => {
				const bufferSize = ctx.sampleRate * .05;
				const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
				const data = noiseBuffer.getChannelData(0);
				for (let i = 0; i < bufferSize; i++) {
					data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * .012));
				}
				const noise = ctx.createBufferSource();
				noise.buffer = noiseBuffer;
				const filter = ctx.createBiquadFilter();
				filter.type = "highpass";
				filter.frequency.setValueAtTime(7500, time);
				const gain = ctx.createGain();
				gain.gain.setValueAtTime(isAccent ? .35 : .18, time);
				gain.gain.exponentialRampToValueAtTime(.001, time + .045);
				noise.connect(filter);
				filter.connect(gain);
				gain.connect(masterGain);
				noise.start(time);
			};
			// West Coast Synth Lead Melody (Tyga Bounce Vibe)
			const melodyNotes = [
				369.99,
				0,
				440,
				0,
				369.99,
				440,
				493.88,
				0,
				554.37,
				493.88,
				440,
				0,
				369.99,
				0,
				329.63,
				0
			];
			const playSynthNote = (time, freq) => {
				if (!freq) return;
				const osc = ctx.createOscillator();
				osc.type = "sawtooth";
				osc.frequency.setValueAtTime(freq, time);
				const filter = ctx.createBiquadFilter();
				filter.type = "lowpass";
				filter.frequency.setValueAtTime(2200, time);
				filter.frequency.exponentialRampToValueAtTime(800, time + .15);
				const gain = ctx.createGain();
				gain.gain.setValueAtTime(.18, time);
				gain.gain.exponentialRampToValueAtTime(.001, time + .16);
				osc.connect(filter);
				filter.connect(gain);
				gain.connect(masterGain);
				osc.start(time);
				osc.stop(time + .18);
			};
			// Step Sequencer: 16-step West Coast loop
			const scheduleNextBar = () => {
				if (!isPlayingRef.current) return;
				const now = ctx.currentTime;
				// 808 Kick on steps 0, 6, 8, 14
				if (currentStep === 0 || currentStep === 8) {
					play808(now, 55);
				} else if (currentStep === 6 || currentStep === 14) {
					play808(now, 49);
				}
				// Snare / Clap on beat 2 and 4 (steps 4 and 12)
				if (currentStep === 4 || currentStep === 12) {
					playClap(now);
				}
				// Hi-Hats: 16th notes + roll on step 14, 15
				if (currentStep === 14 || currentStep === 15) {
					playHiHat(now, true);
					playHiHat(now + stepDuration * .5, false);
				} else {
					playHiHat(now, currentStep % 2 === 0);
				}
				// Synth Melody Note
				const note = melodyNotes[currentStep % melodyNotes.length];
				if (note) {
					playSynthNote(now, note);
				}
				currentStep = (currentStep + 1) % 16;
			};
			const intervalMs = stepDuration * 1e3;
			beatTimerRef.current = window.setInterval(scheduleNextBar, intervalMs);
		} catch {}
	};
	const playAudio = () => {
		setShowToast(false);
		setIsPlaying(true);
		isPlayingRef.current = true;
		try {
			localStorage.setItem("vne_vremeni_music_pref", "enabled");
		} catch {}
		// First try HTML5 audio if tyga.mp3 or music.mp3 exists
		if (!audioRef.current) {
			const audio = new Audio("/tyga.mp3");
			audio.loop = true;
			audio.volume = 0;
			audioRef.current = audio;
			audio.play().then(() => {
				let vol = 0;
				if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
				fadeIntervalRef.current = window.setInterval(() => {
					vol += .035;
					if (vol >= .35) {
						audio.volume = .35;
						if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
					} else {
						audio.volume = vol;
					}
				}, 150);
			}).catch(() => {
				// Seamless fallback to procedural Tyga beat
				startTygaBeat();
			});
		} else {
			audioRef.current.play().catch(() => {
				startTygaBeat();
			});
		}
	};
	const pauseAudio = () => {
		setIsPlaying(false);
		isPlayingRef.current = false;
		if (audioRef.current) {
			audioRef.current.pause();
		}
		if (beatTimerRef.current) {
			clearInterval(beatTimerRef.current);
			beatTimerRef.current = null;
		}
		if (audioCtxRef.current) {
			try {
				audioCtxRef.current.close();
			} catch {}
			audioCtxRef.current = null;
		}
	};
	const toggleAudio = () => {
		if (isPlaying) {
			pauseAudio();
		} else {
			playAudio();
		}
	};
	const dismissToast = (e) => {
		e.stopPropagation();
		setShowToast(false);
		setToastDismissed(true);
		try {
			localStorage.setItem("vne_vremeni_music_pref", "dismissed");
		} catch {}
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 flex items-center select-none pointer-events-auto",
		children: [showToast && !isPlaying && /* @__PURE__ */ _jsxDEV("div", {
			onClick: playAudio,
			className: "absolute left-14 bottom-0 bg-black/95 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-2xl border border-white/15 flex items-center gap-3 whitespace-nowrap cursor-pointer transition-all hover:bg-black group",
			role: "status",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ _jsxDEV(Disc3, {
					className: "w-4 h-4 text-[#C8102E] animate-spin",
					style: { animationDuration: "3s" }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 319,
					columnNumber: 13
				}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
					className: "font-bold text-white block",
					children: "Включить бит Tyga"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 321,
					columnNumber: 15
				}, this), /* @__PURE__ */ _jsxDEV("span", {
					className: "text-white/60 text-[10px]",
					children: "West Coast Rap Vibe"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 322,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 320,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 318,
				columnNumber: 11
			}, this), /* @__PURE__ */ _jsxDEV("button", {
				onClick: dismissToast,
				className: "text-white/50 hover:text-white p-1 ml-1",
				"aria-label": "Закрыть подсказку",
				children: /* @__PURE__ */ _jsxDEV(X, { className: "w-3.5 h-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 330,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 325,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 313,
			columnNumber: 9
		}, this), /* @__PURE__ */ _jsxDEV("button", {
			onClick: toggleAudio,
			className: `relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border cursor-pointer group ${isPlaying ? "bg-black text-[#C8102E] border-[#C8102E]/40 ring-2 ring-[#C8102E]/30 scale-105" : "bg-white/95 text-black hover:bg-black hover:text-white border-black/15"}`,
			"aria-label": isPlaying ? "Выключить бит Tyga" : "Включить бит Tyga",
			title: isPlaying ? "Tyga Beat · Играет" : "Включить бит Tyga (West Coast Rap)",
			children: [isPlaying ? /* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-end gap-[2.5px] h-4 w-4 justify-center",
				children: [
					/* @__PURE__ */ _jsxDEV("span", { className: "w-1 bg-[#C8102E] rounded-full animate-eq-1" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 348,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("span", { className: "w-1 bg-white rounded-full animate-eq-2" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 349,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("span", { className: "w-1 bg-[#12306B] rounded-full animate-eq-3" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 350,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("span", { className: "w-1 bg-[#C8102E] rounded-full animate-eq-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 351,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 347,
				columnNumber: 11
			}, this) : /* @__PURE__ */ _jsxDEV(VolumeX, { className: "w-4 h-4 text-black/70 group-hover:text-white" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 354,
				columnNumber: 11
			}, this), /* @__PURE__ */ _jsxDEV("span", {
				className: "absolute -top-1 -right-1 text-[8px] font-black uppercase tracking-tighter px-1 py-0.2 bg-[#C8102E] text-white rounded-full leading-none shadow-sm",
				children: "TYGA"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 358,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 336,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 310,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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STs7OztjQUM1Rix3QkFBQyxPQUFELGFBQ0Usd0JBQUMsUUFBRDtLQUFNLFdBQVU7ZUFBNkI7SUFBdUI7Ozs7Y0FDcEUsd0JBQUMsUUFBRDtLQUFNLFdBQVU7ZUFBNEI7SUFBeUI7Ozs7WUFDbEU7Ozs7WUFDRjs7Ozs7YUFDTCx3QkFBQyxVQUFEO0lBQ0UsU0FBUztJQUNULFdBQVU7SUFDVixjQUFXO2NBRVgsd0JBQUMsR0FBRCxFQUFHLFdBQVUsY0FBZTs7Ozs7R0FDdEI7Ozs7V0FDTDs7Ozs7WUFJUCx3QkFBQyxVQUFEO0dBQ0UsU0FBUztHQUNULFdBQVcsc0lBQ1QsWUFDSSxtRkFDQTtHQUVOLGNBQVksWUFBWSx1QkFBdUI7R0FDL0MsT0FBTyxZQUFZLHVCQUF1QjthQVI1QyxDQVVHLFlBQ0Msd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZjtLQUNFLHdCQUFDLFFBQUQsRUFBTSxXQUFVLDZDQUE4Qzs7Ozs7S0FDOUQsd0JBQUMsUUFBRCxFQUFNLFdBQVUseUNBQTBDOzs7OztLQUMxRCx3QkFBQyxRQUFELEVBQU0sV0FBVSw2Q0FBOEM7Ozs7O0tBQzlELHdCQUFDLFFBQUQsRUFBTSxXQUFVLDZDQUE4Qzs7Ozs7SUFDM0Q7Ozs7O2NBRUwsd0JBQUMsU0FBRCxFQUFTLFdBQVUsK0NBQWdEOzs7O2FBSXJFLHdCQUFDLFFBQUQ7SUFBTSxXQUFVO2NBQW9KO0dBRTlKOzs7O1dBQ0E7Ozs7O1VBQ0w7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkF1ZGlvUGxheWVyLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVm9sdW1lWCwgWCwgRGlzYzMgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgQXVkaW9QbGF5ZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbaXNQbGF5aW5nLCBzZXRJc1BsYXlpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd1RvYXN0LCBzZXRTaG93VG9hc3RdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdG9hc3REaXNtaXNzZWQsIHNldFRvYXN0RGlzbWlzc2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBhdWRpb1JlZiA9IHVzZVJlZjxIVE1MQXVkaW9FbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGF1ZGlvQ3R4UmVmID0gdXNlUmVmPEF1ZGlvQ29udGV4dCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBiZWF0VGltZXJSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGZhZGVJbnRlcnZhbFJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgaXNQbGF5aW5nUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2bmVfdnJlbWVuaV9tdXNpY19wcmVmJyk7XG4gICAgICBpZiAoc2F2ZWQgPT09ICdkaXNtaXNzZWQnKSB7XG4gICAgICAgIHNldFRvYXN0RGlzbWlzc2VkKHRydWUpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge31cblxuICAgIGNvbnN0IHRvYXN0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghdG9hc3REaXNtaXNzZWQgJiYgIWlzUGxheWluZ1JlZi5jdXJyZW50KSB7XG4gICAgICAgIHNldFNob3dUb2FzdCh0cnVlKTtcbiAgICAgIH1cbiAgICB9LCAzNTAwKTtcblxuICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodG9hc3RUaW1lcik7XG4gIH0sIFt0b2FzdERpc21pc3NlZF0pO1xuXG4gIC8vIEhhbmRsZSB2aXNpYmlsaXR5Y2hhbmdlIHRvIHBhdXNlIGF1ZGlvIHdoZW4gdGFiIGlzIGJhY2tncm91bmRlZFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuICYmIGlzUGxheWluZ1JlZi5jdXJyZW50KSB7XG4gICAgICAgIHBhdXNlQXVkaW8oKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBoYW5kbGVWaXNpYmlsaXR5Q2hhbmdlKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIGhhbmRsZVZpc2liaWxpdHlDaGFuZ2UpO1xuICB9LCBbXSk7XG5cbiAgLy8gVHlnYSBXZXN0IENvYXN0IFJhcCBCZWF0IFN5bnRoZXNpemVyIChXZWIgQXVkaW8gQVBJKVxuICAvLyB+OTggQlBNLCBwdW5jaHkgODA4IHN1YiBiYXNzLCBjcmlzcCB0cmFwIGNsYXBzIG9uIDIgJiA0LCBoaS1oYXQgcm9sbHMsIGNhdGNoeSBzeW50aCByaWZmXG4gIGNvbnN0IHN0YXJ0VHlnYUJlYXQgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IEF1ZGlvQ3R4ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIGFueSkud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgY29uc3QgY3R4ID0gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgICBhdWRpb0N0eFJlZi5jdXJyZW50ID0gY3R4O1xuXG4gICAgICBjb25zdCBtYXN0ZXJHYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgIG1hc3RlckdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgIG1hc3RlckdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuXG4gICAgICAvLyBTbW9vdGggZmFkZS1pbiB0byAwLjM1IHZvbHVtZSBvdmVyIDEuNXNcbiAgICAgIG1hc3RlckdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMzUsIGN0eC5jdXJyZW50VGltZSArIDEuNSk7XG5cbiAgICAgIGNvbnN0IGJwbSA9IDk4O1xuICAgICAgY29uc3QgYmVhdER1cmF0aW9uID0gNjAgLyBicG07IC8vIH4wLjYxMnMgcGVyIGJlYXRcbiAgICAgIGNvbnN0IHN0ZXBEdXJhdGlvbiA9IGJlYXREdXJhdGlvbiAvIDQ7IC8vIDE2dGggbm90ZSB+MC4xNTNzXG4gICAgICBsZXQgY3VycmVudFN0ZXAgPSAwO1xuXG4gICAgICAvLyA4MDggS2ljayBUcmlnZ2VyXG4gICAgICBjb25zdCBwbGF5ODA4ID0gKHRpbWU6IG51bWJlciwgZnJlcTogbnVtYmVyID0gNTUpID0+IHtcbiAgICAgICAgY29uc3Qgb3NjID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG5cbiAgICAgICAgLy8gODA4IFBpdGNoIERyb3BcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxICogMi44LCB0aW1lKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKGZyZXEsIHRpbWUgKyAwLjA4KTtcblxuICAgICAgICAvLyBBbXBsaXR1ZGUgRW52ZWxvcGVcbiAgICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuOSwgdGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCB0aW1lICsgMC40NSk7XG5cbiAgICAgICAgLy8gU29mdCBzYXR1cmF0aW9uIGNsaXBwZXJcbiAgICAgICAgY29uc3Qgd2F2ZXNoYXBlciA9IGN0eC5jcmVhdGVXYXZlU2hhcGVyKCk7XG4gICAgICAgIGNvbnN0IGN1cnZlID0gbmV3IEZsb2F0MzJBcnJheSgyNTYpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgeCA9IChpICogMikgLyAyNTYgLSAxO1xuICAgICAgICAgIGN1cnZlW2ldID0gTWF0aC50YW5oKHggKiAxLjUpO1xuICAgICAgICB9XG4gICAgICAgIHdhdmVzaGFwZXIuY3VydmUgPSBjdXJ2ZTtcblxuICAgICAgICBvc2MuY29ubmVjdCh3YXZlc2hhcGVyKTtcbiAgICAgICAgd2F2ZXNoYXBlci5jb25uZWN0KGdhaW4pO1xuICAgICAgICBnYWluLmNvbm5lY3QobWFzdGVyR2Fpbik7XG5cbiAgICAgICAgb3NjLnN0YXJ0KHRpbWUpO1xuICAgICAgICBvc2Muc3RvcCh0aW1lICsgMC40Nik7XG4gICAgICB9O1xuXG4gICAgICAvLyBDcmlzcCA4MDggU25hcmUgLyBDbGFwIFRyaWdnZXJcbiAgICAgIGNvbnN0IHBsYXlDbGFwID0gKHRpbWU6IG51bWJlcikgPT4ge1xuICAgICAgICAvLyBOb2lzZSBidXJzdFxuICAgICAgICBjb25zdCBidWZmZXJTaXplID0gY3R4LnNhbXBsZVJhdGUgKiAwLjE1O1xuICAgICAgICBjb25zdCBub2lzZUJ1ZmZlciA9IGN0eC5jcmVhdGVCdWZmZXIoMSwgYnVmZmVyU2l6ZSwgY3R4LnNhbXBsZVJhdGUpO1xuICAgICAgICBjb25zdCBkYXRhID0gbm9pc2VCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyU2l6ZTsgaSsrKSB7XG4gICAgICAgICAgZGF0YVtpXSA9IChNYXRoLnJhbmRvbSgpICogMiAtIDEpICogTWF0aC5leHAoLWkgLyAoY3R4LnNhbXBsZVJhdGUgKiAwLjA0KSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBub2lzZSA9IGN0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgbm9pc2UuYnVmZmVyID0gbm9pc2VCdWZmZXI7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyID0gY3R4LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuICAgICAgICBmaWx0ZXIudHlwZSA9ICdiYW5kcGFzcyc7XG4gICAgICAgIGZpbHRlci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTQwMCwgdGltZSk7XG4gICAgICAgIGZpbHRlci5RLnNldFZhbHVlQXRUaW1lKDEuOCwgdGltZSk7XG5cbiAgICAgICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjcsIHRpbWUpO1xuICAgICAgICBnYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgdGltZSArIDAuMTQpO1xuXG4gICAgICAgIG5vaXNlLmNvbm5lY3QoZmlsdGVyKTtcbiAgICAgICAgZmlsdGVyLmNvbm5lY3QoZ2Fpbik7XG4gICAgICAgIGdhaW4uY29ubmVjdChtYXN0ZXJHYWluKTtcblxuICAgICAgICBub2lzZS5zdGFydCh0aW1lKTtcblxuICAgICAgICAvLyBTbmFyZSBib2R5IHRvbmUgKDIwMEh6IHBvcClcbiAgICAgICAgY29uc3QgdG9uZU9zYyA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIGNvbnN0IHRvbmVHYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgdG9uZU9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMjIwLCB0aW1lKTtcbiAgICAgICAgdG9uZU9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxMjAsIHRpbWUgKyAwLjA1KTtcbiAgICAgICAgdG9uZUdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjUsIHRpbWUpO1xuICAgICAgICB0b25lR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIHRpbWUgKyAwLjA3KTtcblxuICAgICAgICB0b25lT3NjLmNvbm5lY3QodG9uZUdhaW4pO1xuICAgICAgICB0b25lR2Fpbi5jb25uZWN0KG1hc3RlckdhaW4pO1xuICAgICAgICB0b25lT3NjLnN0YXJ0KHRpbWUpO1xuICAgICAgICB0b25lT3NjLnN0b3AodGltZSArIDAuMDgpO1xuICAgICAgfTtcblxuICAgICAgLy8gQ3Jpc3AgVHJhcCBIaS1IYXQgVHJpZ2dlclxuICAgICAgY29uc3QgcGxheUhpSGF0ID0gKHRpbWU6IG51bWJlciwgaXNBY2NlbnQ6IGJvb2xlYW4gPSBmYWxzZSkgPT4ge1xuICAgICAgICBjb25zdCBidWZmZXJTaXplID0gY3R4LnNhbXBsZVJhdGUgKiAwLjA1O1xuICAgICAgICBjb25zdCBub2lzZUJ1ZmZlciA9IGN0eC5jcmVhdGVCdWZmZXIoMSwgYnVmZmVyU2l6ZSwgY3R4LnNhbXBsZVJhdGUpO1xuICAgICAgICBjb25zdCBkYXRhID0gbm9pc2VCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyU2l6ZTsgaSsrKSB7XG4gICAgICAgICAgZGF0YVtpXSA9IChNYXRoLnJhbmRvbSgpICogMiAtIDEpICogTWF0aC5leHAoLWkgLyAoY3R4LnNhbXBsZVJhdGUgKiAwLjAxMikpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgbm9pc2UgPSBjdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIG5vaXNlLmJ1ZmZlciA9IG5vaXNlQnVmZmVyO1xuXG4gICAgICAgIGNvbnN0IGZpbHRlciA9IGN0eC5jcmVhdGVCaXF1YWRGaWx0ZXIoKTtcbiAgICAgICAgZmlsdGVyLnR5cGUgPSAnaGlnaHBhc3MnO1xuICAgICAgICBmaWx0ZXIuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDc1MDAsIHRpbWUpO1xuXG4gICAgICAgIGNvbnN0IGdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgICBnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoaXNBY2NlbnQgPyAwLjM1IDogMC4xOCwgdGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCB0aW1lICsgMC4wNDUpO1xuXG4gICAgICAgIG5vaXNlLmNvbm5lY3QoZmlsdGVyKTtcbiAgICAgICAgZmlsdGVyLmNvbm5lY3QoZ2Fpbik7XG4gICAgICAgIGdhaW4uY29ubmVjdChtYXN0ZXJHYWluKTtcblxuICAgICAgICBub2lzZS5zdGFydCh0aW1lKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIFdlc3QgQ29hc3QgU3ludGggTGVhZCBNZWxvZHkgKFR5Z2EgQm91bmNlIFZpYmUpXG4gICAgICBjb25zdCBtZWxvZHlOb3RlcyA9IFtcbiAgICAgICAgLy8gMTYgc3RlcHMgcGF0dGVybiBpbiBGIyBtaW5vciAvIEQgbWFqb3IgdmliZVxuICAgICAgICAzNjkuOTksIDAsIDQ0MC4wLCAwLCAzNjkuOTksIDQ0MC4wLCA0OTMuODgsIDAsIC8vIEYjNCwgQTQsIEYjNCwgQTQsIEI0XG4gICAgICAgIDU1NC4zNywgNDkzLjg4LCA0NDAuMCwgMCwgMzY5Ljk5LCAwLCAzMjkuNjMsIDAsIC8vIEMjNSwgQjQsIEE0LCBGIzQsIEU0XG4gICAgICBdO1xuXG4gICAgICBjb25zdCBwbGF5U3ludGhOb3RlID0gKHRpbWU6IG51bWJlciwgZnJlcTogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmICghZnJlcSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBvc2MudHlwZSA9ICdzYXd0b290aCc7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSwgdGltZSk7XG5cbiAgICAgICAgY29uc3QgZmlsdGVyID0gY3R4LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuICAgICAgICBmaWx0ZXIudHlwZSA9ICdsb3dwYXNzJztcbiAgICAgICAgZmlsdGVyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSgyMjAwLCB0aW1lKTtcbiAgICAgICAgZmlsdGVyLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDgwMCwgdGltZSArIDAuMTUpO1xuXG4gICAgICAgIGNvbnN0IGdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgICBnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4xOCwgdGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCB0aW1lICsgMC4xNik7XG5cbiAgICAgICAgb3NjLmNvbm5lY3QoZmlsdGVyKTtcbiAgICAgICAgZmlsdGVyLmNvbm5lY3QoZ2Fpbik7XG4gICAgICAgIGdhaW4uY29ubmVjdChtYXN0ZXJHYWluKTtcblxuICAgICAgICBvc2Muc3RhcnQodGltZSk7XG4gICAgICAgIG9zYy5zdG9wKHRpbWUgKyAwLjE4KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIFN0ZXAgU2VxdWVuY2VyOiAxNi1zdGVwIFdlc3QgQ29hc3QgbG9vcFxuICAgICAgY29uc3Qgc2NoZWR1bGVOZXh0QmFyID0gKCkgPT4ge1xuICAgICAgICBpZiAoIWlzUGxheWluZ1JlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICAgIGNvbnN0IG5vdyA9IGN0eC5jdXJyZW50VGltZTtcblxuICAgICAgICAvLyA4MDggS2ljayBvbiBzdGVwcyAwLCA2LCA4LCAxNFxuICAgICAgICBpZiAoY3VycmVudFN0ZXAgPT09IDAgfHwgY3VycmVudFN0ZXAgPT09IDgpIHtcbiAgICAgICAgICBwbGF5ODA4KG5vdywgNTUpOyAvLyBGIzFcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RlcCA9PT0gNiB8fCBjdXJyZW50U3RlcCA9PT0gMTQpIHtcbiAgICAgICAgICBwbGF5ODA4KG5vdywgNDkpOyAvLyBHMVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU25hcmUgLyBDbGFwIG9uIGJlYXQgMiBhbmQgNCAoc3RlcHMgNCBhbmQgMTIpXG4gICAgICAgIGlmIChjdXJyZW50U3RlcCA9PT0gNCB8fCBjdXJyZW50U3RlcCA9PT0gMTIpIHtcbiAgICAgICAgICBwbGF5Q2xhcChub3cpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSGktSGF0czogMTZ0aCBub3RlcyArIHJvbGwgb24gc3RlcCAxNCwgMTVcbiAgICAgICAgaWYgKGN1cnJlbnRTdGVwID09PSAxNCB8fCBjdXJyZW50U3RlcCA9PT0gMTUpIHtcbiAgICAgICAgICBwbGF5SGlIYXQobm93LCB0cnVlKTtcbiAgICAgICAgICBwbGF5SGlIYXQobm93ICsgc3RlcER1cmF0aW9uICogMC41LCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGxheUhpSGF0KG5vdywgY3VycmVudFN0ZXAgJSAyID09PSAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN5bnRoIE1lbG9keSBOb3RlXG4gICAgICAgIGNvbnN0IG5vdGUgPSBtZWxvZHlOb3Rlc1tjdXJyZW50U3RlcCAlIG1lbG9keU5vdGVzLmxlbmd0aF07XG4gICAgICAgIGlmIChub3RlKSB7XG4gICAgICAgICAgcGxheVN5bnRoTm90ZShub3csIG5vdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudFN0ZXAgPSAoY3VycmVudFN0ZXAgKyAxKSAlIDE2O1xuICAgICAgfTtcblxuICAgICAgY29uc3QgaW50ZXJ2YWxNcyA9IChzdGVwRHVyYXRpb24gKiAxMDAwKTtcbiAgICAgIGJlYXRUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldEludGVydmFsKHNjaGVkdWxlTmV4dEJhciwgaW50ZXJ2YWxNcyk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBBdWRpb0NvbnRleHQgbm90IGFsbG93ZWQgd2l0aG91dCBnZXN0dXJlXG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHBsYXlBdWRpbyA9ICgpID0+IHtcbiAgICBzZXRTaG93VG9hc3QoZmFsc2UpO1xuICAgIHNldElzUGxheWluZyh0cnVlKTtcbiAgICBpc1BsYXlpbmdSZWYuY3VycmVudCA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd2bmVfdnJlbWVuaV9tdXNpY19wcmVmJywgJ2VuYWJsZWQnKTtcbiAgICB9IGNhdGNoIHt9XG5cbiAgICAvLyBGaXJzdCB0cnkgSFRNTDUgYXVkaW8gaWYgdHlnYS5tcDMgb3IgbXVzaWMubXAzIGV4aXN0c1xuICAgIGlmICghYXVkaW9SZWYuY3VycmVudCkge1xuICAgICAgY29uc3QgYXVkaW8gPSBuZXcgQXVkaW8oJy90eWdhLm1wMycpO1xuICAgICAgYXVkaW8ubG9vcCA9IHRydWU7XG4gICAgICBhdWRpby52b2x1bWUgPSAwO1xuICAgICAgYXVkaW9SZWYuY3VycmVudCA9IGF1ZGlvO1xuXG4gICAgICBhdWRpb1xuICAgICAgICAucGxheSgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsZXQgdm9sID0gMDtcbiAgICAgICAgICBpZiAoZmFkZUludGVydmFsUmVmLmN1cnJlbnQpIGNsZWFySW50ZXJ2YWwoZmFkZUludGVydmFsUmVmLmN1cnJlbnQpO1xuICAgICAgICAgIGZhZGVJbnRlcnZhbFJlZi5jdXJyZW50ID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHZvbCArPSAwLjAzNTtcbiAgICAgICAgICAgIGlmICh2b2wgPj0gMC4zNSkge1xuICAgICAgICAgICAgICBhdWRpby52b2x1bWUgPSAwLjM1O1xuICAgICAgICAgICAgICBpZiAoZmFkZUludGVydmFsUmVmLmN1cnJlbnQpIGNsZWFySW50ZXJ2YWwoZmFkZUludGVydmFsUmVmLmN1cnJlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYXVkaW8udm9sdW1lID0gdm9sO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDE1MCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgLy8gU2VhbWxlc3MgZmFsbGJhY2sgdG8gcHJvY2VkdXJhbCBUeWdhIGJlYXRcbiAgICAgICAgICBzdGFydFR5Z2FCZWF0KCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhdWRpb1JlZi5jdXJyZW50LnBsYXkoKS5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHN0YXJ0VHlnYUJlYXQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwYXVzZUF1ZGlvID0gKCkgPT4ge1xuICAgIHNldElzUGxheWluZyhmYWxzZSk7XG4gICAgaXNQbGF5aW5nUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICBpZiAoYXVkaW9SZWYuY3VycmVudCkge1xuICAgICAgYXVkaW9SZWYuY3VycmVudC5wYXVzZSgpO1xuICAgIH1cbiAgICBpZiAoYmVhdFRpbWVyUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoYmVhdFRpbWVyUmVmLmN1cnJlbnQpO1xuICAgICAgYmVhdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoYXVkaW9DdHhSZWYuY3VycmVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXVkaW9DdHhSZWYuY3VycmVudC5jbG9zZSgpO1xuICAgICAgfSBjYXRjaCB7fVxuICAgICAgYXVkaW9DdHhSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZUF1ZGlvID0gKCkgPT4ge1xuICAgIGlmIChpc1BsYXlpbmcpIHtcbiAgICAgIHBhdXNlQXVkaW8oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGxheUF1ZGlvKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGRpc21pc3NUb2FzdCA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzZXRTaG93VG9hc3QoZmFsc2UpO1xuICAgIHNldFRvYXN0RGlzbWlzc2VkKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndm5lX3ZyZW1lbmlfbXVzaWNfcHJlZicsICdkaXNtaXNzZWQnKTtcbiAgICB9IGNhdGNoIHt9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGJvdHRvbS0yMCBsZWZ0LTQgbWQ6Ym90dG9tLTYgbWQ6bGVmdC02IHotNDAgZmxleCBpdGVtcy1jZW50ZXIgc2VsZWN0LW5vbmUgcG9pbnRlci1ldmVudHMtYXV0b1wiPlxuICAgICAgey8qIDQtU2Vjb25kIFRvb2x0aXAgVG9hc3QgKi99XG4gICAgICB7c2hvd1RvYXN0ICYmICFpc1BsYXlpbmcgJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgb25DbGljaz17cGxheUF1ZGlvfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMTQgYm90dG9tLTAgYmctYmxhY2svOTUgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHB4LTQgcHktMi41IHJvdW5kZWQteGwgc2hhZG93LTJ4bCBib3JkZXIgYm9yZGVyLXdoaXRlLzE1IGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHdoaXRlc3BhY2Utbm93cmFwIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsIGhvdmVyOmJnLWJsYWNrIGdyb3VwXCJcbiAgICAgICAgICByb2xlPVwic3RhdHVzXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxEaXNjMyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtWyNDODEwMkVdIGFuaW1hdGUtc3BpblwiIHN0eWxlPXt7IGFuaW1hdGlvbkR1cmF0aW9uOiAnM3MnIH19IC8+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZSBibG9ja1wiPtCS0LrQu9GO0YfQuNGC0Ywg0LHQuNGCIFR5Z2E8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGUvNjAgdGV4dC1bMTBweF1cIj5XZXN0IENvYXN0IFJhcCBWaWJlPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17ZGlzbWlzc1RvYXN0fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC13aGl0ZS81MCBob3Zlcjp0ZXh0LXdoaXRlIHAtMSBtbC0xXCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCLQl9Cw0LrRgNGL0YLRjCDQv9C+0LTRgdC60LDQt9C60YNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogNDRweCBSb3VuZCBFcXVhbGl6ZXIgQnV0dG9uICovfVxuICAgICAgPGJ1dHRvblxuICAgICAgICBvbkNsaWNrPXt0b2dnbGVBdWRpb31cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgdy0xMSBoLTExIHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgc2hhZG93LXhsIGJvcmRlciBjdXJzb3ItcG9pbnRlciBncm91cCAke1xuICAgICAgICAgIGlzUGxheWluZ1xuICAgICAgICAgICAgPyAnYmctYmxhY2sgdGV4dC1bI0M4MTAyRV0gYm9yZGVyLVsjQzgxMDJFXS80MCByaW5nLTIgcmluZy1bI0M4MTAyRV0vMzAgc2NhbGUtMTA1J1xuICAgICAgICAgICAgOiAnYmctd2hpdGUvOTUgdGV4dC1ibGFjayBob3ZlcjpiZy1ibGFjayBob3Zlcjp0ZXh0LXdoaXRlIGJvcmRlci1ibGFjay8xNSdcbiAgICAgICAgfWB9XG4gICAgICAgIGFyaWEtbGFiZWw9e2lzUGxheWluZyA/ICfQktGL0LrQu9GO0YfQuNGC0Ywg0LHQuNGCIFR5Z2EnIDogJ9CS0LrQu9GO0YfQuNGC0Ywg0LHQuNGCIFR5Z2EnfVxuICAgICAgICB0aXRsZT17aXNQbGF5aW5nID8gJ1R5Z2EgQmVhdCDCtyDQmNCz0YDQsNC10YInIDogJ9CS0LrQu9GO0YfQuNGC0Ywg0LHQuNGCIFR5Z2EgKFdlc3QgQ29hc3QgUmFwKSd9XG4gICAgICA+XG4gICAgICAgIHtpc1BsYXlpbmcgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWVuZCBnYXAtWzIuNXB4XSBoLTQgdy00IGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEgYmctWyNDODEwMkVdIHJvdW5kZWQtZnVsbCBhbmltYXRlLWVxLTFcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xIGJnLXdoaXRlIHJvdW5kZWQtZnVsbCBhbmltYXRlLWVxLTJcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xIGJnLVsjMTIzMDZCXSByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1lcS0zXCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMSBiZy1bI0M4MTAyRV0gcm91bmRlZC1mdWxsIGFuaW1hdGUtZXEtNFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPFZvbHVtZVggY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWJsYWNrLzcwIGdyb3VwLWhvdmVyOnRleHQtd2hpdGVcIiAvPlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBTbWFsbCByYXAgYmFkZ2UgKi99XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMSAtcmlnaHQtMSB0ZXh0LVs4cHhdIGZvbnQtYmxhY2sgdXBwZXJjYXNlIHRyYWNraW5nLXRpZ2h0ZXIgcHgtMSBweS0wLjIgYmctWyNDODEwMkVdIHRleHQtd2hpdGUgcm91bmRlZC1mdWxsIGxlYWRpbmctbm9uZSBzaGFkb3ctc21cIj5cbiAgICAgICAgICBUWUdBXG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==