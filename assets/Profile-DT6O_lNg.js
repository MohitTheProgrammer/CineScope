import{r as e}from"./rolldown-runtime-hePW80VL.js";import{D as t,F as n,J as r,N as i,O as a,P as o,T as s,U as c,Z as l,k as u,o as d,w as f}from"./index-CRLBOGEA.js";import{a as p}from"./userService-Bh8Fop9s.js";var m=e(l(),1),h=t(),g=({user:e,avatar:t,loggingOut:n,onLogout:r})=>(0,h.jsxs)(`section`,{className:`
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
            `,children:[(0,h.jsx)(`div`,{className:`
                    pointer-events-none
                    absolute
                    -right-32
                    -top-32
                    size-72
                    rounded-full
                    bg-(--accent-primary)/10
                    blur-3xl
                `}),(0,h.jsxs)(`div`,{className:`
                    relative
                    flex
                    flex-col
                    gap-8
                    md:flex-row
                    md:items-center
                    md:justify-between
                `,children:[(0,h.jsxs)(`div`,{className:`flex min-w-0 items-center gap-5 sm:gap-7`,children:[(0,h.jsxs)(`div`,{className:`relative shrink-0`,children:[(0,h.jsx)(`div`,{className:`
                                size-24
                                overflow-hidden
                                rounded-full
                                border-2
                                border-(--accent-primary)/60
                                bg-white/5
                                shadow-[0_0_35px_var(--accent-glow)]
                                sm:size-28
                            `,children:(0,h.jsx)(`img`,{src:t.src,alt:e.displayName,className:`
                                    h-full
                                    w-full
                                    object-cover
                                `})}),(0,h.jsx)(`span`,{className:`
                                absolute
                                bottom-1
                                right-1
                                size-4
                                rounded-full
                                border-2
                                border-(--bg-primary)
                                bg-emerald-400
                            `})]}),(0,h.jsxs)(`div`,{className:`min-w-0`,children:[(0,h.jsx)(`p`,{className:`
                                mb-1
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.25em]
                                text-(--accent-primary)
                            `,children:`CineScope Member`}),(0,h.jsx)(`h1`,{className:`
                                truncate
                                text-2xl
                                font-black
                                tracking-tight
                                text-white
                                sm:text-3xl
                            `,children:e.displayName}),(0,h.jsx)(`p`,{className:`
                                mt-1
                                truncate
                                text-sm
                                text-white/45
                            `,children:e.email})]})]}),(0,h.jsx)(`button`,{type:`button`,onClick:r,disabled:n,className:`
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
                    `,children:n?`Logging out...`:`Log out`})]})]}),_=({selectedAvatar:e,onChange:t})=>(0,h.jsxs)(`div`,{className:`mt-7`,children:[(0,h.jsx)(`p`,{className:`
                    mb-4
                    text-xs
                    font-semibold
                    text-white/60
                `,children:`Choose your avatar`}),(0,h.jsx)(`div`,{className:`flex flex-wrap gap-4`,children:s.map(n=>{let r=e===n.id;return(0,h.jsxs)(`button`,{type:`button`,onClick:()=>t(n.id),"aria-label":`Choose avatar ${n.id.replace(`avatar-`,``)}`,"aria-pressed":r,className:`
                                relative
                                size-16
                                overflow-hidden
                                rounded-full
                                border-2
                                transition-all
                                duration-300
                                sm:size-20
                                ${r?`scale-105 border-(--accent-primary) shadow-[0_0_25px_var(--accent-glow)]`:`border-white/10 opacity-60 hover:scale-105 hover:border-white/30 hover:opacity-100`}
                            `,children:[(0,h.jsx)(`img`,{src:n.src,alt:``,className:`
                                    h-full
                                    w-full
                                    object-cover
                                `}),r&&(0,h.jsx)(`span`,{className:`
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        bg-black/30
                                    `,children:(0,h.jsx)(d,{})})]},n.id)})})]}),v=({displayName:e,selectedAvatar:t,saving:n,onDisplayNameChange:r,onAvatarChange:i,onSave:a})=>(0,h.jsxs)(`section`,{className:`
                mt-6
                rounded-3xl
                border
                border-white/10
                bg-white/[0.035]
                p-6
                sm:p-8
            `,children:[(0,h.jsxs)(`div`,{className:`mb-7`,children:[(0,h.jsx)(`p`,{className:`
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-(--accent-primary)
                    `,children:`Profile Settings`}),(0,h.jsx)(`h2`,{className:`
                        mt-2
                        text-2xl
                        font-black
                        text-white
                    `,children:`Customize your profile`})]}),(0,h.jsxs)(`div`,{className:`max-w-xl`,children:[(0,h.jsx)(`label`,{htmlFor:`displayName`,className:`
                        mb-2
                        block
                        text-xs
                        font-semibold
                        text-white/60
                    `,children:`Display name`}),(0,h.jsx)(`input`,{id:`displayName`,type:`text`,value:e,maxLength:40,onChange:e=>r(e.target.value),placeholder:`Your name`,className:`
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
                    `})]}),(0,h.jsx)(_,{selectedAvatar:t,onChange:i}),(0,h.jsx)(`button`,{type:`button`,onClick:a,disabled:n||!e.trim(),className:`
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
                `,children:n?`Saving...`:`Save Changes`})]}),y=()=>(0,h.jsx)(`main`,{className:`
                min-h-screen
                bg-(--bg-primary)
                px-5
                pb-20
                pt-28
                sm:px-6
                lg:px-8
            `,children:(0,h.jsxs)(`div`,{className:`mx-auto max-w-7xl`,children:[(0,h.jsx)(`section`,{className:`
                        animate-pulse
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-6
                        sm:p-8
                        lg:p-10
                    `,children:(0,h.jsxs)(`div`,{className:`
                            flex
                            flex-col
                            gap-6
                            md:flex-row
                            md:items-center
                            md:justify-between
                        `,children:[(0,h.jsxs)(`div`,{className:`flex items-center gap-5`,children:[(0,h.jsx)(`div`,{className:`
                                    size-24
                                    rounded-full
                                    bg-white/10
                                    sm:size-28
                                `}),(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`div`,{className:`
                                        h-3
                                        w-28
                                        rounded
                                        bg-white/10
                                    `}),(0,h.jsx)(`div`,{className:`
                                        mt-3
                                        h-7
                                        w-44
                                        rounded
                                        bg-white/10
                                    `}),(0,h.jsx)(`div`,{className:`
                                        mt-2
                                        h-4
                                        w-52
                                        rounded
                                        bg-white/10
                                    `})]})]}),(0,h.jsx)(`div`,{className:`
                                h-11
                                w-24
                                rounded-xl
                                bg-white/10
                            `})]})}),(0,h.jsxs)(`section`,{className:`
                        mt-6
                        animate-pulse
                        rounded-3xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-6
                        sm:p-8
                    `,children:[(0,h.jsx)(`div`,{className:`h-3 w-28 rounded bg-white/10`}),(0,h.jsx)(`div`,{className:`mt-3 h-7 w-56 rounded bg-white/10`}),(0,h.jsx)(`div`,{className:`mt-8 h-3 w-24 rounded bg-white/10`}),(0,h.jsx)(`div`,{className:`mt-2 h-12 max-w-xl rounded-xl bg-white/10`}),(0,h.jsx)(`div`,{className:`mt-8 h-3 w-28 rounded bg-white/10`}),(0,h.jsx)(`div`,{className:`mt-4 flex gap-4`,children:Array.from({length:6},(e,t)=>(0,h.jsx)(`div`,{className:`
                                        size-16
                                        rounded-full
                                        bg-white/10
                                        sm:size-20
                                    `},t))}),(0,h.jsx)(`div`,{className:`mt-8 h-11 w-32 rounded-xl bg-white/10`})]})]})}),b=[{name:`neon`,label:`Neon`,color:`#ff2da6`},{name:`purple`,label:`Purple`,color:`#a855f7`},{name:`cyan`,label:`Cyan`,color:`#00e5ff`},{name:`red`,label:`Red`,color:`#ff3b3b`},{name:`green`,label:`Green`,color:`#10b981`},{name:`orange`,label:`Orange`,color:`#f59e0b`},{name:`rose`,label:`Rose`,color:`#f43f5e`},{name:`blue`,label:`Blue`,color:`#3b82f6`}],x=()=>{let{theme:e,setTheme:t}=f();return(0,h.jsx)(`div`,{className:`grid grid-cols-2 gap-3 sm:grid-cols-4`,children:b.map(n=>{let r=e===n.name;return(0,h.jsxs)(`button`,{type:`button`,"aria-label":`Switch to ${n.label}`,title:n.label,onClick:()=>t(n.name),className:`
                            group relative flex min-h-24
                            flex-col items-center justify-center
                            rounded-xl border
                            transition-all duration-300

                            ${r?`border-white/25 bg-white/10`:`border-white/8 bg-white/2 hover:border-white/15 hover:bg-white/6`}
                        `,children:[(0,h.jsx)(`span`,{className:`
                                size-8 rounded-full
                                transition-all duration-300

                                ${r?`scale-110`:`group-hover:scale-110`}
                            `,style:{backgroundColor:n.color,boxShadow:r?`0 0 24px ${n.color}70`:`0 0 12px ${n.color}20`}}),(0,h.jsx)(`span`,{className:`
                                mt-3 text-[9px] font-bold
                                uppercase tracking-[0.15em]

                                ${r?`text-white`:`text-white/35 group-hover:text-white/70`}
                            `,children:n.label}),r&&(0,h.jsx)(`span`,{className:`absolute right-2 top-2 size-1.5 rounded-full`,style:{backgroundColor:n.color,boxShadow:`0 0 8px ${n.color}`}})]},n.name)})})},S=`avatar-1`,C=()=>{let e=r(),[t,l]=(0,m.useState)(null),[d,f]=(0,m.useState)(``),[_,b]=(0,m.useState)(S),[C,w]=(0,m.useState)(!0),[T,E]=(0,m.useState)(!1),[D,O]=(0,m.useState)(!1);(0,m.useEffect)(()=>{let t=!1;return(async()=>{let r=a.currentUser;if(!r){e(`/login`,{replace:!0});return}try{let e=c(u,`users`,r.uid),i=await n(e);if(t)return;let a=i.exists()?i.data():{},o={uid:r.uid,displayName:a.displayName??r.displayName??`CineScope User`,email:a.email??r.email??``,avatarId:a.avatarId??S};l(o),f(o.displayName),b(o.avatarId)}catch{return}finally{t||w(!1)}})(),()=>{t=!0}},[e]);let k=async()=>{let e=a.currentUser;if(!e||!t||T)return;let n=d.trim();if(n)try{E(!0),await p(e.uid,n,_),await o(e,{displayName:n}),l(e=>e&&{...e,displayName:n,avatarId:_})}catch{return}finally{E(!1)}},A=async()=>{if(!D)try{O(!0),await i(a),e(`/login`,{replace:!0})}catch{O(!1)}};if(C)return(0,h.jsx)(y,{});if(!t)return null;let j=s.find(e=>e.id===t.avatarId)??s[0];return(0,h.jsx)(`main`,{className:`
                min-h-screen
                bg-(--bg-primary)
                px-5
                pb-20
                pt-28
                sm:px-6
                lg:px-8
            `,children:(0,h.jsxs)(`div`,{className:`mx-auto max-w-7xl`,children:[(0,h.jsx)(g,{user:t,avatar:j,loggingOut:D,onLogout:A}),(0,h.jsx)(v,{displayName:d,selectedAvatar:_,saving:T,onDisplayNameChange:f,onAvatarChange:b,onSave:k}),(0,h.jsxs)(`div`,{className:`rounded-2xl border border-white/10 bg-white/2.5 p-5 sm:p-6 mt-6`,children:[(0,h.jsxs)(`div`,{className:`mb-5`,children:[(0,h.jsx)(`p`,{className:`text-[10px] font-bold uppercase tracking-[0.2em] text-(--accent-primary)`,children:`Appearance`}),(0,h.jsx)(`h3`,{className:`mt-1 text-lg font-bold tracking-tight text-white`,children:`Choose your theme`}),(0,h.jsx)(`p`,{className:`mt-1 text-xs text-white/35`,children:`Personalize the look and feel of CineScope.`})]}),(0,h.jsx)(`div`,{className:`rounded-xl border border-white/8 bg-black/20 p-3 sm:p-4`,children:(0,h.jsx)(x,{})})]})]})})};export{C as default};