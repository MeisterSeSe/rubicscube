import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#00ff0b',           // Bright Green
          secondary: '#1a1a1a',         // Dark Gray (almost Black)
          accent: '#ff4081',            // Pink (for accents)
          background: '#ffffff',        // White
          error: '#f44336',             // Red (for errors)
          info: '#2196f3',              // Blue (for informational messages)
          success: '#4caf50',           // Green (for success messages)
          warning: '#ff9800',           // Orange (for warnings)
          textPrimary: '#000000',       // Black (for primary text)
          textSecondary: '#666666',     // Gray (for secondary text)
          surface: '#f5f5f5'            // Light Gray (for surfaces like cards)
        }
      },

      dark: true,
      colors: {
        primary: '#00ff0b',           // Bright Green
        secondary: '#1a1a1a',         // Dark Gray (almost Black)
        accent: '#ff4081',            // Pink (for accents)
        background: '#121212',        // Dark Gray (for background)
        error: '#f44336',             // Red (for errors)
        info: '#2196f3',              // Blue (for informational messages)
        success: '#4caf50',           // Green (for success messages)
        warning: '#ff9800',           // Orange (for warnings)
        textPrimary: '#ffffff',       // White (for primary text)
        textSecondary: '#cccccc',     // Light Gray (for secondary text)
        surface: '#333333'            // Darker Gray (for surfaces like cards)
      }
    }

  }
})