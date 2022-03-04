import React from 'react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useSession, signOut } from 'next-auth/react'

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 flex items-center bg-white px-4 py-2 shadow-md">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className=" hidden h-14 w-14 border-0 md:inline-flex"
      >
        <Icon name="menu" size="3xl" />
      </Button>
      <Icon name="description" size="4xl" color="blue" />
      <h1 className="ml-2 hidden text-2xl text-gray-700  md:inline-flex">
        docs
      </h1>

      <div className="mx-5 flex flex-1 items-center rounded-lg bg-gray-100 px-5 py-2 text-gray-500 focus-within:text-gray-600 focus-within:shadow-md md:mx-20">
        <Icon name="search" size="2xl" color="gray" />
        <input
          type="text"
          placeholder="Search"
          className="flex-1 bg-transparent px-4 text-base outline-none"
        />
      </div>
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className=" ml-5 hidden h-14 w-14 border-0 md:ml-20 md:inline-flex"
      >
        <Icon name="apps" size="3xl" color="gray" />
      </Button>

      <img
        loading="lazy"
        className="ml-2 h-12 w-12 cursor-pointer rounded-full"
        src={session?.user?.image}
        alt=""
        onClick={signOut}
      />
    </header>
  )
}

export default Header
