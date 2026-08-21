import type { ReactNode } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          <NavItem href="/" active>
            Discover
          </NavItem>

          <NavItem href="#trending">
            Trending
          </NavItem>

          <NavItem href="#my-list">
            My List
          </NavItem>

          <NavItem href="#recommendations">
            For You
          </NavItem>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          
  <ThemeSwitcher />
          <IconButton label="Search">
            <SearchIcon />
          </IconButton>

          <IconButton
            label="Profile"
            className="hidden sm:flex"
          >
            <UserIcon />
          </IconButton>

          <button
            type="button"
            className="
              hidden
              rounded-full
              border border-(--accent-primary)
              bg-(--accent-primary)
              px-5 py-2.5
              text-sm font-semibold
              text-white
              transition-all duration-300
              hover:scale-105
              hover:shadow-[0_0_25px_var(--accent-glow)]
              sm:block
            "
          >
            Sign In
          </button>

          <IconButton
            label="Open menu"
            className="md:hidden"
          >
            <MenuIcon />
          </IconButton>
        </div>
      </nav>

      {/* Bottom glow */}
      <div
        className="
          mx-auto h-px max-w-7xl
          bg-linear-to-r
          from-transparent
          via-(--accent-primary)
          to-transparent
          opacity-40
        "
      />
    </header>
  );
};

/* -------------------------------------------------------------------------- */
/* Logo                                                                       */
/* -------------------------------------------------------------------------- */

const Logo = () => {
  return (
    <a
      href="/"
      aria-label="CineScope home"
      className="group flex items-center gap-2"
    >
      <span
        className="
          text-2xl
          font-black
          tracking-[-0.06em]
          text-white
        "
      >
        Cine
        <span
          className="
            text-(--accent-primary)
            transition-all
            duration-300
            group-hover:[text-shadow:0_0_18px_var(--accent-glow)]
          "
        >
          Scope
        </span>
      </span>

      <span
        className="
          h-1.5
          w-1.5
          rounded-full
          bg-(--accent-secondary)
          shadow-[0_0_10px_var(--accent-secondary)]
        "
      />
    </a>
  );
};

/* -------------------------------------------------------------------------- */
/* Navigation item                                                            */
/* -------------------------------------------------------------------------- */

interface NavItemProps {
  href: string;
  children: ReactNode;
  active?: boolean;
}

const NavItem = ({
  href,
  children,
  active = false,
}: NavItemProps) => {
  return (
    <a
      href={href}
      className={`
        group
        relative
        py-2
        text-sm
        font-medium
        transition-colors
        duration-300

        ${
          active
            ? "text-white"
            : "text-white/60 hover:text-white"
        }
      `}
    >
      {children}

      <span
        className={`
          absolute
          bottom-0
          left-1/2
          h-px
          -translate-x-1/2
          bg-(--accent-primary)
          shadow-[0_0_8px_var(--accent-primary)]
          transition-all
          duration-300

          ${active ? "w-full" : "w-0 group-hover:w-full"}
        `}
      />
    </a>
  );
};

/* -------------------------------------------------------------------------- */
/* Icon button                                                                */
/* -------------------------------------------------------------------------- */

interface IconButtonProps {
  label: string;
  children: ReactNode;
  className?: string;
}

const IconButton = ({
  label,
  children,
  className = "",
}: IconButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      className={`
        flex
        size-10
        items-center
        justify-center
        rounded-full

        border
        border-white/10

        bg-white/5

        text-white/70

        backdrop-blur-xl

        transition-all
        duration-300

        hover:border-(--accent-primary)
        hover:bg-(--accent-primary)/10
        hover:text-(--accent-primary)
        hover:shadow-[0_0_20px_var(--accent-glow)]

        ${className}
      `}
    >
      {children}
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

const SearchIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4.5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
};

const UserIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.8-4.1 3.5-6 8-6s7.2 1.9 8 6" />
    </svg>
  );
};

const MenuIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
};

export default Navbar;