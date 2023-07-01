export default function FormGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-row gap-4 px-4 ${className}`}>{children}</div>;
}
