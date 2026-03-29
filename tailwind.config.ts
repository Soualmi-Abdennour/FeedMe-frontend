import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
	'./src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		backgroundImage: {
            "auth-gradient": 'linear-gradient(243.18deg, #FFF5F0 10%, #FFD8C2 50%, #FFF5F0 100%)',
  		    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  		    'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
				50:  "#FFF3ED",
				100: "#FFE6D5",
				200: "#FFC9A8",
				300: "#FFA876",
				400: "#FF8042",
				500: "#FF6600", // Main brand orange
				600: "#E55A00",
				700: "#BF4A00",
				800: "#8F3700",
				900: "#5C2300",
				950: "#3B1500",
			},
  		    neutral: {
				0:   "#FFFFFF",
				50:  "#F9F9F9",
				100: "#F0F0F0",
				200: "#E3E3E3",
				300: "#C8C8C8",
				400: "#A0A0A0",
				500: "#737373",
				600: "#525252",
				700: "#404040",
				800: "#2E2E2E",
				900: "#1A1A1A",
				950: "#0A0A0A",
			},
			fail: {
				50:  "#FFF0F0",
				100: "#FFD6D6",
				200: "#FFADAD",
				300: "#FF7575",
				400: "#FF3D3D",
				500: "#E60000", // Main fail
				600: "#CC0000",
				700: "#A30000",
				800: "#7A0000",
				900: "#520000",
				950: "#2E0000",
		    },
			success: {
				50:  "#EDFFF4",
				100: "#D5FFE8",
				200: "#AAFFD1",
				300: "#6BFFB0",
				400: "#00F07A",
				500: "#00C960", // Main success
				600: "#00A84F",
				700: "#007A3A",
				800: "#005527",
				900: "#003317",
				950: "#001A0C",
		    },
			error: {
				50:  "#FFFBEA",
				100: "#FFF3C4",
				200: "#FFE580",
				300: "#FFD133",
				400: "#FFBC00",
				500: "#E6A800", // Main warning/error yellow
				600: "#CC9200",
				700: "#A37500",
				800: "#7A5700",
				900: "#523A00",
				950: "#2E2000",
			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		spacing:{
			"1":  "4px",
			"2":  "8px",
			"3":  "12px",
			"4":  "16px",
			"5":  "20px",
			"6":  "24px",
			"7":  "28px",
			"8":  "32px",
			"9":  "36px",
			"10": "40px",
			"11": "44px",
			"12": "48px",
			"13": "52px",
			"14": "56px",
			"15": "60px",
			"16": "64px",
			"17": "68px",
			"18": "72px",
			"19": "76px",
			"20": "80px",
		},
		boxShadow:{
            1: '0px 4px 25px 0px theme("colors.neutral.900")',        
}
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
