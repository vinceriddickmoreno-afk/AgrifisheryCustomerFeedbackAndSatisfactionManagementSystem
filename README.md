
# Agrifishery Customer Feedback and Satisfaction Management System

A web-based system for collecting and managing client satisfaction surveys for agricultural and fishery services. It provides a public-facing survey form and a secure admin dashboard for monitoring results.

**Live Demo / Repository:** [GitHub](https://github.com/vinceriddickmoreno-afk/AgrifisheryCustomerFeedbackAndSatisfactionManagementSystem)

## 📋 Table of Contents

* [Tech Stack](#-tech-stack)
* [Installation](#-installation)
* [Usage](#-usage)
  * [Client Satisfaction Form](#1-client-satisfaction-form-for-customers)
  * [Admin Login](#2-admin-login)
  * [Admin Dashboard](#3-admin-dashboard)
* [Project Structure](#-project-structure)
* [Features](#-features)
* [Support](#-support)

---

## 🛠 Tech Stack

* **Frontend Framework:** React 18+ with TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS 4 + shadcn/ui theme
* **Routing:** React Router v7
* **Form Handling:** React Hook Form + Zod validation
* **UI Components:** Radix UI primitives + Material UI icons
* **Charts:** Recharts
* **Package Manager:** pnpm (determined by `pnpm-workspace.yaml`)

---

## 🚀 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/vinceriddickmoreno-afk/AgrifisheryCustomerFeedbackAndSatisfactionManagementSystem.git
cd AgrifisheryCustomerFeedbackAndSatisfactionManagementSystem
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Run the development server:**
```bash
pnpm run dev
```
The application will start at `http://localhost:5173` by default.

4. **Build for production:**
```bash
pnpm run build
```
The output will be in the `dist/` folder.

---

## 📖 Usage

### 1. Client Satisfaction Form (for Customers)

**Access:** Navigate to the root URL (`/`).

* **Language Selection:** The form supports English and Surigaonon. Use the toggle at the top to switch.
* **Section I – Client Information (Optional):**
  * Select **Client Type** (Citizen, Business, or Government).
  * Choose **Beneficiary Type** (Individual or Group). Based on your selection, additional fields will appear (e.g., Farmer, Fisher, or FCA, LGU).
  * Optionally fill in personal details (name, address, sex, birthdate) and profile classifications (ARB, IP, PWD, 4P's).
* **Section II – Service Received (Required):**
  * Select at least one intervention or service availed (e.g., Production Support, Training, Market Services).
  * Provide quantity and additional details if applicable.
* **Section III – Citizen's Charter (CC) (Required):**
  * Answer three questions about your awareness of the office's Citizen's Charter.
  * If you are aware of the CC (CC1 ≠ option 4), you will rate your agreement on CC2 and CC3.
* **Section IV – Satisfaction Measurement (Required):**
  * Rate eight service quality dimensions (Responsiveness, Reliability, Access, Communication, Costs, Integrity, Assurance, Outcome) on a scale of 1 to 5.
  * Provide an **overall satisfaction rating**.
  * Leave suggestions or comments (optional).
* **Submit:** Click the "Submit" button. A success message will appear, and you can choose to submit another response.

---

### 2. Admin Login

**Access:** Navigate to `/admin/login`.

* Enter your admin credentials (currently simulated – any username/password combination will redirect to the dashboard after a short loading delay).
* Features on the login page:
  * Toggle password visibility.
  * "Remember me" and "Forgot password?" links (UI only).
  * Link to return to the public survey form.

---

### 3. Admin Dashboard

**Access:** Navigate to `/admin/dashboard` (or log in via `/admin/login`).

The dashboard provides a comprehensive view of survey data organized into four tabs:

#### Tab: All Responses
* Displays a paginated table of submitted survey responses.
* Each row shows the date, client type, beneficiary info, name, address, and intervention.
* **Filtering:**
  * Use preset buttons (**Today**, **This Month**, **This Year**, **All Time**) or manually select a date range with the start/end date pickers.
  * Click **Apply Filter** to update the list.
* **Pagination:** Navigate through pages using the "Previous" and "Next" buttons at the bottom.

#### Tab: Citizen Charter
* Visualizes responses to CC1, CC2, and CC3 using **doughnut charts** with mean scores.
* Each chart shows the distribution of answers (Strongly Agree, Agree, Neutral, etc.) and the overall mean.

#### Tab: CSM Measurement
* Displays a **bar chart** of the mean scores for each of the eight service quality dimensions (SQ1–SQ8).
* Includes a **pie chart** for overall satisfaction ratings.
* A **timeliness** bar chart shows the distribution of responses to the question "I spent a reasonable amount of time for my transaction."

#### Tab: Feedback & Comments
* Lists all client suggestions and feedback.
* Each entry shows the date, intervention, service details, quantity, and the full suggestion text.
* **Expand/Collapse:** Click on a suggestion row to expand and read the full comment if it is truncated.

#### Sidebar
* Use the hamburger menu (top-left) to toggle the sidebar on mobile devices.
* Navigation links: Dashboard, Surveys, Reports, Settings.
* **Logout** button returns to the admin login page.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── AdminDashboard.tsx      # Admin dashboard with charts and filters
│   │   ├── AdminLogin.tsx          # Admin login form
│   │   ├── ClientSatisfactionForm.tsx  # Public survey form
│   │   ├── figma/                  # Figma-generated components
│   │   └── ui/                     # shadcn/ui components (buttons, cards, etc.)
│   ├── App.tsx                     # Root component with router
│   └── routes.tsx                  # Route definitions
├── imports/
│   └── pasted_text/                # Pasted text snippets
├── styles/                         # Global styles
└── main.tsx                        # Application entry point
```

---

## ✨ Features

* **Multi-language support** (English and Surigaonon).
* **Conditional form logic** – fields appear based on previous selections (e.g., Individual vs. Group classification).
* **Responsive design** – works on desktop and mobile devices.
* **Data visualization** – doughnut, bar, and pie charts powered by Recharts.
* **Date filtering** – presets and custom date ranges for survey responses.
* **Pagination** – efficient browsing of large datasets.
* **Simulated authentication** – ready for backend integration.
* **Confetti animation** – on successful form submission (via `canvas-confetti`).

---

## 🤝 Support

If you encounter any issues:

1. Ensure you are using **Node.js 18+** and **pnpm**.
2. Clear your browser cache or try an incognito window.
3. Check the browser console for any error messages.
4. For questions or contributions, open an issue on the
5. [GitHub repository](https://github.com/vinceriddickmoreno-afk/AgrifisheryCustomerFeedbackAndSatisfactionManagementSystem/issues).
