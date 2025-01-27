import dedent from "dedent";

interface FileContent {
    [key: string]: {
      code: string;
    };
  }
  
  interface PricingOption {
    name: string;
    tokens: string;
    value: number;
    desc: string;
    price: number;
  }

const lookup = {
    SUGGESTIONS: [
        'ReactでToDoアプリを作成',
        '予算管理アプリを作成',
        'ジム管理ポータルダッシュボードを作成',
        '歴史に関するクイズアプリを作成',
        'ログイン・サインアップ画面を作成',
      ],
      HERO_HEADING: '何を作りたいですか？',
      HERO_DESC: 'フルスタックウェブアプリを提案、実行、編集、デプロイできます。',
      INPUT_PLACEHOLDER: '何を作成しますか？',
      SIGNIN_HEADING: 'Bolt.New 2.0で続行',
      SIGNIN_SUBHEADING: 'Boltを使用するには、既存のアカウントにログインするか、新しいアカウントを作成する必要があります。',
      SIGNIN_AGREEMENT_TEXT: 'Boltを使用することで、分析のための使用データの収集に同意したことになります。',
    

  DEFAULT_FILE: {
    '/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
    },
    '/App.css': {
      code: `
            @tailwind base;
@tailwind components;
@tailwind utilities;`
    },
    '/tailwind.config.js': {
      code: `
            /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
    },
    '/postcss.config.js': {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
`
    }
  },
  DEPENDANCY: {

    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    autoprefixer: "^10.0.0",
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },
  PRICING_DESC:'無料アカウントでワークフローをスピードアップし、公共プロジェクトを迅速に開始できます。または、即座に開くプロダクション環境でチーム全体を強化しましょう。',
  PRICING_OPTIONS:[
    {
      name:'Basic',
      tokens:'50K',
      value:50000,
      desc:'趣味や軽い利用を想定したカジュアルユーザー向けプラン。',
      price:4.99
    },
    {
      name:'Starter',
      tokens:'120K',
      value:120000,
      desc:'Boltを週に数回使用するプロフェッショナル向け。',
      price:9.99
    },
    {
      name:'Pro',
      tokens:'2.5M',
      value:2500000,
      desc:'より頻繁にBoltを使用するプロフェッショナル向け。',
      price:19.99
    },
    {
      name:'Unlimited (License)',
      tokens:'Unlimited',
      value:999999999,
      desc:'Boltを頻繁に使用するプロフェッショナル向けの最上位プラン。',
      price:49.99
    }
  ]


}
export default lookup