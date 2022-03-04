import React from 'react'
import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import { useRouter } from 'next/router'

const DocumentRow = ({ id, fileName, date }) => {
  const router = useRouter()
  // console.log(date)
  return (
    <div
      onClick={() => router.push(`/doc/${id}`)}
      className="flex cursor-pointer items-center rounded-lg p-4 text-sm text-gray-700 hover:bg-gray-100"
    >
      <Icon name="article" size="3xl" color="blue" />
      <p className="w-10 flex-1 truncate pl-5 pr-10">{fileName}</p>
      <p className="pr-5 text-sm">
        {new Date(date?.seconds * 1000).toLocaleDateString()}
      </p>

      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className="border-0"
      >
        <Icon name="more_vert" size="3xl" />
      </Button>
    </div>
  )
}

export default DocumentRow
