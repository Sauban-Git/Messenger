export const Message = () => {
  return (
    <div className="bg-gray-300 rounded-md flex justify-start py-2">
      <div className="flex items-center">
        <img className="rounded-full border-2 border-gray-900" src="/images/profile.svg" width={50} height={50} />
      </div>
      <div className="p-2 flex-col justify-center">
        <p className="font-bold text-xl">Rahul</p>
        <p>This is recent message from Rahul</p>
      </div>
    </div>
  )
}
