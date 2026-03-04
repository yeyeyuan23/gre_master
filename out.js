// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// src/components/Layout.tsx
import { Outlet, NavLink } from "react-router-dom";

// node_modules/lucide-react/dist/esm/createLucideIcon.js
import { forwardRef as forwardRef2, createElement as createElement2 } from "react";

// node_modules/lucide-react/dist/esm/shared/src/utils.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};

// node_modules/lucide-react/dist/esm/Icon.js
import { forwardRef, createElement } from "react";

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = forwardRef2(
    ({ className, ...props }, ref) => createElement2(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};

// node_modules/lucide-react/dist/esm/icons/book-open.js
var __iconNode = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
var BookOpen = createLucideIcon("book-open", __iconNode);

// node_modules/lucide-react/dist/esm/icons/check.js
var __iconNode2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
var Check = createLucideIcon("check", __iconNode2);

// node_modules/lucide-react/dist/esm/icons/circle-alert.js
var __iconNode3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
var CircleAlert = createLucideIcon("circle-alert", __iconNode3);

// node_modules/lucide-react/dist/esm/icons/circle-check.js
var __iconNode4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
var CircleCheck = createLucideIcon("circle-check", __iconNode4);

// node_modules/lucide-react/dist/esm/icons/layers.js
var __iconNode5 = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
];
var Layers = createLucideIcon("layers", __iconNode5);

// node_modules/lucide-react/dist/esm/icons/layout-list.js
var __iconNode6 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
  ["path", { d: "M14 4h7", key: "3xa0d5" }],
  ["path", { d: "M14 9h7", key: "1icrd9" }],
  ["path", { d: "M14 15h7", key: "1mj8o2" }],
  ["path", { d: "M14 20h7", key: "11slyb" }]
];
var LayoutList = createLucideIcon("layout-list", __iconNode6);

// node_modules/lucide-react/dist/esm/icons/loader-circle.js
var __iconNode7 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
var LoaderCircle = createLucideIcon("loader-circle", __iconNode7);

// node_modules/lucide-react/dist/esm/icons/pen-tool.js
var __iconNode8 = [
  [
    "path",
    {
      d: "M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z",
      key: "nt11vn"
    }
  ],
  [
    "path",
    {
      d: "m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18",
      key: "15qc1e"
    }
  ],
  ["path", { d: "m2.3 2.3 7.286 7.286", key: "1wuzzi" }],
  ["circle", { cx: "11", cy: "11", r: "2", key: "xmgehs" }]
];
var PenTool = createLucideIcon("pen-tool", __iconNode8);

// node_modules/lucide-react/dist/esm/icons/play.js
var __iconNode9 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
var Play = createLucideIcon("play", __iconNode9);

// node_modules/lucide-react/dist/esm/icons/quote.js
var __iconNode10 = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
];
var Quote = createLucideIcon("quote", __iconNode10);

// node_modules/lucide-react/dist/esm/icons/refresh-cw.js
var __iconNode11 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
var RefreshCw = createLucideIcon("refresh-cw", __iconNode11);

// node_modules/lucide-react/dist/esm/icons/search.js
var __iconNode12 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
var Search = createLucideIcon("search", __iconNode12);

// node_modules/lucide-react/dist/esm/icons/sparkles.js
var __iconNode13 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
var Sparkles = createLucideIcon("sparkles", __iconNode13);

// node_modules/lucide-react/dist/esm/icons/star.js
var __iconNode14 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
var Star = createLucideIcon("star", __iconNode14);

// node_modules/lucide-react/dist/esm/icons/trash-2.js
var __iconNode15 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
var Trash2 = createLucideIcon("trash-2", __iconNode15);

// node_modules/lucide-react/dist/esm/icons/volume-2.js
var __iconNode16 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
var Volume2 = createLucideIcon("volume-2", __iconNode16);

// node_modules/lucide-react/dist/esm/icons/x.js
var __iconNode17 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
var X = createLucideIcon("x", __iconNode17);

