import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const hoverStyle = Styles.style({
  $nest: {
    '&:hover': {
      color: `${Theme.text.primary} !important`,
      background: `${Theme.action.hoverBackground} !important`
    }
  }
})