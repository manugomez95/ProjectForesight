interface ScaleToggleButtonProps {
  isLogScale: boolean;
  onToggle: () => void;
  variant?: 'button' | 'text';
}

export default function ScaleToggleButton({ isLogScale, onToggle, variant = 'button' }: ScaleToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: variant === 'text' ? '0' : '4px 12px',
        fontSize: '12px',
        backgroundColor: variant === 'text' ? 'transparent' : (isLogScale ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.1)'),
        border: variant === 'text' ? 'none' : '1px solid rgba(255,255,255,0.2)',
        borderRadius: variant === 'text' ? '0' : '4px',
        color: 'rgba(255,255,255,0.7)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
        textDecoration: variant === 'text' ? 'underline' : 'none',
        opacity: 0.85
      }}
      title="Toggle between linear and logarithmic scale"
    >
      {isLogScale ? 'log' : 'linear'}
    </button>
  );
}
