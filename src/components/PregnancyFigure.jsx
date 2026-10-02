/**
 * Original illustration: an expectant mother in profile (kurta, leggings, long braid)
 * whose bump and baby grow with the month (1–9). Pure SVG, brand colours.
 *
 * To use a licensed illustration set instead, add 9 images to src/assets/pregnancy/
 * and list them in `pregnancyImages` in src/config/site.js.
 */
import { pregnancyImages } from '../config/site';

const BUMP = [0, 1, 3, 6, 10, 14, 18, 22, 26];
const SKIN = '#E8B08A';
const SKIN_SHADE = '#D39570';
const HAIR = '#23253A';
const KURTA = '#F0629F';
const KURTA_SHADE = '#D9437F';
const TRIM = '#0B3872';
const LEGGING = '#0B3872';
const LEGGING_SHADE = '#082C5A';

function Baby({ x, y, r, month }) {
  if (month === 1) return <circle cx={x} cy={y} r={r * 0.35} fill={SKIN} />;
  const s = r / 20;
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(-12)`}>
      {/* body curled */}
      <path d="M-3-3c-9 3-12 14-6 21 5 6 15 6 20 1 5-6 3-14-3-18-3-3-7-4-11-4z" fill="#F2BFA0" />
      {/* head */}
      <circle cx="3" cy="-9" r="9.5" fill="#F2BFA0" />
      <path d="M10-11c1 2 1 4 0 5" fill="none" stroke="#D99A7C" strokeWidth="1.2" strokeLinecap="round" />
      {/* arm and leg lines */}
      <path d="M-1 2c4 3 9 3 12 0" fill="none" stroke="#D99A7C" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M-7 12c4 4 10 5 14 2" fill="none" stroke="#D99A7C" strokeWidth="1.5" strokeLinecap="round" />
      {/* cord */}
      {month >= 3 && <path d="M2 8c-6 6-12 6-16 10" fill="none" stroke="#E98FB4" strokeWidth="1.6" strokeLinecap="round" />}
    </g>
  );
}

export default function PregnancyFigure({ month = 1, className = '' }) {
  if (pregnancyImages && pregnancyImages[month - 1]) {
    return <img src={pregnancyImages[month - 1]} alt={`Illustration of month ${month} of pregnancy`} width="221" height="696" decoding="async" draggable="false" className={className} />;
  }

  const b = BUMP[month - 1];
  const fx = 92; // front line of the abdomen
  const handOnBump = month >= 4;
  const wombX = fx - 8 + b * 0.5;
  const wombR = Math.min(3 + month * 0.7 + b * 0.5, b * 0.5 + 5); // stays inside the bump
  const wombY = 163;
  const handX = fx + b * 0.62;
  const handY = 136 + b * 0.12;

  const kurta = `
    M70 86
    C78 82 86 83 90 86
    C96 92 99 104 96 116
    C94 122 92 126 ${fx} 130
    C${fx + b * 1.4} 132, ${fx + b * 1.45} 186, ${fx - 1} 192
    C${96 + b * 0.25} 200, ${99 + b * 0.3} 208, ${101 + b * 0.3} 216
    L56 216
    C58 196 60 170 61 150
    C62 128 64 104 70 86 Z`;

  return (
    <svg viewBox="30 4 110 346" className={className} role="img" aria-label={`Illustration of month ${month} of pregnancy`}>
      {/* ground shadow */}
      <ellipse cx="82" cy="342" rx="34" ry="5" fill="#0B3872" opacity=".08" />

      {/* braid (behind) */}
      <g fill={HAIR}>
        <path d="M66 44c-6 10-8 24-7 36" fill="none" stroke={HAIR} strokeWidth="9" strokeLinecap="round" />
        {[86, 98, 110, 122, 134].map((y, i) => (
          <ellipse key={y} cx={59 - i * 0.6} cy={y} rx={5.6 - i * 0.35} ry="7.5" />
        ))}
        <path d="M56 140c-1 6 0 10 2 13" fill="none" stroke={TRIM} strokeWidth="3" strokeLinecap="round" />
        <path d="M57 152l-3 9h7z" />
      </g>

      {/* back leg */}
      <path d="M62 214c-2 40-1 80 1 118h12c1-38 3-78 3-118z" fill={LEGGING_SHADE} />
      <path d="M60 330h15c5 0 10 3 12 7H59z" fill={SKIN_SHADE} />
      <path d="M59 334h28v3H59z" fill="#C3155F" />
      {/* front leg */}
      <path d="M72 214c0 40 3 80 6 118h12c1-40 2-80 0-118z" fill={LEGGING} />
      <path d="M76 330h15c5 0 10 3 12 7H75z" fill={SKIN} />
      <path d="M75 334h28v3H75z" fill="#E31B74" />

      {/* neck */}
      <path d="M76 66h9l2 20H75z" fill={SKIN_SHADE} />

      {/* kurta */}
      <path d={kurta} fill={KURTA} />
      {/* side seam + hem trim */}
      <path d={`M64 120c-2 30-4 62-6 92`} fill="none" stroke={KURTA_SHADE} strokeWidth="2" opacity=".6" />
      <path d={`M56 211h${45 + b * 0.3}v5H56z`} fill={TRIM} />
      <path d="M76 85c3 4 9 5 13 1" fill="none" stroke={TRIM} strokeWidth="2.4" strokeLinecap="round" />

      {/* womb window */}
      <circle cx={wombX} cy={wombY} r={wombR} fill="#FFFFFF" opacity=".55" />
      <circle cx={wombX} cy={wombY} r={wombR} fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="2 2.5" opacity=".9" />
      <Baby x={wombX} y={wombY} r={wombR * 0.78} month={month} />

      {/* arm: sleeve to elbow, forearm to bump or hanging at side */}
      {handOnBump ? (
        <g strokeLinecap="round" fill="none">
          <path d="M76 94c-3 14-4 28-2 40" stroke={KURTA_SHADE} strokeWidth="11" />
          <path d={`M74 136c6 3 ${handX - 80} ${handY - 136} ${handX - 74} ${handY - 136}`} stroke={SKIN} strokeWidth="8" />
          <ellipse cx={handX} cy={handY} rx="5.5" ry="4.5" fill={SKIN} />
        </g>
      ) : (
        <g strokeLinecap="round" fill="none">
          <path d="M76 94c-3 16-4 30-3 42" stroke={KURTA_SHADE} strokeWidth="11" />
          <path d="M73 138c-1 18 0 34 2 46" stroke={SKIN} strokeWidth="8" />
          <ellipse cx="75.5" cy="187" rx="4.5" ry="5.5" fill={SKIN} />
        </g>
      )}

      {/* head in profile */}
      <path
        d="M66 34c2-14 15-22 28-18 7 2 11 8 12 15l1 8 5 10c1 2 0 3-2 3h-3c1 2 1 4 0 5l-1 2c1 2 0 4-2 5-3 1-6 2-9 2-4 1-6 4-7 6H73c-1-7-3-11-6-17-3-6-2-14-1-21z"
        fill={SKIN}
      />
      {/* hair over the head and bun */}
      <path d="M64 46c-4-20 8-34 26-33 10 1 16 7 17 15-8-5-18-6-26-2-6 3-9 9-10 16l-2 9z" fill={HAIR} />
      <circle cx="64" cy="34" r="9" fill={HAIR} />
      <path d="M58 30c3-3 8-3 11 0" fill="none" stroke={TRIM} strokeWidth="2" strokeLinecap="round" />
      {/* ear, earring, eye, smile, bindi */}
      <ellipse cx="80" cy="44" rx="3" ry="4.5" fill={SKIN_SHADE} />
      <circle cx="80" cy="51" r="1.8" fill="#E31B74" />
      <path d="M97 37c1.5-1 3.5-1 4.8 0" fill="none" stroke={HAIR} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M100 55c1.5 1 3 1 4 0" fill="none" stroke="#B8505F" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="104.5" cy="30" r="1.4" fill="#C3155F" />
    </svg>
  );
}
