import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#00ff0b', // Vibrant green
          secondary: '#333333', // Deep charcoal
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#1b1b1b', // Darker grey
          footerbackground: '#1b1b1b', // Darker grey
          surface: '#000000', // True black
          writing: '#e0e0e0' // Light grey
        }
      },
      light: {
        dark: false,
        colors: {
          primary: '#4CAF50', // Soft natural green
          secondary: '#A9A9A9', // Warm grey
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#F5F5F5', // Light grey
          footerbackground: '#333333',
          surface: '#FFFFFF', // Pure white
          writing: '#333333' // Dark grey
        }
      }
    }
  }
})