# FindConnect Design System & UI Principles 🎨

This document defines the core visual design principles, color tokens, dark/light mode balance, component patterns, and micro-interaction standards for FindConnect. Use these guidelines whenever creating or refactoring UI components.

---

## 🌗 1. Theme Balance & Color Tokens

FindConnect supports dual theme mode (`light` and `dark`) managed by `ThemeContext`. Always consume `ThemeContext` or use explicit theme branching (`isDark ? ... : ...`) for total visual consistency.

| Element | Light Mode (`isDark: false`) | Dark Mode (`isDark: true`) |
| :--- | :--- | :--- |
| **Page Background** | `bg-slate-50/80` | `bg-gray-900` |
| **Card / Surface Background** | `bg-white` | `bg-gray-800/90` |
| **Card Border** | `border-gray-200/80` | `border-gray-700/80` |
| **Primary Text** | `text-gray-900` | `text-white` |
| **Secondary Text** | `text-gray-600` | `text-gray-300` |
| **Muted Text** | `text-gray-400` | `text-gray-500` |
| **Accent Primary** | `from-purple-600 to-indigo-600` | `from-purple-500 to-indigo-500` |
| **Accent Soft Box** | `bg-purple-50/80 border-purple-200/80` | `bg-purple-950/30 border-purple-900/50` |
| **Shadows** | `shadow-slate-200/60 shadow-lg` | `shadow-black/50 shadow-xl` |

---

## ✨ 2. Visual Effects & Glassmorphism

- **Gradients**: Use soft two-tone gradients for section headers, accent buttons, and badges (e.g. `bg-gradient-to-r from-purple-600 to-indigo-600`).
- **Glassmorphism**: Use `backdrop-blur-md bg-white/80` (Light) or `backdrop-blur-md bg-gray-900/80` (Dark) for floating navbars, sticky headers, and modals.
- **Card Glow**: Hover states should feature soft purple glow shadows: `hover:shadow-purple-500/15 hover:border-purple-300` (Light) or `hover:border-purple-500/40` (Dark).

---

##  typography 3. Typography & Badges

- **Section Titles**: `text-3xl sm:text-4xl font-black tracking-tight`
- **Subheaders / Descriptions**: `text-sm sm:text-base text-gray-600 dark:text-gray-300`
- **Badges & Chips**: `px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full`
- **Action Buttons**: `py-3 px-6 rounded-2xl font-bold text-sm text-white shadow-lg active:scale-95 transition-all`

---

## ⚡ 4. Animations & Micro-Interactions

- **Framer Motion**:
  - Container entrance: `initial={{ opacity: 0, y: 20 }}` -> `animate={{ opacity: 1, y: 0 }}`
  - Hover elevation: `whileHover={{ y: -6, scale: 1.02 }}`
  - Tap response: `whileTap={{ scale: 0.98 }}`
- **Icons**: Always pair text labels with relevant **Lucide React** icons (e.g., `Sparkles`, `TrendingUp`, `Quote`, `Tag`, `MapPin`, `Calendar`).

---

## 🧩 5. Component Layout Rules

1. **Top Clearance**: Pages must include `pt-28 pb-16` to clear the fixed navbar.
2. **Spacing**: Use standard gap rhythm (`gap-4 sm:gap-6 lg:gap-8`).
3. **Contrast**: Text must satisfy WCAG AA contrast ratio in both Light mode (dark gray text on white/slate) and Dark mode (white/light gray text on dark gray).
