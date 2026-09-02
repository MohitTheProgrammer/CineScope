import{r as e}from"./rolldown-runtime-hePW80VL.js";import{B as t,D as n,E as r,O as i,P as a,W as o,k as s,o as c,q as l,w as u,z as d}from"./index-DgQ_4D70.js";import{i as f}from"./userService-GHevR2W9.js";var p=e(l(),1),m=r(),h=({user:e,avatar:t,loggingOut:n,onLogout:r})=>(0,m.jsxs)(`section`,{className:`
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.035]
                p-6
                shadow-[0_20px_80px_rgba(0,0,0,0.35)]
                sm:p-8
                lg:p-10
            `,children:[(0,m.jsx)(`div`,{className:`
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    size-72
                    rounded-full
                    bg-(--accent-primary)/10
                    blur-3xl
                `}),(0,m.jsxs)(`div`,{className:`
                    relative
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-center
                    md:justify-between
                `,children:[(0,m.jsxs)(`div`,{className:`flex min-w-0 items-center gap-5 sm:gap-7`,children:[(0,m.jsxs)(`div`,{className:`relative shrink-0`,children:[(0,m.jsx)(`div`,{className:`
                                size-24
                                overflow-hidden
                                rounded-full
                                border-2
                                border-(--accent-primary)/60
                                bg-white/5
                                shadow-[0_0_35px_var(--accent-glow)]
                                sm:size-28
                            `,children:(0,m.jsx)(`img`,{src:t.src,alt:e.displayName,className:`
                                    h-full
                                    w-full
                                    object-cover
                                `})}),(0,m.jsx)(`span`,{className:`
                                absolute
                                bottom-1
                                right-1
                                size-4
                                rounded-full
                                border-2
                                border-(--bg-primary)
                                bg-emerald-400
                            `})]}),(0,m.jsxs)(`div`,{className:`min-w-0`,children:[(0,m.jsx)(`p`,{className:`
                                mb-1
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.25em]
                                text-(--accent-primary)
                            `,children:`CineScope Member`}),(0,m.jsx)(`h1`,{className:`
                                truncate
                                text-2xl
                                font-black
                                tracking-tight
                                text-white
                                sm:text-3xl
                            `,children:e.displayName}),(0,m.jsx)(`p`,{className:`
                                mt-1
                                truncate
                                text-sm
                                text-white/45
                            `,children:e.email})]})]}),(0,m.jsx)(`button`,{type:`button`,onClick:r,disabled:n,className:`
                        shrink-0
                        rounded-xl
                        border
                        border-red-500/20
                        bg-red-500/5
                        px-5
                        py-3
                        text-sm
                        font-bold
                        text-red-400
                        transition-all
                        duration-300
                        hover:border-red-500/40
                        hover:bg-red-500/10
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    `,children:n?`Logging out...`:`Log out`})]})]}),g=[{id:`avatar-1`,src:`/CineScope/avatars/avatar-1.png`},{id:`avatar-2`,src:`/CineScope/avatars/avatar-2.png`},{id:`avatar-3`,src:`/CineScope/avatars/avatar-3.png`},{id:`avatar-4`,src:`/CineScope/avatars/avatar-4.png`},{id:`avatar-5`,src:`/CineScope/avatars/avatar-5.png`},{id:`avatar-6`,src:`/CineScope/avatars/avatar-6.png`}],_=({selectedAvatar:e,onChange:t})=>(0,m.jsxs)(`div`,{className:`mt-7`,children:[(0,m.jsx)(`p`,{className:`
                    mb-4
                    text-xs
                    font-semibold
                    text-white/60
                `,children:`Choose your avatar`}),(0,m.jsx)(`div`,{className:`flex flex-wrap gap-4`,children:g.map(n=>{let r=e===n.id;return(0,m.jsxs)(`button`,{type:`button`,onClick:()=>t(n.id),"aria-label":`Choose avatar ${n.id.replace(`avatar-`,``)}`,"aria-pressed":r,className:`
                                relative
                                size-16
                                overflow-hidden
                                rounded-full
                                border-2
                                transition-all
                                duration-300
                                sm:size-20
                                ${r?`scale-105 border-(--accent-primary) shadow-[0_0_25px_var(--accent-glow)]`:`border-white/10 opacity-60 hover:scale-105 hover:border-white/30 hover:opacity-100`}
                            `,children:[(0,m.jsx)(`img`,{src:n.src,alt:``,className:`
                                    h-full
                                    w-full
                                    object-cover
                                `}),r&&(0,m.jsx)(`span`,{className:`
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        bg-black/30
                                    `,children:(0,m.jsx)(c,{})})]},n.id)})})]}),v=({displayName:e,selectedAvatar:t,saving:n,onDisplayNameChange:r,onAvatarChange:i,onSave:a})=>(0,m.jsxs)(`section`,{className:`
                mt-6
                rounded-3xl
                border
                border-white/10
                bg-white/[0.035]
                p-6
                sm:p-8
            `,children:[(0,m.jsxs)(`div`,{className:`mb-7`,children:[(0,m.jsx)(`p`,{className:`
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-(--accent-primary)
                    `,children:`Profile Settings`}),(0,m.jsx)(`h2`,{className:`
                        mt-2
                        text-2xl
                        font-black
                        text-white
                    `,children:`Customize your profile`})]}),(0,m.jsxs)(`div`,{className:`max-w-xl`,children:[(0,m.jsx)(`label`,{htmlFor:`displayName`,className:`
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-white/60
                    `,children:`Display name`}),(0,m.jsx)(`input`,{id:`displayName`,type:`text`,value:e,maxLength:40,onChange:e=>r(e.target.value),placeholder:`Your name`,className:`
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-(--bg-primary)
                        px-4
                        py-3
                        text-sm
                        text-white
                        outline-none
                        transition-all
                        placeholder:text-white/25
                        hover:border-white/20
                        focus:border-(--accent-primary)/60
                        focus:ring-1
                        focus:ring-(--accent-primary)/30
                    `})]}),(0,m.jsx)(_,{selectedAvatar:t,onChange:i}),(0,m.jsx)(`button`,{type:`button`,onClick:a,disabled:n||!e.trim(),className:`
                    mt-8
                    inline-flex
                    min-w-32
                    items-center
                    justify-center
                    rounded-xl
                    bg-(--accent-primary)
                    px-6
                    py-3
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_0_25px_var(--accent-glow)]
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                    hover:brightness-110
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    disabled:hover:scale-100
                `,children:n?`Saving...`:`Save Changes`})]}),y=()=>(0,m.jsx)(`main`,{className:`
                min-h-screen
                bg-(--bg-primary)
                px-5
                pb-20
                pt-28
                sm:px-6
                lg:px-8
            `,children:(0,m.jsxs)(`div`,{className:`mx-auto max-w-7xl`,children:[(0,m.jsx)(`section`,{className:`
                        animate-pulse
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-6
                        sm:p-8
                        lg:p-10
                    `,children:(0,m.jsxs)(`div`,{className:`
                            flex
                            flex-col
                            gap-6
                            md:flex-row
                            md:items-center
                            md:justify-between
                        `,children:[(0,m.jsxs)(`div`,{className:`flex items-center gap-5`,children:[(0,m.jsx)(`div`,{className:`
                                    size-24
                                    rounded-full
                                    bg-white/10
                                    sm:size-28
                                `}),(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`div`,{className:`
                                        h-3
                                        w-28
                                        rounded
                                        bg-white/10
                                    `}),(0,m.jsx)(`div`,{className:`
                                        mt-3
                                        h-7
                                        w-44
                                        rounded
                                        bg-white/10
                                    `}),(0,m.jsx)(`div`,{className:`
                                        mt-2
                                        h-4
                                        w-52
                                        rounded
                                        bg-white/10
                                    `})]})]}),(0,m.jsx)(`div`,{className:`
                                h-11
                                w-24
                                rounded-xl
                                bg-white/10
                            `})]})}),(0,m.jsxs)(`section`,{className:`
                        mt-6
                        animate-pulse
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-6
                        sm:p-8
                    `,children:[(0,m.jsx)(`div`,{className:`h-3 w-28 rounded bg-white/10`}),(0,m.jsx)(`div`,{className:`mt-3 h-7 w-56 rounded bg-white/10`}),(0,m.jsx)(`div`,{className:`mt-8 h-3 w-24 rounded bg-white/10`}),(0,m.jsx)(`div`,{className:`mt-2 h-12 max-w-xl rounded-xl bg-white/10`}),(0,m.jsx)(`div`,{className:`mt-8 h-3 w-28 rounded bg-white/10`}),(0,m.jsx)(`div`,{className:`mt-4 flex gap-4`,children:Array.from({length:6},(e,t)=>(0,m.jsx)(`div`,{className:`
                                        size-16
                                        rounded-full
                                        bg-white/10
                                        sm:size-20
                                    `},t))}),(0,m.jsx)(`div`,{className:`mt-8 h-11 w-32 rounded-xl bg-white/10`})]})]})}),b=[{name:`neon`,label:`Neon Pink`},{name:`purple`,label:`Electric Purple`},{name:`cyan`,label:`Cyber Cyan`},{name:`red`,label:`Crimson`}],x=()=>{let{theme:e,setTheme:t}=u();return(0,m.jsx)(`div`,{className:`grid grid-cols-2 gap-3 sm:grid-cols-4`,children:b.map(n=>{let r=e===n.name,i=n.name===`neon`?`#ff2da6`:n.name===`purple`?`#a855f7`:n.name===`cyan`?`#00e5ff`:`#ff3b3b`;return(0,m.jsxs)(`button`,{type:`button`,"aria-label":`Switch to ${n.label}`,title:n.label,onClick:()=>t(n.name),className:`
                            group relative flex min-h-24
                            flex-col items-center justify-center
                            rounded-xl border
                            transition-all duration-300
                            ${r?`border-white/25 bg-white/10`:`border-white/8 bg-white/2 hover:border-white/15 hover:bg-white/6`}
                        `,children:[(0,m.jsx)(`span`,{className:`
                                size-8 rounded-full
                                transition-all duration-300
                                ${r?`scale-110`:`group-hover:scale-110`}
                            `,style:{backgroundColor:i,boxShadow:r?`0 0 24px ${i}70`:`0 0 12px ${i}20`}}),(0,m.jsx)(`span`,{className:`
                                mt-3 text-[9px] font-bold uppercase
                                tracking-[0.15em]
                                ${r?`text-white`:`text-white/35 group-hover:text-white/70`}
                            `,children:n.label}),r&&(0,m.jsx)(`span`,{className:`absolute right-2 top-2 size-1.5 rounded-full`,style:{backgroundColor:i,boxShadow:`0 0 8px ${i}`}})]},n.name)})})},S=`avatar-1`,C=()=>{let e=o(),[r,c]=(0,p.useState)(null),[l,u]=(0,p.useState)(``),[_,b]=(0,p.useState)(S),[C,w]=(0,p.useState)(!0),[T,E]=(0,p.useState)(!1),[D,O]=(0,p.useState)(!1);(0,p.useEffect)(()=>{let t=!1;return(async()=>{let r=n.currentUser;if(!r){e(`/login`,{replace:!0});return}try{let e=a(i,`users`,r.uid),n=await s(e);if(t)return;let o=n.exists()?n.data():{},l={uid:r.uid,displayName:o.displayName??r.displayName??`CineScope User`,email:o.email??r.email??``,avatarId:o.avatarId??S};c(l),u(l.displayName),b(l.avatarId)}catch{return}finally{t||w(!1)}})(),()=>{t=!0}},[e]);let k=async()=>{let e=n.currentUser;if(!e||!r||T)return;let i=l.trim();if(i)try{E(!0),await f(e.uid,i,_),await t(e,{displayName:i}),c(e=>e&&{...e,displayName:i,avatarId:_})}catch{return}finally{E(!1)}},A=async()=>{if(!D)try{O(!0),await d(n),e(`/login`,{replace:!0})}catch{O(!1)}};if(C)return(0,m.jsx)(y,{});if(!r)return null;let j=g.find(e=>e.id===r.avatarId)??g[0];return(0,m.jsx)(`main`,{className:`
                min-h-screen
                bg-(--bg-primary)
                px-5
                pb-20
                pt-28
                sm:px-6
                lg:px-8
            `,children:(0,m.jsxs)(`div`,{className:`mx-auto max-w-7xl`,children:[(0,m.jsx)(h,{user:r,avatar:j,loggingOut:D,onLogout:A}),(0,m.jsx)(v,{displayName:l,selectedAvatar:_,saving:T,onDisplayNameChange:u,onAvatarChange:b,onSave:k}),(0,m.jsxs)(`div`,{className:`rounded-2xl border border-white/10 bg-white/2.5 p-5 sm:p-6 mt-6`,children:[(0,m.jsxs)(`div`,{className:`mb-5`,children:[(0,m.jsx)(`p`,{className:`text-[10px] font-bold uppercase tracking-[0.2em] text-(--accent-primary)`,children:`Appearance`}),(0,m.jsx)(`h3`,{className:`mt-1 text-lg font-bold tracking-tight text-white`,children:`Choose your theme`}),(0,m.jsx)(`p`,{className:`mt-1 text-xs text-white/35`,children:`Personalize the look and feel of CineScope.`})]}),(0,m.jsx)(`div`,{className:`rounded-xl border border-white/8 bg-black/20 p-3 sm:p-4`,children:(0,m.jsx)(x,{})})]})]})})};export{C as default};