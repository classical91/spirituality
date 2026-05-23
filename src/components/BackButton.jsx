// Reusable Back/Home button used by App-level routing.
export default function BackButton({ onClick, label = '← Home' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 font-semibold text-white shadow-xl backdrop-blur-md transition hover:bg-white/20 active:scale-95"
    >
      {label}
    </button>
  );
}
