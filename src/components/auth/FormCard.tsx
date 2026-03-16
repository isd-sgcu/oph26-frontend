export const FormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 rounded-[16px] bg-white p-4 pb-8 shadow-lg">
      {children}
    </div>
  )
}
