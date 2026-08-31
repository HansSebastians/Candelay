export function Logo() {
    return (
        <>
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="nav_bar" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#c44dff" />
                        <stop offset="50%" stopColor="#7b2ff7" />
                        <stop offset="100%" stopColor="#00c6ff" />
                    </linearGradient>
                </defs>
                <rect x="0" y="10" width="3.2" height="8" rx="1.6" fill="url(#nav_bar)" />
                <rect x="5" y="6" width="3.2" height="16" rx="1.6" fill="url(#nav_bar)" />
                <rect x="10" y="2" width="3.2" height="24" rx="1.6" fill="url(#nav_bar)" />
                <rect x="15" y="0" width="3.2" height="28" rx="1.6" fill="url(#nav_bar)" />
                <rect x="20" y="2" width="3.2" height="24" rx="1.6" fill="url(#nav_bar)" />
                <rect x="25" y="6" width="3.2" height="16" rx="1.6" fill="url(#nav_bar)" />
                <rect x="30" y="10" width="3.2" height="8" rx="1.6" fill="url(#nav_bar)" />
            </svg>
        </>
    )
}

export function ArrowIcon() {
    return (
        <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
        </svg>
    )
};

