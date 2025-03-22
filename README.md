[21:43:28.579] Previous build caches not available
[21:43:28.761] Cloning completed: 431.000ms
[21:43:29.080] Running build in Washington, D.C., USA (East) – iad1
[21:43:29.269] Running "vercel build"
[21:43:29.746] Vercel CLI 41.4.1
[21:43:30.231] Installing dependencies...
[21:43:35.999] npm warn deprecated @supabase/auth-helpers-shared@0.7.0: This package is now deprecated - please use the @supabase/ssr package instead.
[21:43:36.658] npm warn deprecated @supabase/auth-helpers-nextjs@0.10.0: This package is now deprecated - please use the @supabase/ssr package instead.
[21:43:48.119] 
[21:43:48.120] added 490 packages in 18s
[21:43:48.120] 
[21:43:48.121] 159 packages are looking for funding
[21:43:48.121]   run `npm fund` for details
[21:43:48.200] Detected Next.js version: 15.2.2
[21:43:48.208] Running "npm run build"
[21:43:48.364] 
[21:43:48.365] > platform-new@0.1.0 build
[21:43:48.365] > next build
[21:43:48.365] 
[21:43:49.274] Attention: Next.js now collects completely anonymous telemetry regarding usage.
[21:43:49.275] This information is used to shape Next.js' roadmap and prioritize features.
[21:43:49.275] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
[21:43:49.275] https://nextjs.org/telemetry
[21:43:49.275] 
[21:43:49.419]    ▲ Next.js 15.2.2
[21:43:49.419] 
[21:43:49.459]    Creating an optimized production build ...
[21:44:14.921] 
[21:44:14.921] 
[21:44:14.921] Retrying 1/3...
[21:44:14.927] 
[21:44:14.927] 
[21:44:14.928] Retrying 1/3...
[21:44:14.935] 
[21:44:14.935] 
[21:44:14.936] Retrying 1/3...
[21:44:14.937] 
[21:44:14.938] 
[21:44:14.938] Retrying 1/3...
[21:44:14.943] 
[21:44:14.943] 
[21:44:14.943] Retrying 1/3...
[21:44:25.305]  ✓ Compiled successfully
[21:44:25.311]    Linting and checking validity of types ...
[21:44:33.212] 
[21:44:33.217] Failed to compile.
[21:44:33.217] 
[21:44:33.218] ./src/app/api/auth/[...nextauth]/route.ts
[21:44:33.218] 5:10  Error: 'NextRequest' is defined but never used.  @typescript-eslint/no-unused-vars
[21:44:33.218] 5:23  Error: 'NextResponse' is defined but never used.  @typescript-eslint/no-unused-vars
[21:44:33.218] 
[21:44:33.218] ./src/app/api/companies/[company]/route.ts
[21:44:33.219] 21:42  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.219] 26:27  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.220] 
[21:44:33.221] ./src/app/practice/companies/[companyId]/page.tsx
[21:44:33.221] 4:8  Error: 'SearchAndFilters' is defined but never used.  @typescript-eslint/no-unused-vars
[21:44:33.221] 
[21:44:33.221] ./src/app/practice/companies/page.tsx
[21:44:33.221] 4:8  Error: 'SearchAndFilters' is defined but never used.  @typescript-eslint/no-unused-vars
[21:44:33.222] 19:5  Error: 'companyProblems' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[21:44:33.222] 
[21:44:33.229] ./src/app/profile/page.tsx
[21:44:33.230] 266:17  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
[21:44:33.232] 
[21:44:33.232] ./src/components/AuthSection.tsx
[21:44:33.232] 8:9  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.233] 24:7  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
[21:44:33.238] 
[21:44:33.238] ./src/components/CategoriesView.tsx
[21:44:33.239] 6:41  Error: 'Category' is defined but never used.  @typescript-eslint/no-unused-vars
[21:44:33.240] 59:6  Warning: React Hook React.useEffect has missing dependencies: 'fetchUserProblems', 'isInitialFetch', and 'sessionLoading'. Either include them or remove the dependency array.  react-hooks/exhaustive-deps
[21:44:33.242] 72:58  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.242] 72:98  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.242] 73:60  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.242] 73:90  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.243] 74:55  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.243] 75:50  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.246] 86:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.246] 142:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.247] 177:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.247] 210:19  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.247] 
[21:44:33.247] ./src/components/CompanyGrid.tsx
[21:44:33.249] 45:15  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
[21:44:33.252] 
[21:44:33.252] ./src/components/CompanyProblems.tsx
[21:44:33.252] 11:8  Error: 'Image' is defined but never used.  @typescript-eslint/no-unused-vars
[21:44:33.253] 149:15  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
[21:44:33.254] 
[21:44:33.254] ./src/components/CreatorSection.tsx
[21:44:33.254] 198:33  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[21:44:33.254] 204:37  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[21:44:33.254] 213:79  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[21:44:33.254] 215:32  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[21:44:33.254] 215:119  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[21:44:33.254] 350:26  Error: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
[21:44:33.254] 
[21:44:33.254] ./src/components/FeaturesSection.tsx
[21:44:33.254] 3:3  Error: 'Code' is defined but never used.  @typescript-eslint/no-unused-vars
[21:44:33.254] 8:3  Error: 'LineChart' is defined but never used.  @typescript-eslint/no-unused-vars
[21:44:33.254] 
[21:44:33.254] ./src/components/FilterSection.tsx
[21:44:33.254] 49:60  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.254] 
[21:44:33.254] ./src/components/HeroSection.tsx
[21:44:33.254] 23:10  Error: 'windowSize' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[21:44:33.254] 
[21:44:33.256] ./src/components/MobileMenu.tsx
[21:44:33.257] 8:9  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.257] 
[21:44:33.257] ./src/components/ProblemRow.tsx
[21:44:33.257] 20:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.257] 
[21:44:33.257] ./src/components/ProgressStats.tsx
[21:44:33.257] 12:28  Error: 'sessionLoading' is assigned a value but never used.  @typescript-eslint/no-unused-vars
[21:44:33.257] 
[21:44:33.257] ./src/lib/authStore.ts
[21:44:33.257] 4:10  Error: 'useRouter' is defined but never used.  @typescript-eslint/no-unused-vars
[21:44:33.257] 
[21:44:33.257] ./src/lib/useNavbar.ts
[21:44:33.257] 6:36  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.257] 9:56  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.257] 
[21:44:33.261] ./src/store/store.ts
[21:44:33.261] 25:20  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.262] 26:34  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
[21:44:33.262] 
[21:44:33.262] info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
[21:44:33.290] Error: Command "npm run build" exited with 1
[21:44:34.032] 