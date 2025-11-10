export const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="flex">

        <img src="/images/back.svg" width={50} height={50} />
        <img className="rounded-full border-2 border-gray-900" src="/images/profile.svg" width={50} height={50} />
      </div>
      <div className="flex items-center">
        <div className="font-bold text-2xl ">Sauban</div>
      </div>
      <div>
        <img src="/images/options.svg" width={50} height={50} />
      </div>
    </div>
  )
}
