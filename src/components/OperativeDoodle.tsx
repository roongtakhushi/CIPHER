import React from 'react';

interface OperativeDoodleProps {
  id: string;
  className?: string;
}

export const OperativeDoodle: React.FC<OperativeDoodleProps> = ({ id, className = 'w-full h-full' }) => {
  switch (id) {
    case 'op-1':
      // Mayank Dantre - President
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Executive Crown / Starburst */}
          <path
            d="M52 48L64 32L80 44L96 32L108 48L102 62H58L52 48Z"
            fill="#FFD84D"
            stroke="#0A0E17"
            strokeWidth="3"
          />
          <circle cx="64" cy="32" r="3" fill="#FF4FA3" />
          <circle cx="80" cy="44" r="3.5" fill="#C6FF3D" stroke="#0A0E17" strokeWidth="1.5" />
          <circle cx="96" cy="32" r="3" fill="#FF4FA3" />
          {/* Coffee Mug */}
          <rect x="54" y="68" width="52" height="54" rx="6" fill="#FFFFFF" stroke="#0A0E17" strokeWidth="3.5" />
          <path d="M58 76C68 78 92 78 102 76" stroke="#D97706" strokeWidth="2.5" />
          {/* Lightning on mug */}
          <path d="M80 82L74 94H82L76 106" stroke="#FF4FA3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Handle */}
          <path d="M106 78C116 78 122 84 122 92C122 100 116 106 106 106" stroke="#0A0E17" strokeWidth="3" />
          {/* Saucer */}
          <path d="M44 122C64 128 96 128 116 122" stroke="#0A0E17" strokeWidth="3.5" />
          {/* Sparkles */}
          <path d="M36 50L40 54M40 50L36 54" stroke="#C6FF3D" strokeWidth="2.5" />
          <path d="M124 50L128 54M128 50L124 54" stroke="#FFD84D" strokeWidth="2.5" />
          <text x="80" y="146" textAnchor="middle" fill="#0A0E17" fontSize="11" fontFamily="'Caveat', cursive" fontWeight="bold">
            leading the council ⚡
          </text>
        </svg>
      );

    case 'op-2':
      // Neha Hidduggi - Secretary
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Parchment Scroll */}
          <path
            d="M38 40C38 32 44 28 54 28L106 28C116 28 122 32 122 40L122 110C122 118 116 122 106 122L54 122C44 122 38 118 38 110Z"
            fill="#FFFFFF"
            stroke="#0A0E17"
            strokeWidth="3.5"
          />
          {/* Text lines */}
          <path d="M50 44H110" stroke="#0A0E17" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M50 56H110" stroke="#0A0E17" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M50 68H94" stroke="#0A0E17" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M50 80H106" stroke="#0A0E17" strokeWidth="2" strokeDasharray="3 3" />
          {/* Wax Seal with Stamp */}
          <circle cx="80" cy="102" r="11" fill="#FF4FA3" stroke="#0A0E17" strokeWidth="2.5" />
          <path d="M76 102L79 105L85 99" stroke="#FFFFFF" strokeWidth="2.5" />
          {/* Feather Quill */}
          <path
            d="M116 34C102 54 78 86 68 106L64 112L70 108C84 98 110 70 124 46C126 42 124 36 120 34C118 33 117 33 116 34Z"
            fill="#C6FF3D"
            stroke="#0A0E17"
            strokeWidth="3"
          />
          <text x="80" y="146" textAnchor="middle" fill="#0A0E17" fontSize="11" fontFamily="'Caveat', cursive" fontWeight="bold">
            records &amp; governance 📜
          </text>
        </svg>
      );

    case 'op-3':
      // Ashitosh Waghmare - Treasurer
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Treasure / Budget Vault Box */}
          <rect x="36" y="52" width="88" height="64" rx="6" fill="#FFFFFF" stroke="#0A0E17" strokeWidth="3.5" />
          {/* Vault dial */}
          <circle cx="80" cy="84" r="16" fill="#F3EFE3" stroke="#0A0E17" strokeWidth="3" />
          <circle cx="80" cy="84" r="5" fill="#FF4FA3" stroke="#0A0E17" strokeWidth="2" />
          <path d="M80 68V74M80 94V100M64 84H70M90 84H96" stroke="#0A0E17" strokeWidth="2.5" />
          {/* Gold Coin Stacks */}
          <ellipse cx="50" cy="40" rx="14" ry="6" fill="#FFD84D" stroke="#0A0E17" strokeWidth="2" />
          <ellipse cx="50" cy="34" rx="14" ry="6" fill="#FFD84D" stroke="#0A0E17" strokeWidth="2" />
          <text x="50" y="37" textAnchor="middle" fill="#0A0E17" fontSize="9" fontWeight="bold">₹</text>
          {/* Sparkles */}
          <circle cx="120" cy="40" r="3" fill="#C6FF3D" />
          <path d="M112 32L116 36M116 32L112 36" stroke="#FF4FA3" strokeWidth="2" />
          <text x="80" y="142" textAnchor="middle" fill="#0A0E17" fontSize="11" fontFamily="'Caveat', cursive" fontWeight="bold">
            fiscal fuel &amp; bounties 💰
          </text>
        </svg>
      );

    case 'op-4':
      // Zaki Shahpure - Tech Lead
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Rocket Body */}
          <path
            d="M80 18C64 36 60 76 60 92L100 92C100 76 96 36 80 18Z"
            fill="#FFFFFF"
            stroke="#0A0E17"
            strokeWidth="3.5"
          />
          {/* Rocket Nose Tip */}
          <path d="M80 18C74 27 72 38 72 44H88C88 38 86 27 80 18Z" fill="#FF4FA3" />
          {/* Porthole */}
          <circle cx="80" cy="62" r="10" fill="#C6FF3D" stroke="#0A0E17" strokeWidth="3" />
          <circle cx="80" cy="62" r="5" fill="#0A0E17" />
          {/* Wings */}
          <path d="M60 74L42 94L60 92Z" fill="#FFD84D" stroke="#0A0E17" strokeWidth="3" />
          <path d="M100 74L118 94L100 92Z" fill="#FFD84D" stroke="#0A0E17" strokeWidth="3" />
          {/* Flames */}
          <path
            d="M66 94C66 112 74 126 74 126C74 126 80 114 80 110C80 114 86 126 86 126C86 126 94 112 94 94Z"
            fill="#FF4FA3"
            stroke="#0A0E17"
            strokeWidth="2.5"
          />
          <path d="M72 94C72 106 80 118 80 118C80 118 88 106 88 94Z" fill="#FFD84D" />
          {/* Lightning bolt badges */}
          <path d="M26 82L34 70H28L36 58" stroke="#C6FF3D" strokeWidth="3" />
          <path d="M134 82L126 70H132L124 58" stroke="#C6FF3D" strokeWidth="3" />
          <text x="80" y="148" textAnchor="middle" fill="#0A0E17" fontSize="11" fontFamily="'Caveat', cursive" fontWeight="bold">
            git push --force 🚀
          </text>
        </svg>
      );

    case 'op-5':
      // Hardavi Mangar - Management Lead
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stopwatch Ring */}
          <circle cx="80" cy="78" r="44" fill="#FFFFFF" stroke="#0A0E17" strokeWidth="4" />
          <line x1="80" y1="38" x2="80" y2="44" stroke="#0A0E17" strokeWidth="3" />
          <line x1="80" y1="112" x2="80" y2="118" stroke="#0A0E17" strokeWidth="3" />
          <line x1="40" y1="78" x2="46" y2="78" stroke="#0A0E17" strokeWidth="3" />
          <line x1="114" y1="78" x2="120" y2="78" stroke="#0A0E17" strokeWidth="3" />
          {/* Clock Hands pointing to 24-hr sprint */}
          <line x1="80" y1="78" x2="80" y2="52" stroke="#FF4FA3" strokeWidth="3.5" />
          <line x1="80" y1="78" x2="102" y2="78" stroke="#0A0E17" strokeWidth="3.5" />
          <circle cx="80" cy="78" r="4" fill="#C6FF3D" stroke="#0A0E17" strokeWidth="2" />
          {/* Top Button */}
          <path d="M72 30H88M80 30V34" stroke="#0A0E17" strokeWidth="3.5" />
          {/* Clipboard tick marks */}
          <path d="M26 68C22 74 22 82 26 88" stroke="#FFD84D" strokeWidth="3" />
          <path d="M134 68C138 74 138 82 134 88" stroke="#FFD84D" strokeWidth="3" />
          <text x="80" y="146" textAnchor="middle" fill="#0A0E17" fontSize="11" fontFamily="'Caveat', cursive" fontWeight="bold">
            24hr sprint clock ⏱️
          </text>
        </svg>
      );

    case 'op-6':
      // Payal Desale - PR Lead
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Megaphone Body */}
          <path
            d="M48 68L84 52L84 100L48 84H36C32 84 30 82 30 78V74C30 70 32 68 36 68H48Z"
            fill="#FFFFFF"
            stroke="#0A0E17"
            strokeWidth="3.5"
          />
          {/* Megaphone Cone Flange */}
          <ellipse cx="84" cy="76" rx="6" ry="24" fill="#FF4FA3" stroke="#0A0E17" strokeWidth="3" />
          {/* Handle */}
          <path d="M52 84L48 108" stroke="#0A0E17" strokeWidth="4" />
          {/* Sound Waves */}
          <path d="M98 62C106 68 106 84 98 90" stroke="#FFD84D" strokeWidth="3" />
          <path d="M108 52C120 64 120 88 108 100" stroke="#C6FF3D" strokeWidth="3.5" />
          {/* Sparkles */}
          <circle cx="128" cy="76" r="3" fill="#FF4FA3" />
          <text x="80" y="142" textAnchor="middle" fill="#0A0E17" fontSize="11" fontFamily="'Caveat', cursive" fontWeight="bold">
            broadcast &amp; outreach 📢
          </text>
        </svg>
      );

    case 'op-7':
      // Shreya Dhamankar - Design Lead
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Wooden Artist Palette */}
          <path
            d="M80 24C46 24 24 46 24 76C24 102 44 124 72 124C86 124 94 114 104 114C114 114 122 120 134 112C144 104 142 86 136 72C130 56 120 40 102 30C95 26 88 24 80 24Z"
            fill="#FFFFFF"
            stroke="#0A0E17"
            strokeWidth="3.5"
          />
          {/* Thumbhole */}
          <ellipse cx="116" cy="94" rx="8" ry="11" fill="#F3EFE3" stroke="#0A0E17" strokeWidth="3" />
          {/* Color Dollops */}
          <circle cx="48" cy="54" r="7" fill="#FF4FA3" stroke="#0A0E17" strokeWidth="2" />
          <circle cx="70" cy="42" r="7" fill="#C6FF3D" stroke="#0A0E17" strokeWidth="2" />
          <circle cx="96" cy="46" r="7" fill="#FFD84D" stroke="#0A0E17" strokeWidth="2" />
          <circle cx="46" cy="82" r="7" fill="#0A0E17" />
          {/* Paint Brush */}
          <path d="M128 32L100 80" stroke="#0A0E17" strokeWidth="4" />
          <path d="M128 32L138 20C140 18 144 20 142 24L134 36" fill="#D97706" stroke="#0A0E17" strokeWidth="2" />
          <circle cx="140" cy="18" r="3" fill="#FF4FA3" />
          <text x="80" y="148" textAnchor="middle" fill="#0A0E17" fontSize="11" fontFamily="'Caveat', cursive" fontWeight="bold">
            creative UI/UX magic 🎨
          </text>
        </svg>
      );

    case 'op-8':
      // Yash Deshpande - Social Media Lead
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Smartphone device */}
          <rect x="52" y="24" width="56" height="96" rx="8" fill="#FFFFFF" stroke="#0A0E17" strokeWidth="3.5" />
          <rect x="58" y="36" width="44" height="68" fill="#181B25" />
          {/* Phone speaker & home pill */}
          <line x1="72" y1="30" x2="88" y2="30" stroke="#0A0E17" strokeWidth="2" />
          <circle cx="80" cy="112" r="3" fill="#0A0E17" />
          {/* Heart & Hashtag */}
          <path
            d="M80 56C80 56 74 50 69 54C64 58 69 65 80 72C91 65 96 58 91 54C86 50 80 56 80 56Z"
            fill="#FF4FA3"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <text x="80" y="90" textAnchor="middle" fill="#C6FF3D" fontSize="12" fontWeight="bold" fontFamily="monospace">
            #CIPHER
          </text>
          {/* Antenna / Broadcast waves */}
          <path d="M38 48C30 56 30 68 38 76" stroke="#FFD84D" strokeWidth="2.5" />
          <path d="M122 48C130 56 130 68 122 76" stroke="#FFD84D" strokeWidth="2.5" />
          <text x="80" y="142" textAnchor="middle" fill="#0A0E17" fontSize="11" fontFamily="'Caveat', cursive" fontWeight="bold">
            viral frequency &amp; reach 📱
          </text>
        </svg>
      );

    case 'op-9':
    default:
      // Karunya - Sport Lead
      return (
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Championship Trophy */}
          <path
            d="M58 40H102V70C102 82 92 92 80 92C68 92 58 82 58 70V40Z"
            fill="#FFD84D"
            stroke="#0A0E17"
            strokeWidth="3.5"
          />
          {/* Trophy Handles */}
          <path d="M58 48H44C38 48 36 54 36 60C36 68 44 72 58 72" stroke="#0A0E17" strokeWidth="3" />
          <path d="M102 48H116C122 48 124 54 124 60C124 68 116 72 102 72" stroke="#0A0E17" strokeWidth="3" />
          {/* Trophy Stem & Base */}
          <path d="M80 92V106M64 106H96M60 114H100" stroke="#0A0E17" strokeWidth="3.5" />
          <rect x="60" y="106" width="40" height="8" fill="#FFFFFF" stroke="#0A0E17" strokeWidth="2" />
          {/* Star on trophy */}
          <circle cx="80" cy="62" r="7" fill="#C6FF3D" stroke="#0A0E17" strokeWidth="2" />
          {/* Lightning stamina bolts */}
          <path d="M34 94L42 82H36L44 70" stroke="#FF4FA3" strokeWidth="2.5" />
          <path d="M126 94L118 82H124L116 70" stroke="#FF4FA3" strokeWidth="2.5" />
          <text x="80" y="142" textAnchor="middle" fill="#0A0E17" fontSize="11" fontFamily="'Caveat', cursive" fontWeight="bold">
            athletic stamina &amp; drive ⚡
          </text>
        </svg>
      );
  }
};
