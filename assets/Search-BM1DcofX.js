import{r as e}from"./rolldown-runtime-hePW80VL.js";import{G as t,K as n,T as r,b as i}from"./index-Cx3crzKy.js";import{t as a}from"./MovieCard-JGepdv8F.js";import{o}from"./tmdb-CBdVkwx0.js";var s=e(n(),1),c=e=>{let[t,n]=(0,s.useState)([]),[r,i]=(0,s.useState)(!1),[a,c]=(0,s.useState)(null),[l,u]=(0,s.useState)(0);return(0,s.useEffect)(()=>{if(!e){n([]),i(!1),c(null);return}let t=!0;return(async()=>{try{i(!0),c(null);let r=await o(e);if(!t)return;n(r)}catch{if(!t)return;n([]),c(`Something went wrong while searching for movies.`)}finally{t&&i(!1)}})(),()=>{t=!1}},[e,l]),{movies:t,loading:r,error:a,retry:()=>{u(e=>e+1)}}},l=r(),u=({query:e})=>(0,l.jsxs)(`div`,{className:`mb-10`,children:[(0,l.jsxs)(`div`,{className:`mb-3 flex items-center gap-2`,children:[(0,l.jsx)(`span`,{className:`
                        size-1.5
                        rounded-full
                        bg-(--accent-primary)
                        shadow-[0_0_10px_var(--accent-primary)]
                    `}),(0,l.jsx)(`span`,{className:`
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-(--accent-primary)
                    `,children:`Search`})]}),(0,l.jsxs)(`h1`,{className:`
                    text-3xl
                    font-black
                    tracking-tight
                    text-white
                    sm:text-4xl
                `,children:[`Results for`,` `,(0,l.jsxs)(`span`,{className:`text-(--accent-primary)`,children:[`"`,e,`"`]})]}),(0,l.jsx)(`p`,{className:`mt-2 text-sm text-white/40`,children:`Discover movies matching your search.`})]}),d=({message:e,onRetry:t})=>(0,l.jsxs)(`div`,{className:`
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-10
                text-center
            `,children:[(0,l.jsx)(`p`,{className:`text-sm text-white/50`,children:e}),(0,l.jsx)(`button`,{type:`button`,onClick:t,className:`
                    mt-4
                    font-bold
                    text-(--accent-primary)
                    transition-colors
                    hover:text-white
                    hover:underline
                `,children:`Try again`})]}),f=({movies:e})=>(0,l.jsx)(`div`,{className:`
                grid
                grid-cols-2
                gap-x-5
                gap-y-10
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
            `,children:e.map(e=>(0,l.jsx)(a,{...e,orientation:`vertical`},e.id))}),p=({query:e})=>(0,l.jsxs)(`div`,{className:`py-20 text-center`,children:[(0,l.jsx)(`div`,{className:`
                    mx-auto
                    mb-5
                    flex
                    size-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-white/30
                `,children:(0,l.jsx)(i,{className:`size-5`})}),(0,l.jsx)(`h2`,{className:`text-lg font-bold text-white`,children:`No movies found`}),(0,l.jsxs)(`p`,{className:`mt-2 text-sm text-white/40`,children:[`We couldn't find anything matching "`,e,`".`]})]}),m=()=>(0,l.jsx)(`div`,{className:`
                grid
                grid-cols-2
                gap-x-5
                gap-y-10
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
            `,children:Array.from({length:10}).map((e,t)=>(0,l.jsxs)(`div`,{children:[(0,l.jsx)(`div`,{className:`
                            aspect-2/3
                            animate-pulse
                            rounded-2xl
                            bg-white/5
                        `}),(0,l.jsx)(`div`,{className:`mt-3 h-3 w-3/4 animate-pulse rounded bg-white/5`}),(0,l.jsx)(`div`,{className:`mt-2 h-2 w-1/2 animate-pulse rounded bg-white/5`})]},t))}),h=()=>{let[e]=t(),n=e.get(`query`)?.trim()??``,{movies:r,loading:i,error:a,retry:o}=c(n);return(0,l.jsx)(`main`,{className:`
                min-h-screen
                bg-(--bg-primary)
                px-6
                pb-20
                pt-32
                lg:px-8
            `,children:(0,l.jsxs)(`div`,{className:`mx-auto max-w-7xl`,children:[(0,l.jsx)(u,{query:n}),i&&(0,l.jsx)(m,{}),!i&&a&&(0,l.jsx)(d,{message:a,onRetry:o}),!i&&!a&&r.length>0&&(0,l.jsx)(f,{movies:r}),!i&&!a&&n&&r.length===0&&(0,l.jsx)(p,{query:n})]})})};export{h as default};