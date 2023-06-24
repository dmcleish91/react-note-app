export default function FormGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-row space-x-4 w-[49rem] mb-4 ${className}`}>{children}</div>;
}
