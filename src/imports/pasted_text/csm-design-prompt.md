# Figma Design Prompt – Client Satisfaction Measurement (CSM) System

## Project Overview
Design a **high‑fidelity, responsive UI** for a government CSM system (Department of Agriculture). The design must include three core pages: **Admin Login**, **Client Satisfaction Form**, and **Admin Dashboard**. The style should be clean, accessible, and trustworthy, using a **green agricultural theme** with clear data presentation.

---

## 1. General Style Guide

### Colors
| Role | Hex Code | Usage |
|------|----------|-------|
| Primary Green | `#2E7D32` | Headers, main buttons, active states, sidebar background |
| Secondary Green | `#4CAF50` | Hover states, accent borders, secondary buttons |
| Light Green | `#E8F5E9` | Table row stripes, hover backgrounds, form sections |
| Background | `#F2F7F2` (page), `#FFFFFF` (cards/forms) | Body background, container backgrounds |
| Text Dark | `#333333` | Body text, labels |
| Text Light | `#FFFFFF` | Dark background text |
| Error/Warning | `#FF0000`, `#8B0000` | Required field indicators, low satisfaction scores |

### Typography
- **Font Family**: `Roboto` (regular 400, medium 500, bold 700)
- **Scale**:
  - Page title: 24px / bold
  - Section heading: 20px / medium
  - Subheading: 16px / medium
  - Body / labels: 14px / regular
  - Helper / meta text: 12px / regular

### Spacing & Layout
- Base unit: 8px
- Page max-width: 1280px (centered)
- Sidebar width: 250px (desktop), collapsible to 70px or hidden on mobile
- Card padding: 24px
- Form field vertical spacing: 16px
- Border radius: 8–12px for cards, buttons, inputs

### Icons & Imagery
- Use **Feather or Phosphor icons** (stroke style)
- Include subtle agricultural icons: leaf, farm, calendar, chart, user, logout, filter, download
- Optional background pattern: very faint rice stalks or leaves (opacity 0.05)

---

## 2. Page 1 – Admin Login (`login-admin.html`)

**Layout**: Centered card on a gradient background (linear gradient from `#e0f7e9` to `#fefbe9`).

**Components**:
- **Login Card**: width 400px, white background, border 2px solid `#4CAF50`, border-radius 12px, shadow `0 6px 15px rgba(0,0,0,0.2)`.
- **Title**: "CSM System Dashboard Login", color `#2E7D32`.
- **Username field**: label, input with border `#a5d6a7`, padding 12px, full width.
- **Password field**: same as username, plus “Show” toggle button (inline, font size 14px, color `#2E7D32`).
- **Submit button**: full width, background `#4CAF50`, hover `#388E3C`, text white, border-radius 6px, padding 12px.
- **Footer**: "Powered by Agriculture CSM System", font size 12px, color `#558B2F`.
- **Responsive**: on mobile, card width 90%, margins auto.

---

## 3. Page 2 – Client Satisfaction Form (`client-satisfaction-form.php`)

**Layout**: Single scrolling page with distinct sections, white background, border-left accent (`#4CAF50`) per section.

**Global Elements**:
- **Language toggle** (English / Surigaonon): select dropdown at top right.
- **Intro text**: gray box or regular paragraph with italic line.
- **Required field indicator**: red asterisk `*` or text “Required*”.

### Section I – Client Information (optional)
- Title: “Client Information” (green underline).
- **Client Type** (checkboxes): Citizen, Business, Government → inline or flex wrap.
- **Beneficiary Type** (radio): Individual / Group → selects show/hide sub‑options.
  - *Individual Options* (radio): Farmer, Fisher, AEW, Others (with text input).
  - *Group Options* (radio): FCA, Cluster, LGU, School, Others (text input).
- **Profile fields** (grid layout): Registration ID, Contact, Registered Group Name.
- **Name** (first + middle + last + extension) in a responsive 4‑column grid.
- **Address** (region, province, city, barangay, street) in a flexible grid.
- **Sex** (radio Male/Female) and **Birthdate** (date picker).
- **Check if applicable** (checkboxes): ARB, IP's, PWD, 4P's – inline.

### Section II – Intervention / Service Received (Required)
- Checkboxes: Production Support, Training, Market Services, Irrigation Services, Equipment/Machinery/Facility, Others.
- **Quantity**: text input, full width.
- **Intervention Details**: textarea (3 rows, 60 chars max).

### Section III – Citizen's Charter (Required)
- Subheading with required asterisk.
- **CC1**: 4 radio options (awareness). Use meaningful labels.
- **CC2**: 4 radio options (visibility).
- **CC3**: 4 radio options (helpfulness).
- **Conditional logic**: If CC1 = “I do not know what a CC is…” → auto‑select “N/A” for CC2 & CC3 and hide options 1–3. Show only “N/A” option.

### Section IV – Client Satisfaction Measurement (Required)
- **Table** with vertical scroll on mobile (overflow‑x: auto).
- Columns: Dimension | Question | 1 (Strongly Disagree) | 2 (Disagree) | 3 (Neutral) | 4 (Agree) | 5 (Strongly Agree).
- First column spans 8 rows (Service Quality Dimension) and 1 row for Timeliness, then Overall.
- Each question row has radio buttons (scale 1–5). On selection, row highlights `#E8F5E9`.
- **Suggestions**: textarea (4 rows, 150 chars max).

