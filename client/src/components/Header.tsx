export const Header = () => {
  return (
    <div className="flex justify-between">
      <div className="flex">

        <img src="/images/back.svg" width={50} height={50} />
        <img className="rounded-full py-2 flex items-center" src="/images/profile.svg" width={30} height={30} />
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
