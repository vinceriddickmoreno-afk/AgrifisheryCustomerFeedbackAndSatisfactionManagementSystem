# Team Style Guide

## 2.1 — Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Variables | camelCase | `feedbackList`, `avgRating` |
| Functions / Methods | camelCase | `calculateMean`, `filterByDate` |
| Classes | PascalCase | `FeedbackController`, `CSMAnalyzer` |
| Files | kebab-case (scripts) / PascalCase (components) | `feedback-service.js`, `DateFilter.tsx` |
| Constants | UPPER_SNAKE_CASE | `MAX_RATING_SCORE`, `DEFAULT_DATE_RANGE` |
| Database tables / fields | snake_case | `customer_feedback`, `created_at` |

## 2.2 — Formatting Rules

| Rule | Team Decision |
|------|---------------|
| Indentation | 2 spaces (JavaScript/Python) |
| Line length limit | 100 characters |
| Brace style | Opening brace on same line for JS/TS |
| Spaces vs. tabs | Spaces only |
| Blank lines between functions | 1 blank line |
| Max function length | 30 lines (excluding comments) |

## 2.3 — Commenting Standards

| Commenting Rule | Team Standard |
|----------------|---------------|
| File/module header comment | JSDoc block with `@file`, `@author`, `@description` |
| Function/method doc comment | JSDoc for public methods |
| Inline comments (when to use) | Only for non‑obvious logic |
| TODO comment format | `// TODO(username): description` |
| Language for comments | English |

## 2.4 — Branch Naming Strategy

| Branch Type | Naming Format | Example |
|-------------|---------------|---------|
| Feature branch | `feature/<short-desc>` | `feature/feedback-chart` |
| Bug fix branch | `fix/<issue-id>-<short-desc>` | `fix/42-mean-calculation` |
| Hotfix branch | `hotfix/<short-desc>` | `hotfix/critical-error` |
| Release branch | `release/<version>` | `release/v1.2.0` |
Release branch
release/<version>
release/v1.2.0


