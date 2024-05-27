import { Styles } from "@ijstech/components";
const Theme = Styles.Theme.ThemeVars;

export const getHoverStyleClass = (color?: string) => {
  const styleObj = {
    $nest: {
      '&:hover': {
        color: `${Theme.text.primary} !important`,
        background: `${color || Theme.action.hoverBackground} !important`,
        $nest: {
          'i-label': {
            color: `${Theme.text.primary} !important`
          }
        }
      }
    }
  }
  return Styles.style(styleObj);
}

export const getActionButtonStyle = (hoveredColor: string) => Styles.style({
  justifyContent: 'space-between',
  $nest: {
    '&:hover': {
      backgroundColor: hoveredColor || Theme.action.hoverBackground,
      opacity: 1
    }
  }
})

Styles.cssRule('#mdCreatePost', {
  $nest: {
    '.modal': {
      height: '100%',
      top: 0,
      position: 'absolute',
      padding: 0,
      overflow: 'hidden'
    }
  }
})
