// 站点的字标和圆环标记：页面用 Wordmark 画站名（size 是高度，单位像素），RingMark 是小标记，转起来就是加载动画。
import { useId } from "react";
import { SITE } from "../site.ts";

export function Wordmark({ size = 24, className = "", title = SITE.name }: { size?: number; className?: string; title?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradId = `fxh-grad-${uid}`;
  const width = Math.round(size * (140 / 32));
  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 140 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 select-none ${className}`}
      aria-label={title}
      role="img"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="1" x2="41.6564" y2="31.4908" gradientUnits="userSpaceOnUse">
          <stop stopColor="#09B7EF" />
          <stop offset="1" stopColor="#0A80DF" />
        </linearGradient>
      </defs>
      <path d="M3.86503 1C1.73043 1 0 2.73043 0 4.86503C0 6.99963 1.73043 8.73006 3.86503 8.73006H26.6258C28.7604 8.73006 30.4908 6.99963 30.4908 4.86503C30.4908 2.73043 28.7604 1 26.6258 1H3.86503Z" fill={`url(#${gradId})`} />
      <path d="M3.86503 12.5951C1.73043 12.5951 0 14.3255 0 16.4601C0 18.5947 1.73043 20.3252 3.86503 20.3252H11.1656C13.3002 20.3252 15.0307 18.5947 15.0307 16.4601C15.0307 14.3255 13.3002 12.5951 11.1656 12.5951H3.86503Z" fill={`url(#${gradId})`} />
      <path d="M26.6258 16.4601C26.6258 14.3255 28.3562 12.5951 30.4908 12.5951H37.7914C39.926 12.5951 41.6564 14.3255 41.6564 16.4601C41.6564 18.5947 39.926 20.3252 37.7914 20.3252H30.4908C28.3562 20.3252 26.6258 18.5947 26.6258 16.4601Z" fill={`url(#${gradId})`} />
      <path d="M15.0307 23.7607C12.8961 23.7607 11.1656 25.4912 11.1656 27.6258C11.1656 29.7604 12.8961 31.4908 15.0307 31.4908H37.7914C39.926 31.4908 41.6564 29.7604 41.6564 27.6258C41.6564 25.4912 39.926 23.7607 37.7914 23.7607H15.0307Z" fill={`url(#${gradId})`} />
      <path d="M0 27.6258C0 25.4912 1.73043 23.7607 3.86503 23.7607C5.99963 23.7607 7.73006 25.4912 7.73006 27.6258C7.73006 29.7604 5.99963 31.4908 3.86503 31.4908C1.73043 31.4908 0 29.7604 0 27.6258Z" fill={`url(#${gradId})`} />
      <path d="M37.7914 1C35.6568 1 33.9264 2.73043 33.9264 4.86503C33.9264 6.99963 35.6568 8.73006 37.7914 8.73006C39.926 8.73006 41.6564 6.99963 41.6564 4.86503C41.6564 2.73043 39.926 1 37.7914 1Z" fill={`url(#${gradId})`} />
      <path d="M112.516 18.1772V14.7416H140.001V18.1772H119.817V20.1097H137.424V26.5514C137.424 28.4488 135.886 29.987 133.989 29.987H124.541C123.592 29.987 122.823 29.2179 122.823 28.2692V26.3367H133.989V23.76H116.666C115.613 23.76 114.808 22.8216 114.968 21.781L115.522 18.1772H112.516Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M114.663 3.14648V12.1649H136.565C137.514 12.1649 138.283 11.3958 138.283 10.4471V3.14648H114.663ZM118.099 9.15875V6.58207H134.847V8.29986C134.847 8.77421 134.463 9.15875 133.989 9.15875H118.099Z" fill="currentColor" />
      <path d="M94.0484 25.4778V3.14648H97.484V28.9134C97.484 29.3877 97.0994 29.7723 96.6251 29.7723H89.3245C88.8501 29.7723 88.4656 29.3877 88.4656 28.9134V26.3367H93.1895C93.6639 26.3367 94.0484 25.9521 94.0484 25.4778Z" fill="currentColor" />
      <path d="M49.1719 10.4473V7.0117H58.8345V3.14667H62.2701V29.7724H58.8345V25.9074H49.1719V22.4718H58.8345V18.1773H52.6075C50.7101 18.1773 49.1719 16.6392 49.1719 14.7418H58.8345V10.4473H49.1719Z" fill="currentColor" />
      <path d="M78.3749 10.4471V7.01152H68.7123V3.14648H65.2767V29.7723H68.7123V25.9072H78.3749V22.4716H68.7123V18.1772H74.9393C76.8367 18.1772 78.3749 16.639 78.3749 14.7416H68.7123V10.4471H78.3749Z" fill="currentColor" />
      <path d="M81.5946 25.9094L85.6833 10.3335C85.9311 9.38957 86.7842 8.73145 87.7601 8.73145H89.9688L86.081 24.2829C85.842 25.2388 84.9831 25.9094 83.9978 25.9094H81.5946Z" fill="currentColor" />
      <path d="M110.153 25.9094L106.065 10.3335C105.817 9.38957 104.964 8.73145 103.988 8.73145H101.779L105.667 24.2829C105.906 25.2388 106.765 25.9094 107.75 25.9094H110.153Z" fill="currentColor" />
    </svg>
  );
}

/** A ring with a dot; spinning, it is the loader. */
export function RingMark({ className = "", spinning = false }: { className?: string; spinning?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g style={spinning ? { transformOrigin: "12px 12px", animation: "spin-slow 1.1s linear infinite" } : undefined}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="42 15" />
      </g>
      <circle cx="12" cy="12" r="2.6" fill="currentColor" />
    </svg>
  );
}
