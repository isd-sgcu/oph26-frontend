export const FormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white p-4 pb-8 shadow-lg rounded-[16px] flex flex-col gap-2">
      {children}
    </div>
  )
}