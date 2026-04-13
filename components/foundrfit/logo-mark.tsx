type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="foundrfit-blue" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#39b7ea" />
          <stop offset="100%" stopColor="#015aa1" />
        </linearGradient>
        <linearGradient id="foundrfit-green" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#83d33f" />
          <stop offset="100%" stopColor="#30a045" />
        </linearGradient>
      </defs>

      <circle cx="20" cy="11.5" fill="url(#foundrfit-blue)" r="6" />
      <circle cx="44" cy="11.5" fill="url(#foundrfit-green)" r="6" />

      <path
        d="M5.5 21.5C5.5 18.7 7.7 16.5 10.5 16.5H30C30.6 16.5 31 16.9 31 17.5V24.5C31 25.1 30.6 25.5 30 25.5H17.8C15.7 25.5 14 27.2 14 29.3V38.5L7.4 32.8C6.2 31.8 5.5 30.3 5.5 28.7V21.5Z"
        fill="url(#foundrfit-blue)"
      />
      <path
        d="M58.5 21.5C58.5 18.7 56.3 16.5 53.5 16.5H34C33.4 16.5 33 16.9 33 17.5V24.5C33 25.1 33.4 25.5 34 25.5H46.2C48.3 25.5 50 27.2 50 29.3V38.5L56.6 32.8C57.8 31.8 58.5 30.3 58.5 28.7V21.5Z"
        fill="url(#foundrfit-green)"
      />

      <path d="M17 28.5V41L31 52.5V40.5L17 28.5Z" fill="url(#foundrfit-blue)" />
      <path d="M47 28.5V41L33 52.5V40.5L47 28.5Z" fill="url(#foundrfit-green)" />
      <path d="M31 24.5H33V53.5H31V24.5Z" fill="#ffffff" />
    </svg>
  );
}
