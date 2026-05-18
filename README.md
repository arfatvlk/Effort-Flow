<h1>⏱️ EffortFlow</h1>

<p>A clean, intuitive effort unit converter for project managers, developers, and teams.<br/>Convert between Man-Hours, Man-Days, Man-Weeks, and Man-Months — instantly.</p>

[![TypeScript](https://img.shields.io/badge/TypeScript-94%25-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## ✨ Features

- 🔄 **Instant Conversion** — Convert any effort value between Hours, Days, Weeks, and Months in real time
- 📊 **Full Breakdown Panel** — See the equivalent of your input across all units simultaneously
- ⚙️ **Configurable Work Schedule** — Customize hours/day, days/week, and days/month to match your team's actual schedule
- 📋 **Quick Reference Card** — At-a-glance summary of your current conversion rates
- 🎨 **Clean, Responsive UI** — Works great on desktop and mobile, built with Tailwind CSS

---

## 🖼️ Preview

> Enter an effort value, pick a "From" unit and a "To" unit — EffortFlow does the rest.

| Conversion Panel | Full Breakdown |
|---|---|
| Input value + unit selectors with live result | All equivalent values shown at once |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/arfatvlk/Effort-Flow.git
cd Effort-Flow

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Open your browser at `http://localhost:5173` to see the app.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [Vite 6](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |

---

## 📁 Project Structure

```
Effort-Flow/
├── App.tsx                  # Root application component
├── index.tsx                # Entry point
├── index.html               # HTML template
├── types.ts                 # TypeScript types & enums (EffortUnit, Config)
├── components/
│   └── icons.tsx            # SVG icon components
├── services/
│   └── conversionService.ts # Core conversion logic
├── vite.config.ts           # Vite configuration
└── tsconfig.json            # TypeScript configuration
```

---

## ⚙️ Configuration

EffortFlow uses sensible defaults that you can customize directly in the UI via the **⚙️ Settings** panel:

| Setting | Default | Description |
|---|---|---|
| Hours / Day | `8` | Working hours in a single day |
| Days / Week | `5` | Working days in a week |
| Days / Month | `20` | Working days in a month |

All conversions update instantly when you change these values.

---

## 📐 How Conversions Work

All conversions go through a canonical **hours** intermediate:

```
Input → Hours → Target Unit
```

Using your configured work schedule:
- `1 Day = hoursPerDay hours`
- `1 Week = daysPerWeek × hoursPerDay hours`
- `1 Month = daysPerMonth × hoursPerDay hours`

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 👤 Author

**Daffa Daniarfa**

---

<div align="center">
  <sub>Built with ❤️ using React + TypeScript + Vite</sub>
</div>
