const Icon = ({ d, size = 16, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
    <path d={d} />
  </svg>
);

export const StarIcon    = (p) => <Icon {...p} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
export const ForkIcon    = (p) => <Icon {...p} d="M7 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM12 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 7v4m10-4v4M7 11c0 2.76 2.24 5 5 5h0c2.76 0 5-2.24 5-5" />;
export const EyeIcon     = (p) => <Icon {...p} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zm11-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />;
export const CommitIcon  = (p) => <Icon {...p} d="M16 12a4 4 0 0 1-8 0 4 4 0 0 1 8 0zM12 2v6M12 16v6" />;
export const IssueIcon   = (p) => <Icon {...p} d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 5v6M12 17h.01" />;
export const SearchIcon  = (p) => <Icon {...p} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />;
export const VoiceIcon   = (p) => <Icon {...p} d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />;
export const MoonIcon    = (p) => <Icon {...p} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
export const SunIcon     = (p) => <Icon {...p} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z" />;
export const CopyIcon    = (p) => <Icon {...p} d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M8 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2H8z" />;
export const LinkIcon    = (p) => <Icon {...p} d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />;
export const CloseIcon   = (p) => <Icon {...p} d="M18 6L6 18M6 6l12 12" />;
export const BookIcon    = (p) => <Icon {...p} d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />;
export const CodeIcon    = (p) => <Icon {...p} d="M16 18l6-6-6-6M8 6l-6 6 6 6" />;
export const ClockIcon   = (p) => <Icon {...p} d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 5v5l3 3" />;
export const UserIcon    = (p) => <Icon {...p} d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />;
export const SparkleIcon = (p) => <Icon {...p} d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM5 17l.75 2.25L8 20l-2.25.75L5 23l-.75-2.25L2 20l2.25-.75L5 17zM19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75L19 3z" />;
export const StackIcon   = (p) => <Icon {...p} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />;
export const TreeIcon    = (p) => <Icon {...p} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />;
export const TrashIcon   = (p) => <Icon {...p} d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />;
export const ChevronIcon = (p) => <Icon {...p} d="M9 18l6-6-6-6" />;
export const SendIcon    = (p) => <Icon {...p} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />;
export const KeyIcon     = (p) => <Icon {...p} d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />;
export const HistoryIcon = (p) => <Icon {...p} d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 5v5l4 2" />;
export const CheckIcon   = (p) => <Icon {...p} d="M20 6L9 17l-5-5" />;
export const FileIcon    = (p) => <Icon {...p} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM14 2v6h6" />;
export const ArrowIcon   = (p) => <Icon {...p} d="M5 12h14M12 5l7 7-7 7" />;
