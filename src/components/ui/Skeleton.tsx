interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

const Skeleton = ({ width = '100%', height = '16px', borderRadius = '8px', style }: SkeletonProps) => (
  <div style={{
    width, height, borderRadius,
    background: 'linear-gradient(90deg, var(--beige-mid) 25%, var(--beige) 50%, var(--beige-mid) 75%)',
    backgroundSize: '200% 100%',
    animation: 'skeleton-loading 1.5s infinite',
    ...style,
  }} />
);

export const ProductCardSkeleton = () => (
  <div style={{
    background: 'white', border: '1px solid var(--beige-dark)',
    borderRadius: 'var(--radius-lg)', overflow: 'hidden',
  }}>
    <Skeleton height="200px" borderRadius="0" />
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Skeleton width="60%" height="12px" />
      <Skeleton width="90%" height="16px" />
      <Skeleton width="75%" height="12px" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <Skeleton width="80px" height="24px" />
        <Skeleton width="36px" height="36px" borderRadius="50%" />
      </div>
    </div>
  </div>
);

export const OrderCardSkeleton = () => (
  <div style={{
    background: 'white', border: '1px solid var(--beige-dark)',
    borderRadius: 'var(--radius-lg)', padding: '24px',
    display: 'flex', flexDirection: 'column', gap: '12px',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Skeleton width="120px" height="20px" />
      <Skeleton width="80px" height="20px" />
    </div>
    <div style={{ display: 'flex', gap: '8px' }}>
      <Skeleton width="100px" height="28px" borderRadius="999px" />
      <Skeleton width="120px" height="28px" borderRadius="999px" />
      <Skeleton width="90px" height="28px" borderRadius="999px" />
    </div>
  </div>
);

export const TableRowSkeleton = () => (
  <tr>
    {[40, 160, 80, 80, 80].map((w, i) => (
      <td key={i} style={{ padding: '14px 20px' }}>
        <Skeleton width={`${w}px`} height="14px" />
      </td>
    ))}
  </tr>
);

export default Skeleton;