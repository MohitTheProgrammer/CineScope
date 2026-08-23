import { useState, type ReactNode } from "react";
import { NavLink } from "react-router-dom";

import ThemeSwitcher from "./ThemeSwitcher";
import MovieSearch from "./MovieSearch";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser()

  console.log({ user })



  const closeMenu = () => {
    setMenuOpen(false);
  };

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
                backdrop-blur-2xl
            "
    >
      {/* ---------------------------------------------------------------- */}
      {/* Main Navbar                                                       */}
      {/* ---------------------------------------------------------------- */}

      <nav
        className="
                    mx-auto
                    flex
                    h-20
                    max-w-7xl
                    items-center
                    gap-4
                    px-5
                    sm:px-6
                    lg:px-8
                "
      >
        {/* Logo */}

        <Logo />

        {/* ------------------------------------------------------------ */}
        {/* Desktop Navigation                                           */}
        {/* ------------------------------------------------------------ */}

        <div
          className="
    ml-8
    hidden
    items-center
    gap-8
    lg:flex
"
        >
          <NavItem
            to="/"
            end
          >
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

        {/* ------------------------------------------------------------ */}
        {/* Right Side                                                     */}
        {/* ------------------------------------------------------------ */}

        <div
          className="
                        ml-auto
                        flex
                        items-center
                        gap-2
                        sm:gap-3
                    "
        >
          {/* Search - Desktop */}
          <div className="hidden lg:block">
            <MovieSearch />
          </div>

          <div className="hidden lg:block">
            <ThemeSwitcher />
          </div>

          {/* Profile - Desktop */}
          <NavLink to={"/Profile"}>
            <IconButton
              label="Profile"
              className="hidden lg:flex"
            >
              <UserIcon />
            </IconButton>
          </NavLink>
          {/* Sign In - Desktop */}
          <NavLink to={"/login"}>
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
                            lg:block
                        "
            >

              Sign In
            </button>
          </NavLink>

          {/* -------------------------------------------------------- */}
          {/* Hamburger                                                 */}
          {/* -------------------------------------------------------- */}

          <IconButton
            label={
              menuOpen
                ? "Close menu"
                : "Open menu"
            }
            onClick={() =>
              setMenuOpen((open) => !open)
            }
            className="lg:hidden"
          >
            {menuOpen ? (
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* Bottom Accent Line                                                */}
      {/* ---------------------------------------------------------------- */}

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

      {/* ---------------------------------------------------------------- */}
      {/* Mobile Menu                                                       */}
      {/* ---------------------------------------------------------------- */}

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
      />
    </header>
  );
};

/* ========================================================================== */
/* Logo                                                                       */
/* ========================================================================== */

const Logo = () => {
  return (
    <NavLink
      to="/"
      aria-label="CineScope home"
      className="
                group
                flex
                shrink-0
                items-center
                gap-2
            "
    >
      <span
        className="
                    text-xl
                    font-black
                    tracking-[-0.06em]
                    text-white
                    sm:text-2xl
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
                    shrink-0
                    rounded-full
                    bg-(--accent-secondary)
                    shadow-[0_0_10px_var(--accent-secondary)]
                "
      />
    </NavLink>
  );
};

/* ========================================================================== */
/* Desktop Navigation Item                                                    */
/* ========================================================================== */

interface NavItemProps {
  to: string;
  children: ReactNode;
  end?: boolean;
}

const NavItem = ({
  to,
  children,
  end = false,
}: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
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
          <span>
            {children}
          </span>

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

/* ========================================================================== */
/* Mobile Menu                                                                */
/* ========================================================================== */

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu = ({
  open,
  onClose,
}: MobileMenuProps) => {
  return (
    <div
      className={`
                overflow-hidden
                border-t
                border-white/5
                bg-black/95
                backdrop-blur-2xl
                transition-all
                duration-300
                lg:hidden

                ${open
          ? "max-h-175 opacity-100"
          : "max-h-0 border-transparent opacity-0"
        }
            `}
    >
      <div
        className="
                    mx-auto
                    max-w-7xl
                    px-5
                    py-5
                    sm:px-6
                "
      >
        {/* ------------------------------------------------------------ */}
        {/* Search                                                         */}
        {/* ------------------------------------------------------------ */}

        <div className="mb-5">
          <MovieSearch />
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Navigation                                                     */}
        {/* ------------------------------------------------------------ */}

        <div className="flex flex-col">
          <MobileNavItem
            to="/"
            end
            onClick={onClose}
          >
            Discover
          </MobileNavItem>

          <MobileNavItem
            to="/trending"
            onClick={onClose}
          >
            Trending
          </MobileNavItem>

          <MobileNavItem
            to="/my-list"
            onClick={onClose}
          >
            My List
          </MobileNavItem>

          <MobileNavItem
            to="/recommendations"
            onClick={onClose}
          >
            For You
          </MobileNavItem>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Mobile Controls                                                */}
        {/* ------------------------------------------------------------ */}

        <div
          className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/10
                        pt-5
                    "
        >
          {/* Theme */}

          <div
            className="
                            flex
                            items-center
                            gap-3
                        "
          >
            <span
              className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wider
                                text-white/40
                            "
            >
              Theme
            </span>

            <ThemeSwitcher />
          </div>

          {/* Profile + Sign In */}

          <div
            className="
                            flex
                            items-center
                            gap-3
                        "
          >
            <IconButton label="Profile">
              <UserIcon />
            </IconButton>

            <button
              type="button"
              className="
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
                                hover:shadow-[0_0_25px_var(--accent-glow)]
                            "
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================== */
/* Mobile Navigation Item                                                     */
/* ========================================================================== */

interface MobileNavItemProps {
  to: string;
  children: ReactNode;
  end?: boolean;
  onClick: () => void;
}

const MobileNavItem = ({
  to,
  children,
  end = false,
  onClick,
}: MobileNavItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) => `
                relative
                flex
                items-center
                border-b
                border-white/5
                py-4
                text-base
                font-semibold
                transition-all
                duration-300

                ${isActive
          ? "pl-3 text-white"
          : "text-white/50 hover:pl-3 hover:text-white"
        }
            `}
    >
      {({ isActive }) => (
        <>
          {/* Active indicator */}

          <span
            className={`
                            absolute
                            left-0
                            h-5
                            w-0.5
                            rounded-full
                            bg-(--accent-primary)
                            shadow-[0_0_10px_var(--accent-glow)]
                            transition-all
                            duration-300

                            ${isActive
                ? "opacity-100"
                : "opacity-0"
              }
                        `}
          />

          {children}
        </>
      )}
    </NavLink>
  );
};

/* ========================================================================== */
/* Icon Button                                                                */
/* ========================================================================== */

interface IconButtonProps {
  label: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const IconButton = ({
  label,
  children,
  className = "",
  onClick,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`
                flex
                size-10
                shrink-0
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

/* ========================================================================== */
/* Icons                                                                      */
/* ========================================================================== */

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
      <circle
        cx="12"
        cy="8"
        r="4"
      />

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

const CloseIcon = () => {
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
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
};

export default Navbar;