### Submit / Clear Buttons
- **Sticky bottom bar** with white background, shadow.
- Buttons: “Submit Form” (primary green), “Clear Form” (secondary green). Full width on mobile, inline on desktop.

**Mobile Specifics**:
- All inputs height ≥ 48px (touch friendly).
- Radio / checkbox scale ≥ 1.4.
- Table wrapper with horizontal scroll.
- Stack all multi‑column layouts to single column.
- Sticky bottom bar with large tap targets.

---

## 4. Page 3 – Admin Dashboard (`CSM-dashboard.php`)

**Layout**: Fixed sidebar + main content area (flex row). Sidebar green gradient, main content off‑white (`#FDFAE0`).

### Sidebar
- Width 250px, dark green gradient (`#2E7D32` to `#1B5E20`).
- Logo / title “🌿 CSM Panel” (white).
- Navigation tabs: “All Responses”, “Citizen Charter”, “CSM Measurement”, “Feedback”.
- Active tab: lighter green background (`#66BB6A`), black text.
- “Logout” button at bottom (light background, dark text).
- **Mobile**: sidebar hidden behind hamburger menu (design both states).

### Main Content Area
- Header: “CSM Dashboard” + date filter bar.
- **Date Filter** (inline form): start date, end date inputs + “Filter” button. Below quick links: Today | This Month | This Year | All Time (styled as links, active highlight).
- **Content changes based on selected tab**.

#### Tab 1 – All Responses
- **Table** (`DataTables` style): columns – Date Submitted, Client Type, Beneficiary Type, Beneficiary Info, Client Full Name, Full Address, Intervention.
- Search, pagination, sort by date descending.
- Table styling: green gradient header, zebra stripes (`#F1F8E9`), shadow, rounded corners.
- Count badge: “Total Responses: X”.

#### Tab 2 – Citizen Charter
- Three **doughnut charts** in responsive row (CC1, CC2, CC3).
- Each chart displays percentage distribution of answers (4 segments) and a **center label** showing mean value.
- Legends below each chart with answer meanings.
- Charts update based on date filter.

#### Tab 3 – CSM Measurement
- **Bar chart** (CSM Questions Q1–Q8) – each bar colored dynamically (dark red → green) based on mean value.
- Two **doughnut charts** side‑by‑side: T1 Rating (Timeliness) and Overall Rating.
- Each doughnut has 5 segments (1–5 Likert), shows percentage distribution and mean value in the center.
- Include explanatory text below bar chart (what each SQD means).

#### Tab 4 – Feedback
- **Table** with columns: Date, Intervention, Details, Qty, Suggestion.
- Suggestion column: show first 120 characters, “Show more” link expands to full.
- Total feedback count displayed above table.
- Same styling as All Responses table.

**Chart Specifications**:
- Doughnut cutout: 60%.
- Center mean font: bold 24px Arial, label “Mean” 13px below.
- Tooltips show percentages and scale labels.

**Responsive Dashboard**:
- On tablet (< 992px): sidebar becomes top navigation bar.
- On mobile (< 768px): charts stack vertically, tables horizontally scrollable, date filters wrap.

---

## 5. Interactive States & Micro‑interactions

- **Buttons**:
  - Hover: darken by 10%, cursor pointer.
  - Active: scale 0.98.
- **Form inputs**: focus ring = `#4CAF50`, border `#4CAF50`.
- **Table rows**: hover background `#E8F5E9`.
- **Sidebar links**: hover – white overlay 20%, active – `#66BB6A`.
- **Language toggle**: changes all translatable text (design both languages as static – just show English, but structure supports swapping).

---

## 6. Assets & Deliverables Expected from Figma

- **Design file** with 3 pages (Login, Form, Dashboard).
- **Components** (buttons, inputs, cards, tables, chart templates, sidebar nav, date picker, language select).
- **Auto layout** frames for responsiveness (desktop: 1440px, tablet: 768px, mobile: 375px).
- **Interactive prototypes** for:
  - Toggling Individual/Group options (show/hide fields).
  - CC1 conditional logic (if CC1 option 4 selected, CC2/CC3 show only N/A).
  - Tab switching in dashboard.
  - “Show more” link in Feedback table.
- **Export** of color styles, text styles, and any custom icons.

---

## 7. Notes for the Designer

- All chart data and table content are **placeholders** (design realistic dummy data, e.g., “Juan Dela Cruz”, mean values 4.2, etc.).
- The Figma design should reflect the exact layout and component behavior described. Use **detailing** like shadows, rounded corners, consistent padding.
- Ensure form fields have **proper labels, placeholders, and required indicators**.
- The dashboard charts must visually resemble Chart.js output – you can use **Figma plugins** (e.g., Chart, Data Lab) or mock with vectors (but show exact layout and color logic).
- Highlight the **green agricultural feel** – avoid generic blue enterprise look.
- Provide **developer notes** (e.g., “this table becomes horizontally scrollable on mobile”, “this chart center mean number is dynamic”).

---

This prompt gives you a complete, precise specification to build a production‑ready Figma design for the CSM system.