// src/components/Layout.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Layout() {
  return /* @__PURE__ */ jsxs("div", { className: "flex h-screen bg-stone-50 text-stone-900", children: [
    /* @__PURE__ */ jsxs("aside", { className: "w-64 bg-white border-r border-stone-200 flex flex-col", children: [
      /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-indigo-900", children: "GRE Master" }) }),
      /* @__PURE__ */ jsxs("nav", { className: "flex-1 px-4 space-y-2", children: [
        /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: "/",
            className: ({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-stone-600 hover:bg-stone-100"}`,
            children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "w-5 h-5" }),
              "Vocabulary Search"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: "/flashcards",
            className: ({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-stone-600 hover:bg-stone-100"}`,
            children: [
              /* @__PURE__ */ jsx(Layers, { className: "w-5 h-5" }),
              "Flashcards"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          NavLink,
          {
            to: "/essay",
            className: ({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? "bg-indigo-50 text-indigo-700 font-medium" : "text-stone-600 hover:bg-stone-100"}`,
            children: [
              /* @__PURE__ */ jsx(PenTool, { className: "w-5 h-5" }),
              "Essay Grader"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-auto", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}

// src/pages/VocabularySearch.tsx
import { useState } from "react";

// src/services/geminiService.ts
import { GoogleGenAI, Type } from "@google/genai";
var ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function lookupWord(word) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Provide detailed information for the GRE vocabulary word: "${word}". Ensure the usage is accurate and reflects native speaker habits.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          word: { type: Type.STRING },
          pronunciation: { type: Type.STRING, description: "IPA pronunciation" },
          chineseMeaning: { type: Type.STRING },
          englishMeaning: { type: Type.STRING },
          collocations: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Common fixed collocations or phrases"
          },
          sentences: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                english: { type: Type.STRING },
                chinese: { type: Type.STRING }
              },
              required: ["english", "chinese"]
            },
            description: "Example sentences demonstrating accurate usage"
          }
        },
        required: ["word", "pronunciation", "chineseMeaning", "englishMeaning", "collocations", "sentences"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
}
async function gradeEssay(prompt, essay) {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `
      Act as an expert GRE essay grader. Grade the following essay based on the latest GRE official grading criteria.
      The user's goal is a score of 4.0 or higher.
      
      Prompt:
      ${prompt}

      Essay:
      ${essay}

      Provide a strict evaluation. Crucially, break down the user's essay sentence by sentence (or logical chunk by chunk). 
      For each sentence, provide:
      1. The original text.
      2. A detailed critique pointing out any spelling, grammar, vocabulary, or logic errors. If it's perfect, explain why it works well.
      3. A high-scoring revised version of that specific sentence that elevates the vocabulary and structure.

      Then, provide a fully revised version of the entire essay that maintains the user's original thought process but elevates the vocabulary, examples, and argumentation methods to achieve a 4.0+ score.
      Finally, summarize the key mistakes made and the additions/improvements provided into concise bullet points for easy review.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER, description: "Score from 0.0 to 6.0 in 0.5 increments" },
          sentenceReviews: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING, description: "The original sentence from the user's essay" },
                critique: { type: Type.STRING, description: "Detailed critique of errors or areas for improvement" },
                revised: { type: Type.STRING, description: "A high-scoring revised version of the sentence" }
              },
              required: ["original", "critique", "revised"]
            },
            description: "Sentence-by-sentence breakdown and revision"
          },
          revisedEssay: { type: Type.STRING, description: "The fully revised essay" },
          summary: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Bullet points summarizing mistakes and improvements" }
        },
        required: ["score", "sentenceReviews", "revisedEssay", "summary"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
}

// src/store/useStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
var useStore = create()(
  persist(
    (set) => ({
      favorites: {},
      addFavorite: (wordData) => set((state) => ({
        favorites: { ...state.favorites, [wordData.word]: { ...wordData, weight: 0 } }
      })),
      removeFavorite: (word) => set((state) => {
        const newFavs = { ...state.favorites };
        delete newFavs[word];
        return { favorites: newFavs };
      }),
      updateWeight: (word, delta) => set((state) => ({
        favorites: {
          ...state.favorites,
          [word]: { ...state.favorites[word], weight: state.favorites[word].weight + delta }
        }
      }))
    }),
    { name: "gre-store" }
  )
);

// src/pages/VocabularySearch.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function VocabularySearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { favorites, addFavorite, removeFavorite } = useStore();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await lookupWord(query.trim());
      setResult(data);
    } catch (err) {
      setError("Failed to fetch word details. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const isFavorite = result ? !!favorites[result.word] : false;
  const toggleFavorite = () => {
    if (!result) return;
    if (isFavorite) {
      removeFavorite(result.word);
    } else {
      addFavorite(result);
    }
  };
  const playAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };
  return /* @__PURE__ */ jsxs2("div", { className: "max-w-4xl mx-auto p-8", children: [
    /* @__PURE__ */ jsxs2("header", { className: "mb-10", children: [
      /* @__PURE__ */ jsx2("h1", { className: "text-4xl font-bold tracking-tight text-stone-900 mb-2", children: "Vocabulary Search" }),
      /* @__PURE__ */ jsx2("p", { className: "text-stone-500 text-lg", children: "Master GRE vocabulary with deep context and native usage." })
    ] }),
    /* @__PURE__ */ jsx2("form", { onSubmit: handleSearch, className: "relative mb-12", children: /* @__PURE__ */ jsxs2("div", { className: "relative flex items-center", children: [
      /* @__PURE__ */ jsx2(Search, { className: "absolute left-4 w-6 h-6 text-stone-400" }),
      /* @__PURE__ */ jsx2(
        "input",
        {
          type: "text",
          value: query,
          onChange: (e) => setQuery(e.target.value),
          placeholder: "Search for a word (e.g., ephemeral)...",
          className: "w-full pl-14 pr-32 py-4 bg-white border border-stone-200 rounded-2xl shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        }
      ),
      /* @__PURE__ */ jsx2(
        "button",
        {
          type: "submit",
          disabled: loading || !query.trim(),
          className: "absolute right-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2",
          children: loading ? /* @__PURE__ */ jsx2(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : "Search"
        }
      )
    ] }) }),
    error && /* @__PURE__ */ jsx2("div", { className: "p-4 bg-red-50 text-red-700 rounded-xl mb-8", children: error }),
    result && /* @__PURE__ */ jsxs2("div", { className: "bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500", children: [
      /* @__PURE__ */ jsxs2("div", { className: "p-8 border-b border-stone-100 flex justify-between items-start", children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-4 mb-2", children: [
            /* @__PURE__ */ jsx2("h2", { className: "text-4xl font-bold text-stone-900", children: result.word }),
            /* @__PURE__ */ jsx2(
              "button",
              {
                onClick: () => playAudio(result.word),
                className: "p-2 text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors",
                title: "Listen to pronunciation",
                children: /* @__PURE__ */ jsx2(Volume2, { className: "w-6 h-6" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx2("p", { className: "text-xl font-mono text-stone-500", children: result.pronunciation })
        ] }),
        /* @__PURE__ */ jsx2(
          "button",
          {
            onClick: toggleFavorite,
            className: `flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${isFavorite ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"}`,
            children: isFavorite ? /* @__PURE__ */ jsxs2(Fragment, { children: [
              /* @__PURE__ */ jsx2(Check, { className: "w-5 h-5" }),
              "Saved"
            ] }) : /* @__PURE__ */ jsxs2(Fragment, { children: [
              /* @__PURE__ */ jsx2(Star, { className: "w-5 h-5" }),
              "Save Word"
            ] })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "p-8 grid grid-cols-1 md:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs2("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs2("section", { children: [
            /* @__PURE__ */ jsx2("h3", { className: "text-sm font-bold tracking-wider text-stone-400 uppercase mb-3", children: "Chinese Meaning" }),
            /* @__PURE__ */ jsx2("p", { className: "text-lg text-stone-800", children: result.chineseMeaning })
          ] }),
          /* @__PURE__ */ jsxs2("section", { children: [
            /* @__PURE__ */ jsx2("h3", { className: "text-sm font-bold tracking-wider text-stone-400 uppercase mb-3", children: "English Meaning" }),
            /* @__PURE__ */ jsx2("p", { className: "text-lg text-stone-800 leading-relaxed", children: result.englishMeaning })
          ] }),
          /* @__PURE__ */ jsxs2("section", { children: [
            /* @__PURE__ */ jsx2("h3", { className: "text-sm font-bold tracking-wider text-stone-400 uppercase mb-3", children: "Collocations" }),
            /* @__PURE__ */ jsx2("ul", { className: "space-y-2", children: (result.collocations || []).map((col, idx) => /* @__PURE__ */ jsxs2("li", { className: "flex items-center gap-2 text-stone-700 bg-stone-50 px-3 py-2 rounded-lg", children: [
              /* @__PURE__ */ jsx2("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-400" }),
              col
            ] }, idx)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx2("h3", { className: "text-sm font-bold tracking-wider text-stone-400 uppercase mb-3", children: "Example Sentences" }),
          (result.sentences || []).map((sent, idx) => /* @__PURE__ */ jsxs2("div", { className: "p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50", children: [
            /* @__PURE__ */ jsx2("p", { className: "text-stone-900 font-medium leading-relaxed mb-2", children: sent.english }),
            /* @__PURE__ */ jsx2("p", { className: "text-stone-500 text-sm", children: sent.chinese })
          ] }, idx))
        ] })
      ] })
    ] })
  ] });
}

// src/pages/Flashcards.tsx
import { useState as useState2, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function Flashcards() {
  const { favorites, updateWeight, removeFavorite } = useStore();
  const [deck, setDeck] = useState2([]);
  const [currentIndex, setCurrentIndex] = useState2(0);
  const [isFlipped, setIsFlipped] = useState2(false);
  const [isReviewing, setIsReviewing] = useState2(false);
  useEffect(() => {
    const words = Object.values(favorites);
    words.sort((a, b) => b.weight - a.weight);
    setDeck(words);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [favorites, isReviewing]);
  const currentWord = deck[currentIndex];
  const handleSwipe = (direction) => {
    if (!currentWord) return;
    if (direction === "left") {
      updateWeight(currentWord.word, 1);
    } else {
      updateWeight(currentWord.word, -1);
    }
    setIsFlipped(false);
    setCurrentIndex((prev) => prev + 1);
  };
  const playAudio = (e, text) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };
  if (deck.length === 0) {
    return /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center justify-center h-full p-8 text-center", children: [
      /* @__PURE__ */ jsx3("div", { className: "w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx3(RefreshCw, { className: "w-10 h-10 text-stone-400" }) }),
      /* @__PURE__ */ jsx3("h2", { className: "text-2xl font-bold text-stone-900 mb-2", children: "No words to review" }),
      /* @__PURE__ */ jsx3("p", { className: "text-stone-500 max-w-md", children: "Go to the Vocabulary Search page and save some words to start reviewing." })
    ] });
  }
  if (!isReviewing) {
    return /* @__PURE__ */ jsxs3("div", { className: "max-w-4xl mx-auto p-8", children: [
      /* @__PURE__ */ jsxs3("header", { className: "mb-10 flex justify-between items-end", children: [
        /* @__PURE__ */ jsxs3("div", { children: [
          /* @__PURE__ */ jsx3("h1", { className: "text-4xl font-bold tracking-tight text-stone-900 mb-2", children: "Saved Words" }),
          /* @__PURE__ */ jsxs3("p", { className: "text-stone-500 text-lg", children: [
            "You have ",
            deck.length,
            " words in your collection."
          ] })
        ] }),
        /* @__PURE__ */ jsxs3(
          "button",
          {
            onClick: () => setIsReviewing(true),
            className: "px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2 shadow-sm",
            children: [
              /* @__PURE__ */ jsx3(Play, { className: "w-5 h-5" }),
              "Start Review"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden", children: [
        /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-12 gap-4 p-4 border-b border-stone-100 bg-stone-50 text-xs font-bold tracking-wider text-stone-400 uppercase", children: [
          /* @__PURE__ */ jsx3("div", { className: "col-span-3 pl-4", children: "Word" }),
          /* @__PURE__ */ jsx3("div", { className: "col-span-4", children: "Meaning" }),
          /* @__PURE__ */ jsx3("div", { className: "col-span-3", children: "Weight" }),
          /* @__PURE__ */ jsx3("div", { className: "col-span-2 text-right pr-4", children: "Actions" })
        ] }),
        /* @__PURE__ */ jsx3("div", { className: "divide-y divide-stone-100", children: deck.map((word) => /* @__PURE__ */ jsxs3("div", { className: "grid grid-cols-12 gap-4 p-4 items-center hover:bg-stone-50 transition-colors", children: [
          /* @__PURE__ */ jsx3("div", { className: "col-span-3 pl-4", children: /* @__PURE__ */ jsx3("span", { className: "font-bold text-stone-900 text-lg", children: word.word }) }),
          /* @__PURE__ */ jsx3("div", { className: "col-span-4 text-stone-600 truncate pr-4", children: word.chineseMeaning }),
          /* @__PURE__ */ jsx3("div", { className: "col-span-3", children: /* @__PURE__ */ jsxs3("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${word.weight > 0 ? "bg-red-100 text-red-800" : word.weight < 0 ? "bg-green-100 text-green-800" : "bg-stone-100 text-stone-800"}`, children: [
            word.weight > 0 ? "+" : "",
            word.weight
          ] }) }),
          /* @__PURE__ */ jsx3("div", { className: "col-span-2 text-right pr-4", children: /* @__PURE__ */ jsx3(
            "button",
            {
              onClick: () => removeFavorite(word.word),
              className: "p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors",
              title: "Remove from saved",
              children: /* @__PURE__ */ jsx3(Trash2, { className: "w-5 h-5" })
            }
          ) })
        ] }, word.word)) })
      ] })
    ] });
  }
  if (currentIndex >= deck.length) {
    return /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center justify-center h-full p-8 text-center animate-in fade-in duration-500", children: [
      /* @__PURE__ */ jsx3("div", { className: "w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6", children: /* @__PURE__ */ jsx3(Check, { className: "w-10 h-10 text-green-600" }) }),
      /* @__PURE__ */ jsx3("h2", { className: "text-3xl font-bold text-stone-900 mb-2", children: "Review Complete!" }),
      /* @__PURE__ */ jsx3("p", { className: "text-stone-500 mb-8", children: "You've gone through all your saved words." }),
      /* @__PURE__ */ jsxs3("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: () => setIsReviewing(false),
            className: "px-8 py-3 bg-white border border-stone-200 text-stone-700 font-medium rounded-xl hover:bg-stone-50 transition-colors",
            children: "Back to List"
          }
        ),
        /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: () => {
              const words = Object.values(favorites).sort((a, b) => b.weight - a.weight);
              setDeck(words);
              setCurrentIndex(0);
            },
            className: "px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors",
            children: "Review Again"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center justify-center h-full p-8 bg-stone-50 overflow-hidden relative", children: [
    /* @__PURE__ */ jsxs3("div", { className: "absolute top-8 left-8 right-8 flex justify-between items-center text-stone-500 font-medium", children: [
      /* @__PURE__ */ jsxs3(
        "button",
        {
          onClick: () => setIsReviewing(false),
          className: "hover:text-stone-900 transition-colors flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsx3(X, { className: "w-5 h-5" }),
            " Exit Review"
          ]
        }
      ),
      /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxs3("span", { children: [
          "Reviewing ",
          currentIndex + 1,
          " of ",
          deck.length
        ] }),
        /* @__PURE__ */ jsxs3("span", { className: "bg-stone-200 px-3 py-1 rounded-full text-sm", children: [
          "Weight: ",
          currentWord.weight
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { className: "relative w-full max-w-md aspect-[3/4] perspective-1000", children: /* @__PURE__ */ jsx3(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsx3(
      Flashcard,
      {
        word: currentWord,
        isFlipped,
        setIsFlipped,
        onSwipe: handleSwipe,
        playAudio
      },
      currentWord.word
    ) }) }),
    /* @__PURE__ */ jsxs3("div", { className: "mt-12 flex items-center gap-12", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: () => handleSwipe("left"),
            className: "w-16 h-16 rounded-full bg-white border-2 border-red-100 text-red-500 flex items-center justify-center hover:bg-red-50 hover:scale-105 transition-all shadow-sm",
            children: /* @__PURE__ */ jsx3(X, { className: "w-8 h-8" })
          }
        ),
        /* @__PURE__ */ jsx3("span", { className: "text-sm font-medium text-stone-400 uppercase tracking-wider", children: "Didn't Know" })
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: () => handleSwipe("right"),
            className: "w-16 h-16 rounded-full bg-white border-2 border-green-100 text-green-500 flex items-center justify-center hover:bg-green-50 hover:scale-105 transition-all shadow-sm",
            children: /* @__PURE__ */ jsx3(Check, { className: "w-8 h-8" })
          }
        ),
        /* @__PURE__ */ jsx3("span", { className: "text-sm font-medium text-stone-400 uppercase tracking-wider", children: "Knew It" })
      ] })
    ] })
  ] });
}
function Flashcard({ word, isFlipped, setIsFlipped, onSwipe, playAudio }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
  const handleDragEnd = (e, info) => {
    if (info.offset.x > 100) {
      onSwipe("right");
    } else if (info.offset.x < -100) {
      onSwipe("left");
    }
  };
  return /* @__PURE__ */ jsx3(
    motion.div,
    {
      drag: "x",
      dragConstraints: { left: 0, right: 0 },
      onDragEnd: handleDragEnd,
      style: { x, rotate, opacity },
      animate: { scale: 1, y: 0 },
      initial: { scale: 0.9, y: 50 },
      exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
      className: "absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing",
      children: /* @__PURE__ */ jsxs3(
        motion.div,
        {
          className: "w-full h-full relative preserve-3d",
          animate: { rotateY: isFlipped ? 180 : 0 },
          transition: { type: "spring", stiffness: 260, damping: 20 },
          onClick: () => setIsFlipped(!isFlipped),
          children: [
            /* @__PURE__ */ jsxs3("div", { className: "absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border border-stone-100 flex flex-col items-center justify-center p-8 text-center", children: [
              /* @__PURE__ */ jsx3("h2", { className: "text-5xl font-bold text-stone-900 mb-6", children: word.word }),
              /* @__PURE__ */ jsx3("p", { className: "text-stone-400 text-sm uppercase tracking-widest", children: "Tap to flip" })
            ] }),
            /* @__PURE__ */ jsxs3(
              "div",
              {
                className: "absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border border-stone-100 p-8 overflow-y-auto",
                style: { transform: "rotateY(180deg)" },
                children: [
                  /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-start mb-6 pb-6 border-b border-stone-100", children: [
                    /* @__PURE__ */ jsxs3("div", { children: [
                      /* @__PURE__ */ jsx3("h2", { className: "text-3xl font-bold text-stone-900 mb-2", children: word.word }),
                      /* @__PURE__ */ jsx3("p", { className: "text-lg font-mono text-stone-500", children: word.pronunciation })
                    ] }),
                    /* @__PURE__ */ jsx3(
                      "button",
                      {
                        onClick: (e) => playAudio(e, word.word),
                        className: "p-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors",
                        children: /* @__PURE__ */ jsx3(Volume2, { className: "w-6 h-6" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs3("div", { className: "space-y-6", children: [
                    /* @__PURE__ */ jsxs3("div", { children: [
                      /* @__PURE__ */ jsx3("h3", { className: "text-xs font-bold tracking-wider text-stone-400 uppercase mb-2", children: "Chinese" }),
                      /* @__PURE__ */ jsx3("p", { className: "text-lg text-stone-800 font-medium", children: word.chineseMeaning })
                    ] }),
                    /* @__PURE__ */ jsxs3("div", { children: [
                      /* @__PURE__ */ jsx3("h3", { className: "text-xs font-bold tracking-wider text-stone-400 uppercase mb-2", children: "English" }),
                      /* @__PURE__ */ jsx3("p", { className: "text-stone-700 leading-relaxed", children: word.englishMeaning })
                    ] }),
                    /* @__PURE__ */ jsxs3("div", { children: [
                      /* @__PURE__ */ jsx3("h3", { className: "text-xs font-bold tracking-wider text-stone-400 uppercase mb-2", children: "Collocations" }),
                      /* @__PURE__ */ jsx3("ul", { className: "space-y-1", children: (word.collocations || []).slice(0, 3).map((col, idx) => /* @__PURE__ */ jsx3("li", { className: "text-stone-600 text-sm bg-stone-50 px-2 py-1 rounded inline-block mr-2 mb-2", children: col }, idx)) })
                    ] })
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}

// src/pages/EssayGrader.tsx
import { useState as useState3 } from "react";
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function EssayGrader() {
  const [prompt, setPrompt] = useState3("");
  const [essay, setEssay] = useState3("");
  const [loading, setLoading] = useState3(false);
  const [feedback, setFeedback] = useState3(null);
  const [error, setError] = useState3("");
  const handleGrade = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || !essay.trim()) return;
    setLoading(true);
    setError("");
    setFeedback(null);
    try {
      const result = await gradeEssay(prompt.trim(), essay.trim());
      setFeedback(result);
    } catch (err) {
      setError("Failed to grade essay. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs4("div", { className: "max-w-4xl mx-auto p-8", children: [
    /* @__PURE__ */ jsxs4("header", { className: "mb-10", children: [
      /* @__PURE__ */ jsx4("h1", { className: "text-4xl font-bold tracking-tight text-stone-900 mb-2", children: "Essay Grader" }),
      /* @__PURE__ */ jsx4("p", { className: "text-stone-500 text-lg", children: "Get strict, official-style grading and 4.0+ level revisions." })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "space-y-12", children: [
      /* @__PURE__ */ jsxs4("div", { className: "bg-white p-8 rounded-3xl shadow-sm border border-stone-200", children: [
        /* @__PURE__ */ jsxs4("form", { onSubmit: handleGrade, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsx4("label", { htmlFor: "prompt", className: "block text-sm font-bold tracking-wider text-stone-400 uppercase mb-3", children: "Essay Prompt" }),
            /* @__PURE__ */ jsx4(
              "textarea",
              {
                id: "prompt",
                value: prompt,
                onChange: (e) => setPrompt(e.target.value),
                placeholder: "Paste the GRE writing prompt here...",
                className: "w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[120px] resize-y",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsx4("label", { htmlFor: "essay", className: "block text-sm font-bold tracking-wider text-stone-400 uppercase mb-3", children: "Your Essay" }),
            /* @__PURE__ */ jsx4(
              "textarea",
              {
                id: "essay",
                value: essay,
                onChange: (e) => setEssay(e.target.value),
                placeholder: "Paste your essay here...",
                className: "w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[300px] resize-y",
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx4(
            "button",
            {
              type: "submit",
              disabled: loading || !prompt.trim() || !essay.trim(),
              className: "w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-colors disabled:opacity-50 flex items-center justify-center gap-3 text-lg shadow-sm",
              children: loading ? /* @__PURE__ */ jsxs4(Fragment2, { children: [
                /* @__PURE__ */ jsx4(LoaderCircle, { className: "w-6 h-6 animate-spin" }),
                "Grading..."
              ] }) : /* @__PURE__ */ jsxs4(Fragment2, { children: [
                /* @__PURE__ */ jsx4(PenTool, { className: "w-6 h-6" }),
                "Grade My Essay"
              ] })
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxs4("div", { className: "mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3", children: [
          /* @__PURE__ */ jsx4(CircleAlert, { className: "w-5 h-5 flex-shrink-0" }),
          error
        ] })
      ] }),
      (feedback || loading) && /* @__PURE__ */ jsx4("div", { className: "space-y-12", children: loading ? /* @__PURE__ */ jsxs4("div", { className: "flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-stone-200 rounded-3xl bg-stone-50/50 animate-pulse", children: [
        /* @__PURE__ */ jsx4(LoaderCircle, { className: "w-16 h-16 text-indigo-400 mb-6 animate-spin" }),
        /* @__PURE__ */ jsx4("h3", { className: "text-xl font-bold text-stone-900 mb-2", children: "Grading your essay..." }),
        /* @__PURE__ */ jsx4("p", { className: "text-stone-500 max-w-sm", children: "Our AI is analyzing your essay sentence by sentence. This might take a few seconds." })
      ] }) : feedback ? /* @__PURE__ */ jsxs4("div", { className: "animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-12", children: [
        /* @__PURE__ */ jsxs4("div", { className: "bg-white rounded-3xl shadow-sm border border-stone-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6", children: [
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsx4("h2", { className: "text-sm font-bold tracking-wider text-stone-400 uppercase mb-2", children: "Estimated Score" }),
            /* @__PURE__ */ jsx4("p", { className: "text-stone-500", children: "Based on official GRE criteria" })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "text-7xl font-bold text-indigo-600 tracking-tighter", children: [
            feedback.score?.toFixed(1) || "0.0",
            /* @__PURE__ */ jsx4("span", { className: "text-3xl text-stone-300 ml-1", children: "/6.0" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "bg-indigo-50 rounded-3xl border border-indigo-100 p-8", children: [
          /* @__PURE__ */ jsxs4("h3", { className: "text-xl font-bold text-indigo-900 flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsx4(CircleCheck, { className: "w-6 h-6 text-indigo-600" }),
            "Key Takeaways"
          ] }),
          /* @__PURE__ */ jsx4("ul", { className: "space-y-3", children: (feedback.summary || []).map((point, idx) => /* @__PURE__ */ jsxs4("li", { className: "flex items-start gap-3 text-indigo-800", children: [
            /* @__PURE__ */ jsx4("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" }),
            /* @__PURE__ */ jsx4("span", { className: "leading-relaxed", children: point })
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs4("h3", { className: "text-2xl font-bold text-stone-900 flex items-center gap-3 pb-2", children: [
            /* @__PURE__ */ jsx4(LayoutList, { className: "w-6 h-6 text-indigo-500" }),
            "Sentence-by-Sentence Analysis"
          ] }),
          /* @__PURE__ */ jsx4("div", { className: "space-y-8", children: (feedback.sentenceReviews || []).map((review, idx) => /* @__PURE__ */ jsxs4("div", { className: "bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden", children: [
            /* @__PURE__ */ jsx4("div", { className: "p-6 border-b border-stone-100 bg-stone-50/50", children: /* @__PURE__ */ jsxs4("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx4(Quote, { className: "w-5 h-5 text-stone-400 flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsx4("p", { className: "text-stone-800 text-lg leading-relaxed", children: review.original })
            ] }) }),
            /* @__PURE__ */ jsx4("div", { className: "p-6 border-b border-stone-100", children: /* @__PURE__ */ jsxs4("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx4(CircleAlert, { className: "w-5 h-5 text-amber-500 flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("h4", { className: "text-xs font-bold tracking-wider text-stone-400 uppercase mb-2", children: "Critique" }),
                /* @__PURE__ */ jsx4("p", { className: "text-stone-600 leading-relaxed", children: review.critique })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx4("div", { className: "p-6 bg-indigo-50/30", children: /* @__PURE__ */ jsxs4("div", { className: "flex gap-4", children: [
              /* @__PURE__ */ jsx4(Sparkles, { className: "w-5 h-5 text-indigo-500 flex-shrink-0 mt-1" }),
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("h4", { className: "text-xs font-bold tracking-wider text-indigo-400 uppercase mb-2", children: "Revised Version" }),
                /* @__PURE__ */ jsx4("p", { className: "text-indigo-900 font-medium leading-relaxed", children: review.revised })
              ] })
            ] }) })
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "bg-white rounded-3xl shadow-sm border border-stone-200 p-8", children: [
          /* @__PURE__ */ jsxs4("h3", { className: "text-2xl font-bold text-stone-900 flex items-center gap-3 border-b border-stone-100 pb-4 mb-6", children: [
            /* @__PURE__ */ jsx4(BookOpen, { className: "w-6 h-6 text-indigo-500" }),
            "Full 4.0+ Level Revision"
          ] }),
          /* @__PURE__ */ jsx4("div", { className: "prose prose-stone max-w-none", children: (feedback.revisedEssay || "").split("\n").map((paragraph, idx) => /* @__PURE__ */ jsx4("p", { className: "text-stone-700 leading-relaxed mb-4", children: paragraph }, idx)) })
        ] })
      ] }) : null })
    ] })
  ] });
}

// src/App.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function App() {
  return /* @__PURE__ */ jsx5(BrowserRouter, { children: /* @__PURE__ */ jsx5(Routes, { children: /* @__PURE__ */ jsxs5(Route, { path: "/", element: /* @__PURE__ */ jsx5(Layout, {}), children: [
    /* @__PURE__ */ jsx5(Route, { index: true, element: /* @__PURE__ */ jsx5(VocabularySearch, {}) }),
    /* @__PURE__ */ jsx5(Route, { path: "flashcards", element: /* @__PURE__ */ jsx5(Flashcards, {}) }),
    /* @__PURE__ */ jsx5(Route, { path: "essay", element: /* @__PURE__ */ jsx5(EssayGrader, {}) })
  ] }) }) });
}

// src/main.tsx
import "./index.css";
import { jsx as jsx6 } from "react/jsx-runtime";
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx6(StrictMode, { children: /* @__PURE__ */ jsx6(App, {}) })
);
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/book-open.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/circle-alert.js:
lucide-react/dist/esm/icons/circle-check.js:
lucide-react/dist/esm/icons/layers.js:
lucide-react/dist/esm/icons/layout-list.js:
lucide-react/dist/esm/icons/loader-circle.js:
lucide-react/dist/esm/icons/pen-tool.js:
lucide-react/dist/esm/icons/play.js:
lucide-react/dist/esm/icons/quote.js:
lucide-react/dist/esm/icons/refresh-cw.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/star.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/icons/volume-2.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.546.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
