import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low py-stack-lg border-t border-outline-variant/30 mt-auto">
      <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row items-center justify-between gap-stack-md">
        <div className="text-on-surface-variant font-label-md text-caption">
          © 2024 Nyaya AI. Judicial Excellence.
        </div>
        <nav className="flex flex-wrap gap-gutter items-center justify-center">
          <Link className="text-caption text-on-surface-variant hover:text-primary transition-colors" to="/#privacy">
            Privacy
          </Link>
          <Link className="text-caption text-on-surface-variant hover:text-primary transition-colors" to="/#terms">
            Terms
          </Link>
          <Link className="text-caption text-on-surface-variant hover:text-primary transition-colors" to="/#sources">
            Sources
          </Link>
          <Link className="text-caption text-on-surface-variant hover:text-primary transition-colors" to="/#contact">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
