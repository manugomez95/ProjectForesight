interface ScaleToggleButtonProps {
  isLogScale: boolean;
  onToggle: () => void;
}

export default function ScaleToggleButton({ isLogScale, onToggle }: ScaleToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      style={{
        padding: '4px 12px',
        fontSize: '12px',
        backgroundColor: isLogScale ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '4px',
        color: 'rgba(255,255,255,0.8)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap'
      }}
      title="Toggle between linear and logarithmic scale"
    >
      {isLogScale ? 'Log Scale' : 'Linear Scale'}
    </button>
  );
}
