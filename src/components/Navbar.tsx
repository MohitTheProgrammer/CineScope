import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import MovieSearch from "./MovieSearch";

const Navbar = () => {


  return (
    <header
      className="
                fixed
                inset-x-0
                top-0
                z-50
                border-b
                border-white/5
                bg-black/70
                backdrop-blur-xl
            "
    >
      <nav
        className="
                    mx-auto
                    flex
                    h-20
                    max-w-7xl
                    items-center
                    justify-between
                    px-6
                    lg:px-8
                "
      >
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <NavItem to="/">
            Discover
          </NavItem>

          <NavItem to="/trending">
            Trending
          </NavItem>

          <NavItem to="/my-list">
            My List
          </NavItem>

          <NavItem to="/recommendations">
            For You
          </NavItem>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          {/* <MovieSearch /> */}

          {/* <Search /> */}
          <MovieSearch />

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
                            border
                            border-(--accent-primary)
                            bg-(--accent-primary)
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition-all
                            duration-300
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

      {/* Bottom accent line */}
      <div
        className="
                    mx-auto
                    h-px
                    max-w-7xl
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
    <NavLink
      to="/"
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
                    size-1.5
                    rounded-full
                    bg-(--accent-secondary)
                    shadow-[0_0_10px_var(--accent-secondary)]
                "
      />
    </NavLink>
  );
};

/* -------------------------------------------------------------------------- */
/* Navigation Item                                                            */
/* -------------------------------------------------------------------------- */

interface NavItemProps {
  to: string;
  children: ReactNode;
}

const NavItem = ({ to, children }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) => `
                group
                relative
                flex
                h-10
                items-center
                text-sm
                font-semibold
                transition-colors
                duration-300

                ${isActive
          ? "text-white"
          : "text-white/50 hover:text-white"
        }
            `}
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>

          {/* Active indicator */}
          <span
            className={`
                            absolute
                            -bottom-1
                            left-1/2
                            h-0.5
                            -translate-x-1/2
                            rounded-full
                            bg-(--accent-primary)
                            shadow-[0_0_10px_var(--accent-glow)]
                            transition-all
                            duration-300

                            ${isActive
                ? "w-full opacity-100"
                : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
              }
                        `}
          />
        </>
      )}
    </NavLink>
  );
};

/* -------------------------------------------------------------------------- */
/* Icon Button                                                                */
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
                text-white/60
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