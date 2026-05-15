# Spec-Driven Development in AI — Webinar Materials

[Русская версия ниже / Russian version below](#русская-версия)

---

## What's Inside

### Apps (6 iterations of the same CruiseApp)

All 6 apps solve the same task — a travel app for Europe (ferries, trains, flights). The difference is the development approach:

| Folder                              | Approach                   | Description                                               |
| ----------------------------------- | -------------------------- | --------------------------------------------------------- |
| `app-1-cruiseapp-vibe`              | Vibe coding                | "Make me a cruise app" — no specs, no design              |
| `app-2-cruiseapp-vibe`              | Vibe coding (2nd attempt)  | Same prompt, different result — demonstrating instability |
| `app-3-cruiseapp-vibe-design`       | Vibe + design              | Vibe coding with design requirements specified            |
| `app-4-cruiseapp-sdd-1-iter`        | SDD, 1 iteration           | Specs written upfront, code in one iteration              |
| `app-5-cruiseapp-sdd-1-iter-design` | SDD, 1 iteration + design  | Specs + design requirements, one iteration                |
| `app-6-cruiseapp-sdd-N-iter-design` | SDD, N iterations + design | Specs + design, phased development with validation        |

### Specs

| Folder                          | Description                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| `spec-1-basic/`                 | Basic SDD spec example (prepared before webinar) — mission, tech-stack, roadmap + feature specs |
| `spec-2-minted-during-webinar/` | Specs created in real-time during webinar via AI dialogue                                       |
| `spec-3-full-en/`               | Full SDD framework (EN) — prompts, templates, README with process description                   |
| `spec-3-full-ru/`               | Full SDD framework (RU) — same in Russian                                                       |

### Prompts (in `spec-2-minted-during-webinar/`)

| File                      | Purpose                                                                           |
| ------------------------- | --------------------------------------------------------------------------------- |
| `constitution_prompt.txt` | Prompt for creating project "constitution": mission.md, tech-stack.md, roadmap.md |
| `feature_prompt.txt`      | Prompt for creating feature/phase specs: plan.md, requirements.md, validation.md  |

## Key Idea

Vibe coding (app-1, app-2) produces unpredictable results. SDD (app-4, app-5, app-6) gives you control:

1. **Constitution** — mission, tech-stack, roadmap + non-goals (what the product deliberately does NOT do)
2. **Journey specs** — plan, requirements (including non-goals), validation for each user journey
3. **Dialogue** — AI asks questions, human makes decisions
4. **Validation** — acceptance checklist before moving to the next phase
5. **Verification** — checking specs against actual code (parallel agents per journey)

---

<a id="русская-версия"></a>

## Русская версия

### Что внутри

#### Приложения (6 итераций одного и того же CruiseApp)

Все 6 приложений решают одну задачу — приложение для путешественников по Европе (паромы, поезда, самолёты). Разница — в подходе к разработке:

| Папка                               | Подход                    | Суть                                                          |
| ----------------------------------- | ------------------------- | ------------------------------------------------------------- |
| `app-1-cruiseapp-vibe`              | Vibe coding               | "Сделай мне приложение для круизов" — без спеков, без дизайна |
| `app-2-cruiseapp-vibe`              | Vibe coding (2-я попытка) | Тот же промпт, другой результат — демонстрация нестабильности |
| `app-3-cruiseapp-vibe-design`       | Vibe + дизайн             | Vibe coding, но с указанием дизайн-требований                 |
| `app-4-cruiseapp-sdd-1-iter`        | SDD, 1 итерация           | Спеки написаны заранее, код за одну итерацию                  |
| `app-5-cruiseapp-sdd-1-iter-design` | SDD, 1 итерация + дизайн  | Спеки + дизайн-требования, одна итерация                      |
| `app-6-cruiseapp-sdd-N-iter-design` | SDD, N итераций + дизайн  | Спеки + дизайн, пофазная разработка с валидацией              |

#### Спеки

| Папка                           | Что это                                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `spec-1-basic/`                 | Базовый пример SDD-спеков (подготовлены до вебинара) — mission, tech-stack, roadmap + фича-спеки |
| `spec-2-minted-during-webinar/` | Спеки, созданные в реальном времени на вебинаре через диалог с AI                                |
| `spec-3-full-en/`               | Полный SDD-фреймворк (EN) — промпты, шаблоны, README с описанием процесса                        |
| `spec-3-full-ru/`               | Полный SDD-фреймворк (RU) — то же самое на русском                                               |

#### Промпты (в `spec-2-minted-during-webinar/`)

| Файл                      | Назначение                                                                               |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| `constitution_prompt.txt` | Промпт для создания "конституции" проекта: mission.md, tech-stack.md, roadmap.md         |
| `feature_prompt.txt`      | Промпт для создания спеков конкретной фичи/фазы: plan.md, requirements.md, validation.md |

### Ключевая идея

Vibe coding (app-1, app-2) дает непредсказуемый результат. SDD (app-4, app-5, app-6) позволяет контролировать процесс:

1. **Конституция** — mission, tech-stack, roadmap + не-цели (что продукт намеренно НЕ делает)
2. **Фича-спеки** — plan, requirements (включая не-цели), validation для каждого пользовательского пути
3. **Диалог** — AI задает вопросы, человек принимает решения
4. **Валидация** — чеклист приемки перед переходом к следующей фазе
5. **Верификация** — проверка спеков по реальному коду (параллельные агенты по путям)
