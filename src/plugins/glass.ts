import plugin from 'tailwindcss/plugin';

export default function glassPlugin() {
  return [
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.glass': {
          backgroundColor: theme('colors.glass.DEFAULT'),
          backdropFilter: theme('backdropFilter.glass'),
          boxShadow: theme('boxShadow.glass'),
          border: `1px solid ${theme('colors.json.border')}`,
          borderRadius: theme('borderRadius.node'),
        },
        '.glass-sm': {
          backgroundColor: theme('colors.glass.DEFAULT'),
          backdropFilter: theme('backdropFilter.glass-sm'),
          boxShadow: theme('boxShadow.glass-sm'),
          border: `1px solid ${theme('colors.json.border')}`,
          borderRadius: theme('borderRadius.node'),
        },
        '.glass-container': {
          '@apply glass p-4': {},
          '&.purple': {
            backgroundColor: theme('colors.json.container.purple'),
          },
          '&.blue': {
            backgroundColor: theme('colors.json.container.blue'),
          },
          '&.green': {
            backgroundColor: theme('colors.json.container.green'),
          },
        },
        '.json-property': {
          color: theme('colors.json.syntax.property'),
          fontFamily: theme('fontFamily.mono'),
        },
        '.json-string': {
          color: theme('colors.json.syntax.string'),
          fontFamily: theme('fontFamily.mono'),
        },
        '.json-number': {
          color: theme('colors.json.syntax.number'),
          fontFamily: theme('fontFamily.mono'),
        },
        '.json-boolean': {
          color: theme('colors.json.syntax.boolean'),
          fontFamily: theme('fontFamily.mono'),
        },
        '.json-null': {
          color: theme('colors.json.syntax.null'),
          fontFamily: theme('fontFamily.mono'),
        },
      });
    }),
  ];
}
