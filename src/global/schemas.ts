const theme = {
  type: 'object',
  properties: {
    backgroundColor: {
      type: 'string',
      format: 'color'
    },
    fontColor: {
      type: 'string',
      format: 'color'
    },
    cardBackground: {
      type: 'string',
      format: 'color'
    },
    gradientBackground: {
      type: 'string',
      format: 'color'
    },
    primaryColor: {
      type: 'string',
      format: 'color'
    },
    primaryBackground: {
      type: 'string',
      format: 'color'
    },
    successColor: {
      type: 'string',
      format: 'color'
    },
    successBackground: {
      type: 'string',
      format: 'color'
    },
    errorColor: {
      type: 'string',
      format: 'color'
    },
    errorBackground: {
      type: 'string',
      format: 'color'
    },
    subcribeButtonBackground: {
      type: 'string',
      format: 'color'
    },
    placeholderColor: {
      type: 'string',
      format: 'color'
    },
    hoverBackgroundColor: {
      type: 'string',
      format: 'color'
    },
    groupBorderColor: {
      type: 'string',
      format: 'color'
    },
    borderColor: {
      type: 'string',
      format: 'color'
    },
    secondaryColor: {
      type: 'string',
      format: 'color'
    },
    modalBackground: {
      type: 'string',
      format: 'color'
    },
    boxShadow: {
      type: 'string',
      format: 'color'
    }
  }
}

const groupSchema =  {
  type: 'Group',
  elements: [
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/dark/properties/backgroundColor'
        },
        {
          type: 'Control',
          scope: '#/properties/dark/properties/fontColor'
        }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/dark/properties/cardBackground'
        },
        {
          type: 'Control',
          scope: '#/properties/dark/properties/gradientBackground'
        }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/dark/properties/primaryBackground'
        },
        {
          type: 'Control',
          scope: '#/properties/dark/properties/primaryColor'
        }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/dark/properties/successBackground'
        },
        {
          type: 'Control',
          scope: '#/properties/dark/properties/successColor'
        }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/dark/properties/errorBackground'
        },
        {
          type: 'Control',
          scope: '#/properties/dark/properties/errorColor'
        }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/dark/properties/subcribeButtonBackground'
        },
        {
          type: 'Control',
          scope: '#/properties/dark/properties/placeholderColor'
        }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/dark/properties/groupBorderColor'
        },
        {
          type: 'Control',
          scope: '#/properties/dark/properties/borderColor'
        }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/dark/properties/secondaryColor'
        },
        {
          type: 'Control',
          scope: '#/properties/dark/properties/modalBackground'
        }
      ]
    },
    {
      type: 'HorizontalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/dark/properties/boxShadow'
        }
      ]
    }
  ]
}

const themeUISchema = {
  type: 'Category',
  label: 'Theme',
  elements: [
    {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Dark',
          ...groupSchema
        },
        {
          label: 'Light',
          ...groupSchema
        }
      ]
    }
  ]
}

export function getBuilderSchema() {
  return {
    dataSchema: {
      type: 'object',
      required: ['posts'],
      properties: {
        posts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {}
          }
        },
        dark: theme,
        light: theme
      }
    },
    uiSchema: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'General',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/posts'
                }
              ]
            }
          ]
        },
        themeUISchema
      ]
    }
  }
}

export function getEmbedderSchema() {
  return {
    dataSchema: {
      type: 'object',
      properties: {
        post: {
          type: 'object',
          required: true,
          properties: {}
        },
        dark: theme,
        light: theme
      }
    },
    uiSchema: {
      type: 'Categorization',
      elements: [
        {
          type: 'Category',
          label: 'General',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/posts'
                }
              ]
            }
          ]
        },
        themeUISchema
      ]
    }
  }
}