# shadcn/ui monorepo template

cr-badge-yawol-tech ![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/yawol-corp/yawol-tech?utm_source=oss&utm_medium=github&utm_campaign=yawol-corp%2Fyawol-tech&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

This is a Vite monorepo template with shadcn/ui.

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```
